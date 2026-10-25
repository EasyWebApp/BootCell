import { JsxChildren } from 'dom-renderer';
import { observable } from 'mobx';
import {
    FC,
    WebCell,
    WebCellProps,
    attribute,
    component,
    observer,
    on
} from 'web-cell';

import { BootstrapStyles } from '../BootstrapStyles';
import { CarouselModel } from './CarouselModel';

export interface CarouselCaptionProps extends WebCellProps<HTMLDivElement> {
    detail?: string;
}

export const CarouselCaption: FC<CarouselCaptionProps> = ({
    className = '',
    style,
    title,
    detail,
    children,
    ...props
}) => (
    <div
        className={className}
        style={{
            position: 'absolute',
            insetInline: '15%',
            bottom: '1rem',
            color: 'white',
            ...style
        }}
        data-carousel-caption=""
        {...props}
    >
        {children != null && (!Array.isArray(children) || children.length) ? (
            children
        ) : (
            <>
                <h5>{title}</h5>
                {detail && <p>{detail}</p>}
            </>
        )}
    </div>
);

export interface CarouselItemProps extends CarouselCaptionProps {
    interval?: number;
    image?: string;
}

export const CarouselItem: FC<CarouselItemProps> = ({
    className = '',
    interval,
    image,
    title,
    detail,
    children,
    ...props
}) => (
    <div
        className={`carousel-item ${className}`}
        {...props}
        data-bs-interval={interval}
    >
        {children != null && (!Array.isArray(children) || children.length) ? (
            children
        ) : (
            <>
                {image && (
                    <img
                        className="d-block w-100"
                        src={image}
                        alt={title || ''}
                    />
                )}
                {title && <CarouselCaption title={title} detail={detail} />}
            </>
        )}
    </div>
);

export interface CarouselProps {
    mode?: 'slide' | 'fade';
    slide?: boolean;
    fade?: boolean;
    controls?: boolean;
    indicators?: boolean;
    indicatorLabels?: string[];
    interval?: number | null;
    activeIndex?: number;
    defaultActiveIndex?: number;
    currentIndex?: number;
    /** Also emits a bubbling `select` CustomEvent<CarouselSelectionDetail>. */
    onSelect?: (index: number, event?: Event | null) => void;
    keyboard?: boolean;
    pause?: 'hover' | false;
    wrap?: boolean;
    touch?: boolean;
    prevIcon?: JsxChildren;
    nextIcon?: JsxChildren;
    prevLabel?: string | null;
    nextLabel?: string | null;
}

export interface Carousel extends WebCell<CarouselProps> {}

export interface CarouselSelectionDetail {
    activeIndex: number;
    originalEvent: Event | null;
}

@component({ tagName: 'carousel-box', mode: 'open' })
@observer
export class Carousel extends HTMLElement implements WebCell<CarouselProps> {
    @attribute @observable accessor interval: number | null = 5000;
    @attribute @observable accessor currentIndex = 0;
    @attribute @observable accessor activeIndex: number | undefined;
    @attribute @observable accessor defaultActiveIndex: number | undefined;
    @attribute @observable accessor mode: CarouselProps['mode'] = 'slide';
    @attribute @observable accessor slide = true;
    @attribute @observable accessor fade = false;
    @attribute @observable accessor controls = true;
    @attribute @observable accessor indicators = true;
    @attribute @observable accessor keyboard = true;
    @attribute @observable accessor pause: 'hover' | false = 'hover';
    @attribute @observable accessor wrap = true;
    @attribute @observable accessor touch = true;
    @observable accessor indicatorLabels: string[] = [];
    @observable accessor prevIcon: JsxChildren;
    @observable accessor nextIcon: JsxChildren;
    @observable accessor prevLabel: string | null = 'Previous';
    @observable accessor nextLabel: string | null = 'Next';
    onSelect?: CarouselProps['onSelect'];
    readonly model = new CarouselModel(this);

    // Match Tabs' JSX bridge without populating the native onselect slot.
    get onselect(): GlobalEventHandlers['onselect'] {
        return null;
    }
    set onselect(value: CarouselProps['onSelect'] | null) {
        this.onSelect = value ?? undefined;
    }

    get itemMeta() {
        return this.model.items.map(item => ({
            caption: (
                item.querySelector('[data-carousel-caption]')?.textContent ||
                item.textContent ||
                ''
            ).trim()
        }));
    }

    connectedCallback() {
        if (this.mounted) {
            this.model.mount();
            void this.update();
        }
    }

    mountedCallback() {
        this.model.mount();
    }

    disconnectedCallback() {
        this.model.dispose();
    }

    turnTo(index = this.model.index + 1, event?: Event) {
        this.model.select(index, event);
    }

    turnBack() {
        this.turnByOffset(-1);
    }

    next(event?: Event) {
        this.turnByOffset(1, event);
    }

    prev(event?: Event) {
        this.turnByOffset(-1, event);
    }

    turnByOffset(delta: number, event?: Event) {
        this.model.select(this.model.index + delta, event);
    }

    handleActiveItem(_index = this.model.index) {
        this.model.synchronize();
    }

