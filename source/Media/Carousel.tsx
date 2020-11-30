import {
    WebCellProps,
    VNodeChildElement,
    component,
    mixin,
    watch,
    attribute,
    delegate,
    createCell,
    Fragment
} from 'web-cell';
import { uniqueID, isEmpty } from 'web-utility/source/data';
import {
    watchMotion,
    CartesianCoordinate,
    getSwipeVector
} from 'web-utility/source/animation';
import { watchVisible } from 'web-utility/source/DOM';
import classNames from 'classnames';

export interface CarouselCaptionProps extends WebCellProps {
    title?: string;
    detail?: string;
}

export function CarouselCaption({
    className,
    style,
    title,
    detail,
    defaultSlot,
    ...rest
}: CarouselCaptionProps) {
    return (
        <div
            {...rest}
            className={classNames(
                'carousel-caption',
                'd-none',
                'd-md-block',
                className
            )}
            style={{ textShadow: '1px 2px 3px black', ...style }}
        >
            {defaultSlot[0] ? (
                defaultSlot
            ) : (
                <Fragment>
                    <h5>{title}</h5>
                    {detail && <p>{detail}</p>}
                </Fragment>
            )}
        </div>
    );
}

export interface CarouselItemProps extends CarouselCaptionProps {
    image?: string | URL;
}

export function CarouselItem({
    className,
    defaultSlot,
    image,
    title,
    detail,
    ...rest
}: CarouselItemProps) {
    return (
        <section className={classNames('carousel-item', className)} {...rest}>
            {defaultSlot[0] ? (
                defaultSlot
            ) : (
                <Fragment>
                    <img className="d-block w-100" src={image} alt={title} />
                    {title && <CarouselCaption title={title} detail={detail} />}
                </Fragment>
            )}
        </section>
    );
}

export interface CarouselProps extends WebCellProps {
    mode?: 'slide' | 'fade';
    controls?: boolean;
    indicators?: boolean;
    interval?: number;
    activeIndex?: number;
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

    private slideBox?: HTMLElement;

    @watch
    set defaultSlot(defaultSlot: VNodeChildElement[]) {
        this.setProps({ defaultSlot }).then(() =>
            this.slideBox?.children[this.activeIndex]?.classList.add('active')
        );
    }

    async turnTo(index = this.activeIndex + 1) {
        const { length } = this.defaultSlot;
        const { activeIndex } = this;

        if (!this.slideBox || !length) return;

        const { children } = this.slideBox,
            forward = activeIndex < index;

        this.activeIndex = (index < 0 ? length + index : index) % length;

        const current = children[activeIndex] as HTMLElement,
            next = children[this.activeIndex] as HTMLElement,
            direction = 'carousel-item-' + (forward ? 'left' : 'right'),
            order = 'carousel-item-' + (forward ? 'next' : 'prev');

        next?.classList.add(order);

        await new Promise(self.requestAnimationFrame);

        const end = watchMotion('transition', next);

        current?.classList.add(direction), next?.classList.add(direction);

        await end;

        next?.classList.remove(order, direction), next?.classList.add('active');

        current?.classList.remove('active', direction);
    }

    turnBack() {
        return this.turnTo(this.activeIndex - 1);
    }

    private timer: number;
    private pause = false;

    connectedCallback() {
        if (!this.controls && !this.indicators && isEmpty(this.interval))
            this.interval = 3;

        if (this.interval) {
            watchVisible(this, visible => (this.pause = !visible));

            this.timer = self.setInterval(
                () => !this.defaultSlot[1] || this.pause || this.turnTo(),
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
    private swipeStart: CartesianCoordinate;

    handleSwipeStart = ({ touches: [touch] }: TouchEvent) =>
        (this.swipeStart = { x: touch.pageX, y: touch.pageY });

    handleSwipeEnd = ({ changedTouches: [touch] }: TouchEvent) => {
        const vector = getSwipeVector(this.swipeStart, {
            x: touch.pageX,
            y: touch.pageY
        });

        if (vector)
            switch (vector.direction) {
                case 'left':
                    return this.turnTo();
                case 'right':
                    return this.turnBack();
            }
    };

    render({
        mode,
        indicators,
        activeIndex,
        defaultSlot,
        controls
    }: CarouselProps) {
        const { UID } = this,
            { length } = defaultSlot as VNodeChildElement[];

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
                onTouchStart={this.handleSwipeStart}
                onTouchEnd={this.handleSwipeEnd}
            >
                {!indicators || length < 2 ? null : (
                    <ol className="carousel-indicators">
                        {Array.from(new Array(length), (_, index) => (
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
                    {defaultSlot}
                </div>
                {!controls || length < 2 ? null : (
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
