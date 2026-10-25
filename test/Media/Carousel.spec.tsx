import { expect } from 'expect';
import { spyOn } from 'jest-mock';
import { runInAction } from 'mobx';
import { describe, it } from 'node:test';
import { assertLooksLike } from '../render';
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
                    bottom: '1rem',
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
                    <slot />
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
            <div className="carousel-item " data-bs-interval={3000}>
                Slide
            </div>
        );
    });

    it('should advance using button controls and select indicators on Enter', context => {
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
        carousel.handleButtonPress(
            new KeyboardEvent('keyup', { key: 'Enter' }),
            button
        );
        expect(turn).toHaveBeenLastCalledWith(-1);

        carousel.handleButtonPress(
            new KeyboardEvent('keyup', { key: 'Escape' }),
            button
        );
        expect(turn).toHaveBeenCalledTimes(2);

        button.dataset.bsSlideTo = '2';
        runInAction(() =>
            carousel.handleIndicatorsButtonPress(
                new KeyboardEvent('keyup', { key: 'Enter' }),
                button
            )
        );
        expect(carousel.currentIndex).toBe(2);
    });
});
