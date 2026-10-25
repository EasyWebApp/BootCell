import {
    action,
    autorun,
    computed,
    IReactionDisposer,
    observable,
    runInAction
} from 'mobx';

import type { Carousel, CarouselSelectionDetail } from './Carousel';

/** Coordinates native scroll-snap (or Bootstrap 6 CSS fade), without Bootstrap JS. */
export class CarouselModel {
    @observable accessor items: HTMLElement[] = [];
    @observable accessor hovered = false;
    @observable accessor visible = true;
    @observable accessor touching = false;
    private initialized = false;
    private stop?: IReactionDisposer;
    private mutations?: MutationObserver;
    private intersection?: IntersectionObserver;
    private resize?: ResizeObserver;
    private timer?: ReturnType<typeof setTimeout>;
    private scrollTimer?: ReturnType<typeof setTimeout>;
    private start?: { x: number; y: number };
    private pendingIndex?: number;
    private lastIndex = -1;
    private lastFade = false;

    constructor(readonly host: Carousel) {}

    @computed get fading() {
        return this.host.fade || this.host.mode === 'fade';
    }

    normalize(index: number) {
        const length = this.items.length;
        if (!length || !Number.isFinite(index)) return -1;
        index = Math.trunc(index);
        return this.host.wrap
            ? ((index % length) + length) % length
            : Math.max(0, Math.min(length - 1, index));
    }

    @computed get index() {
        return this.normalize(this.host.activeIndex ?? this.host.currentIndex);
    }

    @action
    refresh() {
        const selected = this.items[this.index];
        const items = [...this.host.children].filter(
            (child): child is HTMLElement =>
                child instanceof HTMLElement &&
                child.classList.contains('carousel-item')
        );
        if (
            items.length !== this.items.length ||
            items.some((item, index) => item !== this.items[index])
        ) {
            this.items = items;
            this.lastIndex = -1;
            if (this.initialized && this.host.activeIndex === undefined) {
                const index = items.indexOf(selected);
                this.host.currentIndex =
                    index >= 0
                        ? index
                        : Math.max(
                              0,
                              Math.min(items.length - 1, this.host.currentIndex)
                          );
            }
        }
        if (!this.initialized && items.length) {
            this.initialized = true;
            if (this.host.defaultActiveIndex !== undefined)
                this.host.currentIndex = this.host.defaultActiveIndex;
        }
        this.synchronize();
        this.restartTimer();
    }

    mount() {
        this.dispose();
        this.refresh();
        this.mutations = new MutationObserver(() => this.refresh());
        this.mutations.observe(this.host, {
            childList: true,
            subtree: true,
            characterData: true,
            attributes: true,
            attributeFilter: ['data-bs-interval']
        });
        if (typeof IntersectionObserver !== 'undefined') {
            this.intersection = new IntersectionObserver(([entry]) =>
                runInAction(() => {
                    this.visible = entry.isIntersecting;
                })
            );
            this.intersection.observe(this.host);
        }
        if (typeof ResizeObserver !== 'undefined' && this.viewport) {
            this.resize = new ResizeObserver(() => {
                this.lastIndex = -1;
                this.synchronize();
            });
            this.resize.observe(this.viewport);
        }
        document.addEventListener('visibilitychange', this.visibilityChange);
        this.stop = autorun(() => {
            this.synchronize();
            this.restartTimer();
        });
    }

    @action dispose() {
        this.stop?.();
        this.mutations?.disconnect();
        this.intersection?.disconnect();
        this.resize?.disconnect();
        document.removeEventListener('visibilitychange', this.visibilityChange);
        clearTimeout(this.timer);
        clearTimeout(this.scrollTimer);
        this.stop = undefined;
        this.start = undefined;
        this.hovered = false;
        this.touching = false;
        this.pendingIndex = undefined;
        this.lastIndex = -1;
    }

    private visibilityChange = () => this.restartTimer();

    private restartTimer() {
        clearTimeout(this.timer);
        const { interval: configured, pause, wrap } = this.host;
        const { hovered, visible, touching, index } = this;
        const raw = this.items[index]?.dataset.bsInterval;
        const interval = raw === undefined ? configured : Number(raw);
        if (
            !this.host.isConnected ||
            this.items.length < 2 ||
            !interval ||
            !Number.isFinite(interval) ||
            interval < 0 ||
            !visible ||
            touching ||
            document.hidden ||
            (pause === 'hover' && hovered)
        )
            return;
        if (!wrap && index === this.items.length - 1) return;
        this.timer = setTimeout(() => {
            this.select(this.index + 1);
            // A controlled owner may decline the selection.
            this.restartTimer();
        }, interval);
    }

    @action setHover(value: boolean) {
        this.hovered = value;
    }