    @on('click', '[data-bs-slide]')
    handleButtonClick(event: MouseEvent, { dataset }: HTMLButtonElement) {
        this.turnByOffset(dataset.bsSlide === 'next' ? 1 : -1, event);
    }

    // Compatibility helpers; native buttons already synthesize one click on Enter.
    handleButtonPress(event: KeyboardEvent, target: HTMLButtonElement) {
        if (event.key === 'Enter')
            this.turnByOffset(target.dataset.bsSlide === 'next' ? 1 : -1);
    }

    @on('click', '[data-bs-slide-to]')
    handleIndicatorsButtonClick(
        event: MouseEvent,
        { dataset }: HTMLButtonElement
    ) {
        this.model.select(+dataset.bsSlideTo, event);
    }

    handleIndicatorsButtonPress(
        event: KeyboardEvent,
        target: HTMLButtonElement
    ) {
        if (event.key === 'Enter')
            this.model.select(+target.dataset.bsSlideTo, event);
    }

    @on('keydown', '.carousel')
    handleKeyDown(event: KeyboardEvent) {
        this.model.keyDown(event);
    }

    renderContent() {
        const { model, itemMeta, controls, indicators, indicatorLabels } = this;
        const index = model.index;
        return (
            <div
                className={`carousel carousel-overlay ${model.fading ? 'carousel-fade' : ''} ${this.slide ? '' : 'carousel-no-animation'}`}
                role="region"
                aria-roledescription="carousel"
                ariaLabel={this.getAttribute('aria-label') || 'Carousel'}
                tabIndex={0}
                onMouseEnter={() => model.setHover(true)}
                onMouseLeave={() => model.setHover(false)}
                onTouchStart={event => model.touchStart(event)}
                onTouchEnd={event => model.touchEnd(event)}
                onTouchCancel={() => model.cancelTouch()}
            >
                <div
                    className="carousel-inner"
                    style={{
                        scrollBehavior: this.slide ? undefined : 'auto',
                        overflowX:
                            !this.touch || model.fading ? 'hidden' : undefined,
                        touchAction: this.touch ? undefined : 'pan-y'
                    }}
                    onScroll={() => model.scheduleScroll()}
                    onScrollEnd={() => model.finishScroll()}
                    onWheel={() => model.cancelScrollCommand()}
                    onPointerDown={() => model.cancelScrollCommand()}
                >
                    <slot />
                </div>
                <div className="carousel-overlay-controls">
                    {controls && (
                        <button
                            type="button"
                            className="btn-icon"
                            data-bs-slide="prev"
                            disabled={!this.wrap && index <= 0}
                            ariaLabel={this.prevLabel || undefined}
                        >
                            {this.prevIcon !== undefined ? (
                                this.prevIcon
                            ) : (
                                <span
                                    className="carousel-icon-prev"
                                    ariaHidden="true"
                                />
                            )}
                            {this.prevLabel && (
                                <span className="visually-hidden">
                                    {this.prevLabel}
                                </span>
                            )}
                        </button>
                    )}
                    {indicators && (
                        <div className="carousel-indicators">
                            {itemMeta.map(({ caption }, position) => (
                                <button
                                    type="button"
                                    ariaLabel={
                                        indicatorLabels[position] ||
                                        caption ||
                                        `Slide ${position + 1}`
                                    }
                                    data-bs-target=""
                                    data-bs-slide-to={position}
                                    className={
                                        index === position ? 'active' : ''
                                    }
                                    ariaCurrent={
                                        index === position ? 'true' : 'false'
                                    }
                                />
                            ))}
                        </div>
                    )}
                    {controls && (
                        <button
                            type="button"
                            className="btn-icon"
                            data-bs-slide="next"
                            disabled={
                                !this.wrap && index >= itemMeta.length - 1
                            }
                            ariaLabel={this.nextLabel || undefined}
                        >
                            {this.nextIcon !== undefined ? (
                                this.nextIcon
                            ) : (
                                <span
                                    className="carousel-icon-next"
                                    ariaHidden="true"
                                />
                            )}
                            {this.nextLabel && (
                                <span className="visually-hidden">
                                    {this.nextLabel}
                                </span>
                            )}
                        </button>
                    )}
                </div>
            </div>
        );
    }

    render() {
        return (
            <>
                <BootstrapStyles />
                <style>{`
                    :host { display: block }
                    slot { display: contents }
                    ::slotted(.carousel-item) { position: relative; flex: 0 0 100%; min-width: 0; scroll-snap-align: start; scroll-snap-stop: always }
                    .carousel-fade ::slotted(.carousel-item) { grid-area: 1/1; width: 100%; visibility: hidden; opacity: 0 }
                    .carousel-fade ::slotted(.carousel-item.active) { visibility: visible; opacity: 1 }
                    @media (prefers-reduced-motion: no-preference) {
                        .carousel-fade ::slotted(.carousel-item) { transition: opacity .6s ease, visibility 0s linear .6s }
                        .carousel-fade ::slotted(.carousel-item.active) { transition: opacity .6s ease }
                    }
                    .carousel-no-animation ::slotted(.carousel-item) { transition: none }
                `}</style>
                {this.renderContent()}
            </>
        );
    }
}
