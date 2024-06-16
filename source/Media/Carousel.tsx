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
    children,
    ...props
}) => (
    <div className={`carousel-caption ${className}`} {...props}>
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
                    item.querySelector('.carousel-caption')?.textContent ||
                    item.textContent
                ).trim()
            }));
    }

    turnByOffset(delta: number) {
        this.currentIndex = (this.currentIndex + delta) % this.itemMeta.length;
    }

    @on('click', '.carousel > button')
    handleButtonClick(_: MouseEvent, { dataset }: HTMLButtonElement) {
        this.turnByOffset(dataset.bsSlide === 'next' ? 1 : -1);
    }

    @on('keyup', '.carousel > button')
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
            <div className="carousel">
                <div className="carousel-indicators">
                    {itemMeta.map(({ caption }, index) => (
                        <button
                            type="button"
                            ariaLabel={caption}
                            data-bs-slide-to={index}
                            className={currentIndex === index ? 'active' : ''}
                            ariaCurrent={currentIndex === index ? 'true' : ''}
                        />
                    ))}
                </div>
                <div className="carousel-inner">
                    <slot />
                </div>
                <button
                    type="button"
                    className="carousel-control-prev"
                    data-bs-slide="prev"
                >
                    <span
                        className="carousel-control-prev-icon"
                        ariaHidden="true"
                    />
                    <span className="visually-hidden">-1</span>
                </button>
                <button
                    type="button"
                    className="carousel-control-next"
                    data-bs-slide="next"
                >
                    <span
                        className="carousel-control-next-icon"
                        ariaHidden="true"
                    />
                    <span className="visually-hidden">+1</span>
                </button>
            </div>
        );
    }

    render() {
        return (
            <>
                <link
                    rel="stylesheet"
                    href="https://unpkg.com/bootstrap@5.3.3/dist/css/bootstrap.min.css"
                />
                {this.renderContent()}
            </>
        );
    }
}