    @action
    select(index: number, event?: Event) {
        index = this.normalize(index);
        if (index < 0 || index === this.index) return;
        if (this.host.activeIndex === undefined) this.host.currentIndex = index;
        this.host.onSelect?.(index, event ?? null);
        this.host.dispatchEvent(
            new CustomEvent<CarouselSelectionDetail>('select', {
                detail: { activeIndex: index, originalEvent: event ?? null },
                bubbles: true,
                composed: true
            })
        );
        this.synchronize();
    }

    private get viewport() {
        return this.host.shadowRoot?.querySelector<HTMLElement>(
            '.carousel-inner'
        );
    }

    synchronize() {
        const index = this.index;
        this.items.forEach((item, position) => {
            item.classList.toggle('active', position === index);
            item.setAttribute('aria-hidden', String(position !== index));
            item.setAttribute('aria-roledescription', 'slide');
            item.setAttribute(
                'aria-label',
                `${position + 1} of ${this.items.length}`
            );
            item.inert = position !== index;
        });
        const fading = this.fading;
        if (index === this.lastIndex && fading === this.lastFade) return;
        this.lastIndex = index;
        this.lastFade = fading;
        this.scrollTo(index);
    }

    private scrollTo(index: number, instant = false) {
        const viewport = this.viewport,
            item = this.items[index];
        if (!viewport || !item || this.fading) return;
        const box = viewport.getBoundingClientRect(),
            itemBox = item.getBoundingClientRect();
        const rtl = getComputedStyle(this.host).direction === 'rtl';
        const delta = rtl
            ? itemBox.right - box.right
            : itemBox.left - box.left - viewport.clientLeft;
        const left = viewport.scrollLeft + delta;
        this.pendingIndex = instant ? undefined : index;
        const reduced = globalThis.matchMedia?.(
            '(prefers-reduced-motion: reduce)'
        ).matches;
        const behavior =
            instant || !this.host.slide || reduced ? 'instant' : 'smooth';
        if (typeof viewport.scrollTo === 'function')
            viewport.scrollTo({ left, behavior });
        else viewport.scrollLeft = left;
        if (!instant) this.scheduleScroll();
    }

    scheduleScroll() {
        clearTimeout(this.scrollTimer);
        if (!this.host.isConnected) return;
        this.scrollTimer = setTimeout(() => this.finishScroll(), 140);
    }

    cancelScrollCommand() {
        this.pendingIndex = undefined;
    }

    finishScroll() {
        clearTimeout(this.scrollTimer);
        const viewport = this.viewport;
        if (
            !this.host.isConnected ||
            !viewport ||
            !this.items.length ||
            this.fading ||
            !viewport.clientWidth
        ) {
            this.pendingIndex = undefined;
            return;
        }
        const box = viewport.getBoundingClientRect();
        const rtl = getComputedStyle(this.host).direction === 'rtl';
        const distances = this.items.map(item =>
            Math.abs(
                rtl
                    ? item.getBoundingClientRect().right - box.right
                    : item.getBoundingClientRect().left -
                          box.left -
                          viewport.clientLeft
            )
        );
        const index = distances.indexOf(Math.min(...distances));
        const pending = this.pendingIndex;
        this.pendingIndex = undefined;
        if (pending !== undefined && index !== pending) {
            // A new command can interrupt an older native smooth-scroll animation.
            this.scrollTo(this.index, true);
            return;
        }
        this.lastIndex = index;
        if (index !== this.index) {
            this.select(index);
            if (index !== this.index) this.scrollTo(this.index, true);
        }
    }

    keyDown(event: KeyboardEvent) {
        if (
            !this.host.keyboard ||
            (event.target as HTMLElement)?.closest(
                'input, textarea, select, [contenteditable]'
            )
        )
            return;
        if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
        event.preventDefault();
        const rtl = getComputedStyle(this.host).direction === 'rtl';
        this.select(
            this.index + ((event.key === 'ArrowRight') !== rtl ? 1 : -1),
            event
        );
    }

    @action touchStart(event: TouchEvent) {
        if (!this.host.touch) return;
        this.touching = true;
        this.pendingIndex = undefined;
        if (!this.fading || event.touches.length !== 1) return;
        this.start = { x: event.touches[0].pageX, y: event.touches[0].pageY };
    }

    @action touchEnd(event: TouchEvent) {
        this.touching = false;
        const start = this.start,
            end = event.changedTouches[0];
        this.start = undefined;
        if (!this.host.touch || !start || !end) return;
        const x = end.pageX - start.x,
            y = end.pageY - start.y;
        if (Math.abs(x) > 40 && Math.abs(x) > Math.abs(y)) {
            const rtl = getComputedStyle(this.host).direction === 'rtl';
            this.select(this.index + (x < 0 !== rtl ? 1 : -1), event);
        }
    }

    @action cancelTouch() {
        this.touching = false;
        this.start = undefined;
    }
}
