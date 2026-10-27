import { expect } from 'expect';
import { fn, spyOn } from 'jest-mock';
import { runInAction } from 'mobx';
import { describe, it } from 'node:test';
import { setTimeout } from 'node:timers/promises';
import { assertLooksLike } from 'dom-renderer/assert';
import { render } from '../render';
import {
    Carousel,
    CarouselCaption,
    CarouselItem
} from '../../source/Media/Carousel';

describe('Carousel', () => {
    it('should render a caption without the removed Bootstrap caption class', () => {
        assertLooksLike(
            <CarouselCaption>Caption</CarouselCaption>,
            <div
                className=""
                style={{
                    position: 'absolute',
                    insetInline: '15%',
                    bottom: '4rem',
                    zIndex: '1',
                    color: 'white'
                }}
                data-carousel-caption=""
            >
                Caption
            </div>
        );
    });

    it('should render the v6 carousel control classes', () => {
        const { renderContent } = Carousel.prototype;

        assertLooksLike(
            renderContent.call({
                itemMeta: [{ caption: 'Slide' }],
                currentIndex: 0
            }),
            <div className="carousel carousel-overlay">
                <div className="carousel-inner">
                    <slot onSlotChange={undefined} />
                </div>
                <div className="carousel-overlay-controls">
                    <button
                        type="button"
                        className="btn-icon"
                        data-bs-slide="prev"
                    >
                        <span
                            className="carousel-icon-prev"
                            aria-hidden="true"
                        />
                        <span className="visually-hidden">-1</span>
                    </button>
                    <div className="carousel-indicators">
                        <button
                            type="button"
                            aria-label="Slide"
                            data-bs-target=""
                            data-bs-slide-to={0}
                            className="active"
                            aria-current="true"
                        />
                    </div>
                    <button
                        type="button"
                        className="btn-icon"
                        data-bs-slide="next"
                    >
                        <span
                            className="carousel-icon-next"
                            aria-hidden="true"
                        />
                        <span className="visually-hidden">+1</span>
                    </button>
                </div>
            </div>
        );
    });

    it('should add the carousel-item class to its slide', () => {
        assertLooksLike(
            <CarouselItem interval={3000}>Slide</CarouselItem>,
            <div
                className="carousel-item "
                style={{ position: 'relative' }}
                data-bs-interval={3000}
            >
                Slide
            </div>
        );
    });

    it('should advance using native button clicks and select indicators', context => {
        const carousel = new Carousel();
        const turn = spyOn(carousel, 'turnByOffset').mockImplementation(
            () => {}
        );
        context.after(() => turn.mockRestore());
        const button = document.createElement('button');
        button.dataset.bsSlide = 'next';

        carousel.handleButtonClick(new MouseEvent('click'), button);
        expect(turn).toHaveBeenCalledWith(1);

        button.dataset.bsSlide = 'prev';
        carousel.handleButtonClick(new MouseEvent('click'), button);
        expect(turn).toHaveBeenLastCalledWith(-1);

        expect(turn).toHaveBeenCalledTimes(2);

        button.dataset.bsSlideTo = '2';
        runInAction(() =>
            carousel.handleIndicatorsButtonClick(
                new MouseEvent('click'),
                button
            )
        );
        expect(carousel.currentIndex).toBe(2);
    });

    it('should initialize after mounting with an active first slide, including autoplay', async () => {
        for (const interval of [undefined, 60_000]) {
            const root = render(
                <Carousel interval={interval}>
                    <CarouselItem>
                        <CarouselCaption>First</CarouselCaption>
                    </CarouselItem>
                    <CarouselItem>Second</CarouselItem>
                </Carousel>
            );
            document.body.append(root);
            await setTimeout(0);
            const carousel = root.querySelector<Carousel>('carousel-box');
            expect(carousel.itemMeta.map(item => item.caption)).toEqual([
                'First',
                'Second'
            ]);
            expect(carousel.querySelectorAll('.active')).toHaveLength(1);
            expect(
                carousel
                    .querySelector('.carousel-item')
                    .classList.contains('active')
            ).toBe(true);
            expect(
                carousel.shadowRoot.querySelectorAll(
                    '.carousel-indicators button'
                )
            ).toHaveLength(2);
            root.remove();
        }
    });

    it('should handle empty and late-mounted slides without invalid indices', async () => {
        const root = render(<Carousel />);
        document.body.append(root);
        await setTimeout(0);
        const carousel = root.querySelector<Carousel>('carousel-box');
        carousel.turnByOffset(-1);
        expect(carousel.currentIndex).toBe(0);
        const item = document.createElement('div');
        item.className = 'carousel-item';
        item.textContent = 'Late';
        carousel.append(item);
        await setTimeout(0);
        expect(carousel.itemMeta).toHaveLength(1);
        expect(item.classList.contains('active')).toBe(true);
        item.remove();
        await setTimeout(0);
        expect(carousel.itemMeta).toHaveLength(0);
        expect(carousel.currentIndex).toBe(0);
        root.remove();
    });

    it('should wrap backwards and scroll the snap track to the selected slide', async () => {
        const root = render(
            <Carousel>
                <CarouselItem>First</CarouselItem>
                <CarouselItem>Second</CarouselItem>
                <CarouselItem>Third</CarouselItem>
            </Carousel>
        );
        document.body.append(root);
        await setTimeout(0);
        const carousel = root.querySelector<Carousel>('carousel-box');
        const track =
            carousel.shadowRoot.querySelector<HTMLElement>('.carousel-inner');
        const scrollTo = fn();
        track.scrollTo = scrollTo;
        track.scrollLeft = 100;
        track.getBoundingClientRect = () => DOMRect.fromRect({ x: 10 });
        const items = carousel.querySelectorAll<HTMLElement>('.carousel-item');
        items[2].getBoundingClientRect = () => DOMRect.fromRect({ x: 210 });
        carousel.turnByOffset(-1);
        expect(carousel.currentIndex).toBe(2);
        expect(items[2].classList.contains('active')).toBe(true);
        expect(scrollTo).toHaveBeenLastCalledWith({ left: 300 });
        carousel.turnByOffset(1);
        expect(carousel.currentIndex).toBe(0);
        root.remove();
    });

    it('should not advance a second time on Enter keyup after a native click', async () => {
        const root = render(
            <Carousel>
                <CarouselItem>First</CarouselItem>
                <CarouselItem>Second</CarouselItem>
                <CarouselItem>Third</CarouselItem>
            </Carousel>
        );
        document.body.append(root);
        await setTimeout(0);
        const carousel = root.querySelector<Carousel>('carousel-box');
        const next = carousel.shadowRoot.querySelector<HTMLButtonElement>(
            '[data-bs-slide="next"]'
        );
        next.dispatchEvent(
            new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
        );
        next.click();
        next.dispatchEvent(
            new KeyboardEvent('keyup', { key: 'Enter', bubbles: true })
        );
        expect(carousel.currentIndex).toBe(1);
        root.remove();
    });

    it('should start autoplay only after slides mount, clear it on disconnect and restart on reconnect', async context => {
        const intervals = spyOn(window, 'setInterval');
        const clear = spyOn(window, 'clearInterval');
        context.after(() => {
            intervals.mockRestore();
            clear.mockRestore();
        });
        const root = render(
            <Carousel interval={60_000}>
                <CarouselItem>First</CarouselItem>
                <CarouselItem>Second</CarouselItem>
            </Carousel>
        );
        document.body.append(root);
        await setTimeout(0);
        const carousel = root.querySelector<Carousel>('carousel-box');
        expect(intervals).toHaveBeenCalled();
        expect(intervals.mock.calls.at(-1)[1]).toBe(60_000);
        const timer = intervals.mock.results.at(-1).value;
        const advance = intervals.mock.calls.at(-1)[0] as () => void;
        advance();
        expect(carousel.currentIndex).toBe(1);
        root.remove();
        expect(clear.mock.calls.some(([id]) => id === timer)).toBe(true);
        const count = intervals.mock.calls.length;
        document.body.append(root);
        await setTimeout(0);
        expect(intervals.mock.calls.length).toBeGreaterThan(count);
        const restartedTimer = intervals.mock.results.at(-1).value;
        runInAction(() => (carousel.interval = 0));
        expect(clear.mock.calls.some(([id]) => id === restartedTimer)).toBe(
            true
        );
        root.remove();
    });
});
