import { component, mixin, watch, attribute, on, createCell } from 'web-cell';
import classNames from 'classnames';

import { uniqueID } from '../utility';

interface CarouselItem {
    image: string | URL;
    title?: string;
    detail?: string;
}

export interface CarouselProps {
    mode?: 'slide' | 'fade';
    interval?: number;
    activeIndex?: number;
    list?: CarouselItem[];
}

const SlideTransition = {
    keyframes: [
        { transform: 'translateX(-100%)' },
        { transform: 'translateX(0)' },
        { transform: 'translateX(100%)' }
    ],
    options: {
        duration: 600,
        easing: 'ease-in-out'
    }
};

@component({
    tagName: 'carousel-view',
    renderTarget: 'children'
})
export class CarouselView extends mixin<CarouselProps>() {
    UID = uniqueID();

    @attribute
    @watch
    mode: CarouselProps['mode'] = 'slide';

    @attribute
    @watch
    interval = 0;

    @watch
    activeIndex = 0;

    @watch
    list: CarouselItem[] = [];

    private slideBox: HTMLElement;

    async turnTo(index = this.activeIndex + 1) {
        if (!this.slideBox) return;

        const {
            list: { length },
            activeIndex
        } = this;

        const { children } = this.slideBox,
            forward = activeIndex < index;

        this.activeIndex = (index < 0 ? length + index : index) % length;

        const left = children[activeIndex] as HTMLElement,
            right = children[this.activeIndex] as HTMLElement,
            keyframes = [...SlideTransition.keyframes];

        (left.style.display = 'block'),
            (left.style.transform = 'translateX(0)');

        (right.style.display = 'block'),
            (right.style.transform = keyframes[forward ? 0 : 2].transform);

        if (!forward) keyframes.reverse();

        return new Promise(resolve =>
            self.requestAnimationFrame(() =>
                Promise.all([
                    left
                        .animate(keyframes.slice(1), SlideTransition.options)
                        .finished.then(() => (left.style.display = 'none')),
                    right
                        .animate(keyframes.slice(0, 2), SlideTransition.options)
                        .finished.then(
                            () => (right.style.transform = 'translateX(0)')
                        )
                ]).then(resolve)
            )
        );
    }

    private timer: any;
    private pause = false;

    connectedCallback() {
        if (this.interval)
            this.timer = setInterval(
                () => this.pause || this.turnTo(),
                this.interval * 1000
            );
    }

    disconnectedCallback() {
        if (this.timer) clearInterval(this.timer);
    }

    handlePause = ({ type }: MouseEvent) =>
        (this.pause = type === 'mouseenter');

    @on(
        'click',
        '.carousel-indicators li, .carousel-control-prev, .carousel-control-next'
    )
    handleSwitch(event: MouseEvent, { dataset: { index } }: HTMLElement) {
        event.preventDefault(), event.stopPropagation();

        this.turnTo(+index);
    }

    render({ mode, activeIndex, list }: CarouselProps) {
        const { UID } = this;

        return (
            <div
                className={classNames(
                    'carousel',
                    'slide',
                    mode === 'fade' && 'carousel-fade'
                )}
                id={UID}
                onMouseEnter={this.handlePause}
                onMouseLeave={this.handlePause}
            >
                <ol className="carousel-indicators">
                    {list.map((_, index) => (
                        <li
                            className={index === activeIndex ? 'active' : null}
                            data-index={index + ''}
                        ></li>
                    ))}
                </ol>

                <main
                    className="carousel-inner"
                    ref={(tag: HTMLElement) => (this.slideBox = tag)}
                >
                    {list.map(({ image, title, detail }) => (
                        <section className="carousel-item">
                            <img
                                className="d-block w-100"
                                src={image}
                                alt={title}
                            />
                            {title && (
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>{title}</h5>
                                    {detail && <p>{detail}</p>}
                                </div>
                            )}
                        </section>
                    ))}
                </main>

                <a
                    className="carousel-control-prev"
                    href={'#' + UID}
                    role="button"
                    data-index={activeIndex - 1 + ''}
                >
                    <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                    ></span>
                    <span className="sr-only">Previous</span>
                </a>

                <a
                    className="carousel-control-next"
                    href={'#' + UID}
                    role="button"
                    data-index={activeIndex + 1 + ''}
                >
                    <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                    ></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        );
    }
}
