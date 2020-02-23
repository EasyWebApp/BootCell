import {
    component,
    mixin,
    watch,
    attribute,
    on,
    watchMotion,
    createCell
} from 'web-cell';
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
    set interval(interval: number) {
        this.setProps({
            interval: interval && interval < 0.6 ? 0.6 : interval
        });
    }

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

        const current = children[activeIndex] as HTMLElement,
            next = children[this.activeIndex] as HTMLElement,
            direction = 'carousel-item-' + (forward ? 'left' : 'right'),
            order = 'carousel-item-' + (forward ? 'next' : 'prev');

        next.classList.add(order);

        await new Promise(resolve => self.requestAnimationFrame(resolve));

        const end = watchMotion('transition', next);

        current.classList.add(direction), next.classList.add(direction);

        await end;

        next.classList.remove(order, direction), next.classList.add('active');

        current.classList.remove('active', direction);
    }

    private timer: number;
    private pause = false;

    connectedCallback() {
        if (this.interval)
            this.timer = self.setInterval(
                () => this.pause || this.turnTo(),
                this.interval * 1000
            );

        super.connectedCallback();
    }

    disconnectedCallback() {
        if (this.timer) clearInterval(this.timer);
    }

    init = (tag: HTMLElement) => {
        this.slideBox = tag;

        tag.children[this.activeIndex].classList.add('active');
    };

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

                <div className="carousel-inner" ref={this.init}>
                    {list.map(({ image, title, detail }, index) => (
                        <section className="carousel-item">
                            <img
                                className="d-block w-100"
                                src={image}
                                alt={title}
                            />
                            {title && (
                                <div
                                    className="carousel-caption d-none d-md-block"
                                    style={{ textShadow: '1px 2px 3px black' }}
                                >
                                    <h5>{title}</h5>
                                    {detail && <p>{detail}</p>}
                                </div>
                            )}
                        </section>
                    ))}
                </div>

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
