import {
    component,
    mixin,
    watch,
    attribute,
    delegate,
    watchMotion,
    createCell,
    Fragment
} from 'web-cell';
import classNames from 'classnames';

import { uniqueID, watchVisible } from '../utility';

interface CarouselItem {
    image: string | URL;
    title?: string;
    detail?: string;
}

export interface CarouselProps {
    mode?: 'slide' | 'fade';
    controls?: boolean;
    indicators?: boolean;
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
    controls = false;

    @attribute
    @watch
    indicators = false;

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
    set list(list: CarouselItem[]) {
        this.setProps({ list }).then(() =>
            this.slideBox.children[this.activeIndex]?.classList.add('active')
        );
    }

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
        if (!this.list) this.list = [];

        if (!this.controls && !this.indicators && !this.interval)
            this.interval = 3;

        if (this.interval) {
            watchVisible(this, visible => (this.pause = !visible));

            this.timer = self.setInterval(
                () => this.pause || this.turnTo(),
                this.interval * 1000
            );
        }
        this.addEventListener('click', this.handleSwitch);

        super.connectedCallback();
    }

    disconnectedCallback() {
        if (this.timer) clearInterval(this.timer);
    }

    handlePause = ({ type }: MouseEvent) =>
        (this.pause = type === 'mouseenter');

    handleSwitch = delegate(
        '.carousel-indicators li, .carousel-control-prev, .carousel-control-next',
        (event: MouseEvent, { dataset: { index } }: HTMLElement) => {
            event.preventDefault(), event.stopPropagation();

            this.turnTo(+index);
        }
    );

    render({ mode, indicators, activeIndex, list, controls }: CarouselProps) {
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
                {!indicators ? null : (
                    <ol className="carousel-indicators">
                        {list.map((_, index) => (
                            <li
                                className={
                                    index === activeIndex ? 'active' : null
                                }
                                data-index={index + ''}
                            />
                        ))}
                    </ol>
                )}
                <div
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
                {!controls ? null : (
                    <Fragment>
                        <a
                            className="carousel-control-prev"
                            href={'#' + UID}
                            role="button"
                            data-index={activeIndex - 1 + ''}
                        >
                            <span
                                className="carousel-control-prev-icon"
                                aria-hidden="true"
                            />
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
                            />
                            <span className="sr-only">Next</span>
                        </a>
                    </Fragment>
                )}
            </div>
        );
    }
}
