import { action, observable } from 'mobx';
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

export interface CarouselItemProps extends WebCellProps<HTMLDivElement> {
    interval?: number;
}

export const CarouselItem: FC<CarouselItemProps> = ({
    className = '',
    interval,
    style,
    children,
    ...props
}) => (
    <div
        className={`carousel-item ${className}`}
        {...props}
        style={{ position: 'relative', ...style }}
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
            bottom: '4rem',
            zIndex: '1',
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

    private timer?: number;
    private timerInterval?: number;

    connectedCallback() {
        if (this.mounted) {
            this.update();
            this.syncItems();
        }
    }

    disconnectedCallback() {
        window.clearInterval(this.timer);
        this.timer = undefined;
    }

    mountedCallback() {
        this.syncItems();
    }

    updatedCallback() {
        this.handleActiveItem(this.currentIndex);
        this.syncTimer();
    }

    @action
    syncItems = () => {
        const items = [...this.querySelectorAll('.carousel-item')];
        const metadata = items.map(item => ({
            caption: (
                item.querySelector('[data-carousel-caption]')?.textContent ||
                item.textContent
            ).trim()
        }));
        if (
            metadata.length !== this.itemMeta.length ||
            metadata.some(
                (item, index) => item.caption !== this.itemMeta[index]?.caption
            )
        )
            this.itemMeta = metadata;

        if (items.length)
            this.currentIndex =
                ((this.currentIndex % items.length) + items.length) %
                items.length;
        else this.currentIndex = 0;
        this.handleActiveItem(this.currentIndex);
        this.syncTimer();
    };

    syncTimer() {
        const enabled =
            this.isConnected &&
            this.mounted &&
            this.interval > 0 &&
            this.itemMeta.length > 0;
        if (
            enabled &&
            this.timer !== undefined &&
            this.timerInterval === this.interval
        )
            return;
        window.clearInterval(this.timer);
        this.timer = undefined;
        this.timerInterval = this.interval;
        if (enabled)
            this.timer = window.setInterval(
                () => this.turnByOffset(1),
                this.interval
            );
    }

    @action
    turnByOffset(delta: number) {
        const { length } = this.itemMeta;
        if (length)
            this.currentIndex =
                (((this.currentIndex + delta) % length) + length) % length;
    }

    @on('click', '.carousel-overlay-controls > button')
    handleButtonClick(_: MouseEvent, { dataset }: HTMLButtonElement) {
        this.turnByOffset(dataset.bsSlide === 'next' ? 1 : -1);
    }

    @action
    @on('click', '.carousel-indicators button')
    handleIndicatorsButtonClick(_: MouseEvent, { dataset }: HTMLButtonElement) {
        this.currentIndex = +dataset.bsSlideTo;
    }

    handleActiveItem(currentIndex: number) {
        const items = this.querySelectorAll<HTMLElement>('.carousel-item');
        items.forEach((item, index) =>
            item.classList.toggle('active', index === currentIndex)
        );

        const item = items[currentIndex];
        const container =
            this.shadowRoot?.querySelector<HTMLElement>('.carousel-inner');
        if (item && container)
            container.scrollTo?.({
                left:
                    container.scrollLeft +
                    item.getBoundingClientRect().left -
                    container.getBoundingClientRect().left
            });
    }

    renderContent() {
        const { itemMeta, currentIndex } = this;

        return (
            <div className="carousel carousel-overlay">
                <div className="carousel-inner">
                    <slot onSlotChange={this.syncItems} />
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
                                key={index}
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
                <style>{`
                    :host { display: block; min-width: 0; }
                    ::slotted(.carousel-item) {
                        flex: 0 0 calc((100% - (var(--bs-carousel-items, 1) - 1) * var(--bs-carousel-items-gap, 0px)) / var(--bs-carousel-items, 1));
                        min-width: 0;
                        scroll-snap-align: start;
                        scroll-snap-stop: always;
                    }
                `}</style>
                <BootstrapStyles />
                {this.renderContent()}
            </>
        );
    }
}
