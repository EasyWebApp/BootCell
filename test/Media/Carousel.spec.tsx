import { expect } from 'expect';
import { fn } from 'jest-mock';
import { runInAction } from 'mobx';
import { describe, it } from 'node:test';

import {
    Carousel,
    CarouselCaption,
    CarouselItem
} from '../../source/Media/Carousel';
import { assertLooksLike, render } from '../render';

function createCarousel() {
    const instance = new Carousel();
    instance.interval = null;
    for (const text of ['First', 'Second', 'Third']) {
        const slide = document.createElement('div');
        slide.className = 'carousel-item';
        slide.textContent = text;
        instance.append(slide);
    }
    return instance;
}

describe('Carousel', () => {
    it('accepts JSX selection callbacks and restores subscriptions after reconnect', async context => {
        const select = fn();
        const root = render(
            <Carousel interval={null} onSelect={select}>
                <CarouselItem>One</CarouselItem>
                <CarouselItem>Two</CarouselItem>
            </Carousel>
        );
        const instance = root.querySelector<Carousel>('carousel-box');
        const notification = fn();
        instance.addEventListener('select', notification);
        document.body.append(instance);
        context.after(() => instance.remove());
        await new Promise(resolve => setTimeout(resolve, 0));
        (
            instance.shadowRoot.querySelector(
                '[data-bs-slide=next]'
            ) as HTMLButtonElement
        ).click();
        expect(select).toHaveBeenCalledTimes(1);
        expect(select.mock.calls[0][0]).toBe(1);
        expect(notification).toHaveBeenCalledTimes(1);
        expect(
            (notification.mock.calls[0][0] as CustomEvent).detail.activeIndex
        ).toBe(1);
        expect(instance.onselect).toBeNull();
        instance.remove();
        document.body.append(instance);
        await new Promise(resolve => setTimeout(resolve, 0));
        (
            instance.shadowRoot.querySelector(
                '[data-bs-slide=prev]'
            ) as HTMLButtonElement
        ).click();
        await Promise.resolve();
        expect(select).toHaveBeenCalledTimes(2);
        expect(
            instance.shadowRoot
                .querySelector('[data-bs-slide-to="0"]')
                .getAttribute('aria-current')
        ).toBe('true');
    });
    it('renders native v6 captions, image/title/detail and explicit children', () => {
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
        assertLooksLike(
            <CarouselItem interval={3000}>Slide</CarouselItem>,
            <div className="carousel-item " data-bs-interval={3000}>
                Slide
            </div>
        );
        const root = render(
            <CarouselItem image="photo.jpg" title="Photo" detail="Details" />
        );
        expect(root.querySelector('img')?.getAttribute('src')).toBe(
            'photo.jpg'
        );
        expect(root.querySelector('img')?.getAttribute('alt')).toBe('Photo');
        expect(
            root.querySelector('[data-carousel-caption] h5')?.textContent
        ).toBe('Photo');
        expect(root.querySelector('p')?.textContent).toBe('Details');
    });

    it('honors controlled/default active indices, legacy currentIndex and negative wrap', context => {
        const instance = createCarousel();
        context.after(() => instance.model.dispose());
        instance.defaultActiveIndex = 1;
        instance.mountedCallback();
        expect(instance.model.index).toBe(1);
        instance.turnTo(-7);
        expect(instance.currentIndex).toBe(2);
        instance.turnBack();
        expect(instance.currentIndex).toBe(1);
        runInAction(() => {
            instance.activeIndex = 0;
        });
        instance.onSelect = fn();
        instance.turnByOffset(1);
        expect(instance.onSelect).toHaveBeenCalledWith(1, null);
        expect(instance.model.index).toBe(0);
        runInAction(() => {
            instance.activeIndex = 2;
        });
        expect(instance.children[2].classList.contains('active')).toBe(true);
        expect(instance.children[0].getAttribute('aria-hidden')).toBe('true');
        expect((instance.children[0] as HTMLElement).inert).toBe(true);
        runInAction(() => {
            instance.activeIndex = undefined;
            instance.wrap = false;
        });
        instance.turnTo(-1);
        expect(instance.model.index).toBe(0);
        instance.turnTo(100);
        expect(instance.model.index).toBe(2);
        instance.turnTo(NaN);
        expect(instance.model.index).toBe(2);
    });

    it('renders optional controls, indicator labels and CSS fade without old transition classes', context => {
        const instance = createCarousel();
        context.after(() => instance.model.dispose());
        instance.fade = true;
        instance.indicatorLabels = ['Custom'];
        instance.mountedCallback();
        const root = render(instance.renderContent());
        expect(root.querySelector('.carousel-fade')).not.toBeNull();
        expect(
            root.querySelectorAll('.carousel-overlay-controls > button')
        ).toHaveLength(2);
        expect(root.querySelector('.carousel-icon-prev')).not.toBeNull();
        expect(
            root
                .querySelector('.carousel-indicators button')
                ?.getAttribute('aria-label')
        ).toBe('Custom');
        instance.controls = instance.indicators = false;
        expect(
            render(instance.renderContent()).querySelectorAll('button')
        ).toHaveLength(0);
        expect(
            instance.querySelector('[class*=carousel-item-next]')
        ).toBeNull();
    });

    it('handles controls, keyboard and indicators exactly once and ignores editable targets', context => {
        const instance = createCarousel();
        context.after(() => instance.model.dispose());
        instance.mountedCallback();
        const button = document.createElement('button');
        button.dataset.bsSlide = 'next';
        instance.handleButtonClick(new MouseEvent('click'), button);
        expect(instance.currentIndex).toBe(1);
        button.dataset.bsSlide = 'prev';
        instance.handleButtonPress(
            new KeyboardEvent('keyup', { key: 'Enter' }),
            button
        );
        expect(instance.currentIndex).toBe(0);
        button.dataset.bsSlideTo = '2';
        instance.handleIndicatorsButtonClick(new MouseEvent('click'), button);
        expect(instance.currentIndex).toBe(2);
        instance.handleIndicatorsButtonPress(
            new KeyboardEvent('keyup', { key: 'Escape' }),
            button
        );
        instance.handleIndicatorsButtonPress(
            new KeyboardEvent('keyup', { key: 'Enter' }),
            button
        );
        expect(instance.currentIndex).toBe(2);
        instance.handleKeyDown(
            new KeyboardEvent('keydown', { key: 'ArrowLeft' })
        );
        expect(instance.currentIndex).toBe(1);
        const input = document.createElement('input');
        const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
        Object.defineProperty(event, 'target', { value: input });
        instance.handleKeyDown(event);
        expect(instance.currentIndex).toBe(1);
        instance.keyboard = false;
        instance.handleKeyDown(
            new KeyboardEvent('keydown', { key: 'ArrowLeft' })
        );
        expect(instance.currentIndex).toBe(1);
    });

    it('cycles in milliseconds with per-slide intervals, hover/visibility pauses, and cleanup', async context => {
        const instance = createCarousel();
        Object.defineProperty(document, 'hidden', {
            configurable: true,
            value: false
        });
        context.after(() => {
            instance.remove();
            delete (document as unknown as Record<string, unknown>).hidden;
        });
        document.body.append(instance);
        await new Promise(resolve => setTimeout(resolve, 0));
        context.mock.timers.enable({ apis: ['setTimeout'] });
        (instance.children[1] as HTMLElement).dataset.bsInterval = '40';
        runInAction(() => {
            instance.interval = 20;
        });
        context.mock.timers.tick(19);
        expect(instance.model.index).toBe(0);
        context.mock.timers.tick(1);
        expect(instance.model.index).toBe(1);
        context.mock.timers.tick(39);
        expect(instance.model.index).toBe(1);
        context.mock.timers.tick(1);
        expect(instance.model.index).toBe(2);
        instance.model.setHover(true);
        context.mock.timers.tick(100);
        expect(instance.model.index).toBe(2);
        instance.model.setHover(false);
        Object.defineProperty(document, 'hidden', {
            configurable: true,
            value: true
        });
        document.dispatchEvent(new Event('visibilitychange'));
        context.mock.timers.tick(100);
        expect(instance.model.index).toBe(2);
        Object.defineProperty(document, 'hidden', {
            configurable: true,
            value: false
        });
        document.dispatchEvent(new Event('visibilitychange'));
        context.mock.timers.tick(20);
        expect(instance.model.index).toBe(0);
        runInAction(() => {
            instance.model.visible = false;
        });
        context.mock.timers.tick(100);
        expect(instance.model.index).toBe(0);
        runInAction(() => {
            instance.model.visible = true;
        });
        instance.remove();
        context.mock.timers.tick(100);
        expect(instance.model.index).toBe(0);
    });

    it('synchronizes native scroll with selection and restores a declined controlled swipe', async context => {
        const instance = createCarousel();
        document.body.append(instance);
        context.after(() => instance.remove());
        await new Promise(resolve => setTimeout(resolve, 0));
        const viewport =
            instance.shadowRoot.querySelector<HTMLElement>('.carousel-inner');
        Object.defineProperty(viewport, 'clientWidth', {
            configurable: true,
            value: 100
        });
        viewport.getBoundingClientRect = () =>
            ({ left: 0, right: 100 }) as DOMRect;
        [...instance.children].forEach((item, index) => {
            item.getBoundingClientRect = () =>
                ({
                    left: index * 100 - viewport.scrollLeft,
                    right: (index + 1) * 100 - viewport.scrollLeft
                }) as DOMRect;
        });
        viewport.scrollTo = fn((options?: ScrollToOptions | number) => {
            if (typeof options === 'object')
                viewport.scrollLeft = options.left ?? 0;
        });
        instance.model.finishScroll();
        viewport.scrollLeft = 100;
        instance.model.finishScroll();
        expect(instance.currentIndex).toBe(1);
        runInAction(() => {
            instance.activeIndex = 1;
        });
        instance.onSelect = fn();
        viewport.scrollLeft = 200;
        instance.model.finishScroll();
        expect(instance.onSelect).toHaveBeenCalledWith(2, null);
        expect(instance.model.index).toBe(1);
        expect(viewport.scrollLeft).toBe(100);
        runInAction(() => {
            instance.activeIndex = 0;
        });
        expect(viewport.scrollTo).toHaveBeenCalled();
        expect(viewport.scrollLeft).toBe(0);
    });

    it('observes layout/visibility and disconnects browser observers', async context => {
        let resize: ResizeObserverCallback;
        let visibility: IntersectionObserverCallback;
        const resized = fn(),
            disconnected = fn(),
            unobserved = fn();
        const oldResize = Object.getOwnPropertyDescriptor(
            globalThis,
            'ResizeObserver'
        );
        const oldIntersection = Object.getOwnPropertyDescriptor(
            globalThis,
            'IntersectionObserver'
        );
        class LayoutObserver {
            constructor(callback: ResizeObserverCallback) {
                resize = callback;
            }
            observe = resized;
            disconnect = disconnected;
        }
        class VisibilityObserver {
            constructor(callback: IntersectionObserverCallback) {
                visibility = callback;
            }
            observe = fn();
            disconnect = unobserved;
        }
        Object.defineProperty(globalThis, 'ResizeObserver', {
            configurable: true,
            value: LayoutObserver
        });
        Object.defineProperty(globalThis, 'IntersectionObserver', {
            configurable: true,
            value: VisibilityObserver
        });
        const instance = createCarousel();
        context.after(() => {
            instance.remove();
            if (oldResize)
                Object.defineProperty(globalThis, 'ResizeObserver', oldResize);
            else
                delete (globalThis as unknown as Record<string, unknown>)
                    .ResizeObserver;
            if (oldIntersection)
                Object.defineProperty(
                    globalThis,
                    'IntersectionObserver',
                    oldIntersection
                );
            else
                delete (globalThis as unknown as Record<string, unknown>)
                    .IntersectionObserver;
        });
        document.body.append(instance);
        await new Promise(resolve => setTimeout(resolve, 0));
        expect(resized).toHaveBeenCalledTimes(1);
        expect(() => resize([], {} as ResizeObserver)).not.toThrow();
        visibility(
            [{ isIntersecting: false }] as IntersectionObserverEntry[],
            {} as IntersectionObserver
        );
        expect(instance.model.visible).toBe(false);
        instance.remove();
        expect(disconnected).toHaveBeenCalledTimes(1);
        expect(unobserved).toHaveBeenCalledTimes(1);
    });

    it('disables autoplay on null/zero intervals, ignores hover when configured, and stops at non-wrapping ends', async context => {
        const instance = createCarousel();
        Object.defineProperty(document, 'hidden', {
            configurable: true,
            value: false
        });
        context.after(() => {
            instance.remove();
            delete (document as unknown as Record<string, unknown>).hidden;
        });
        document.body.append(instance);
        await new Promise(resolve => setTimeout(resolve, 0));
        context.mock.timers.enable({ apis: ['setTimeout'] });
        runInAction(() => {
            instance.interval = 0;
        });
        context.mock.timers.tick(100);
        expect(instance.currentIndex).toBe(0);
        runInAction(() => {
            instance.interval = 20;
            instance.pause = false;
            instance.wrap = false;
        });
        instance.model.setHover(true);
        context.mock.timers.tick(20);
        expect(instance.currentIndex).toBe(1);
        context.mock.timers.tick(20);
        expect(instance.currentIndex).toBe(2);
        context.mock.timers.tick(100);
        expect(instance.currentIndex).toBe(2);
    });
    it('supports fade swipes while leaving slide gestures to native scroll-snap', context => {
        const instance = createCarousel();
        context.after(() => instance.model.dispose());
        instance.mountedCallback();
        runInAction(() => {
            instance.fade = true;
        });
        const start = {
            touches: [{ pageX: 100, pageY: 10 }]
        } as unknown as TouchEvent;
        const end = {
            changedTouches: [{ pageX: 10, pageY: 10 }]
        } as unknown as TouchEvent;
        instance.model.touchStart(start);
        instance.model.touchEnd(end);
        expect(instance.currentIndex).toBe(1);
        instance.touch = false;
        instance.model.touchStart(start);
        instance.model.touchEnd(end);
        expect(instance.currentIndex).toBe(1);
    });

    it('handles empty/single and dynamic slide collections and preserves active items on reorder', async context => {
        const instance = createCarousel();
        context.after(() => instance.model.dispose());
        instance.mountedCallback();
        instance.turnTo(1);
        const selected = instance.children[1];
        instance.prepend(selected);
        await Promise.resolve();
        expect(instance.currentIndex).toBe(0);
        selected.remove();
        await Promise.resolve();
        expect(instance.model.items).toHaveLength(2);
        instance.replaceChildren();
        await Promise.resolve();
        expect(instance.model.index).toBe(-1);
        expect(() => instance.turnBack()).not.toThrow();
        const item = document.createElement('div');
        item.className = 'carousel-item';
        instance.append(item);
        await Promise.resolve();
        expect(instance.model.index).toBe(0);
        instance.turnBack();
        expect(instance.currentIndex).toBe(0);
    });
});
