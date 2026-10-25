import { observable } from 'mobx';
import {
    FC,
    WebCell,
    WebCellProps,
    attribute,
    component,
    observer,
    on,
    reaction
} from 'web-cell';

import { BootstrapStyles } from '../BootstrapStyles';

export interface CarouselItemProps extends WebCellProps<HTMLDivElement> {
    interval?: number;
}

export const CarouselItem: FC<CarouselItemProps> = ({
    className = '',
    interval,
    children,
    ...props
}) => (
    <div
        className={`carousel-item ${className}`}
        {...props}
        data-bs-interval={interval}
    >
        {children}
    </div>
);

export const CarouselCaption: FC<WebCellProps<HTMLDivElement>> = ({
    className = '',
    style,
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
        {children}
    </div>
);

interface ItemMeta {
    caption?: string;
}

export interface CarouselProps {
    interval?: number;
}

export interface Carousel extends WebCell<CarouselProps> {}

@component({
    tagName: 'carousel-box',
    mode: 'open'
})
@observer
export class Carousel extends HTMLElement implements WebCell<CarouselProps> {
    @attribute
    @observable
    accessor interval: number | undefined;

    @observable
    accessor itemMeta: ItemMeta[] = [];

    @attribute
    @observable
    accessor currentIndex = 0;

    private timer: number;

    connectedCallback() {
        if (this.interval)
            this.timer ||= window.setInterval(
                () => this.turnByOffset(1),
                this.interval
            );
        else this.handleActiveItem(this.currentIndex);
    }

    disconnectedCallback() {
        clearInterval(this.timer);
    }

    mountedCallback() {
        const items = [...this.querySelectorAll('.carousel-item')];

        if (this.itemMeta.length !== items.length)
            this.itemMeta = items.map(item => ({
                caption: (
                    item.querySelector('[data-carousel-caption]')
                        ?.textContent || item.textContent
                ).trim()
            }));
    }

    turnByOffset(delta: number) {
        this.currentIndex = (this.currentIndex + delta) % this.itemMeta.length;
    }

    @on('click', '.carousel-overlay-controls > button')
    handleButtonClick(_: MouseEvent, { dataset }: HTMLButtonElement) {
        this.turnByOffset(dataset.bsSlide === 'next' ? 1 : -1);
    }

    @on('keyup', '.carousel-overlay-controls > button')
    handleButtonPress({ key }: KeyboardEvent, { dataset }: HTMLButtonElement) {
        if (key === 'Enter')
            this.turnByOffset(dataset.bsSlide === 'next' ? 1 : -1);
    }

    @on('click', '.carousel-indicators button')
    handleIndicatorsButtonClick(_: MouseEvent, { dataset }: HTMLButtonElement) {
        this.currentIndex = +dataset.bsSlideTo;
    }

    @on('keyup', '.carousel-indicators button')
    handleIndicatorsButtonPress(
        { key }: KeyboardEvent,
        { dataset }: HTMLButtonElement
    ) {
        if (key === 'Enter') this.currentIndex = +dataset.bsSlideTo;
    }

    @reaction(({ currentIndex }) => currentIndex)
    handleActiveItem(currentIndex: number) {
        this.querySelector('.carousel-item.active')?.classList.remove('active');

        this.children[currentIndex].classList.add('active');
    }

    renderContent() {
        const { itemMeta, currentIndex } = this;

        return (
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
                            ariaHidden="true"
                        />
                        <span className="visually-hidden">-1</span>
                    </button>
                    <div className="carousel-indicators">
                        {itemMeta.map(({ caption }, index) => (
                            <button
                                type="button"
                                ariaLabel={caption}
                                data-bs-target=""
                                data-bs-slide-to={index}
                                className={
                                    currentIndex === index ? 'active' : ''
                                }
                                ariaCurrent={
                                    currentIndex === index ? 'true' : ''
                                }
                            />
                        ))}
                    </div>
                    <button
                        type="button"
                        className="btn-icon"
                        data-bs-slide="next"
                    >
                        <span
                            className="carousel-icon-next"
                            ariaHidden="true"
                        />
                        <span className="visually-hidden">+1</span>
                    </button>
                </div>
            </div>
        );
    }

    render() {
        return (
            <>
                <BootstrapStyles />
                {this.renderContent()}
            </>
        );
    }
}
