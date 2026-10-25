export type Placement =
    `${'top' | 'bottom' | 'left' | 'right' | 'auto'}${'' | '-start' | '-end'}`;

/** DOMRenderer lowercases event props; retain component callback signatures. */
export class CallbackElement extends HTMLElement {
    static callbacks: string[] = [];

    constructor() {
        super();
        for (const name of (this.constructor as typeof CallbackElement)
            .callbacks)
            Object.defineProperty(this, name.toLowerCase(), {
                configurable: true,
                get: (): unknown => Reflect.get(this, name),
                set: (value: unknown) => {
                    Reflect.set(this, name, value);
                }
            });
    }
}

export function validatePlacement(
    placement: string
): asserts placement is Placement {
    if (!/^(top|bottom|left|right|auto)(-start|-end)?$/.test(placement))
        throw new TypeError(`Invalid overlay placement: ${placement}`);
}

export function validateDelay(delay: number) {
    if (!Number.isFinite(delay) || delay < 0)
        throw new RangeError('Delay must be a finite, non-negative number');
}

/** Owns document subscriptions, including overlays rendered across shadow roots. */
export class RootCloseGuard {
    private document?: Document;

    constructor(
        private readonly contains: (event: Event) => boolean,
        private readonly close: (event: Event) => void,
        private readonly event: 'click' | 'mousedown' = 'click'
    ) {
        if (!['click', 'mousedown'].includes(event))
            throw new TypeError(`Invalid root-close event: ${event}`);
    }

    private outside = (event: MouseEvent) => {
        if (
            event.button !== 0 ||
            event.ctrlKey ||
            event.altKey ||
            event.metaKey ||
            event.shiftKey ||
            this.contains(event)
        )
            return;
        this.close(event);
    };

    private keyboard = (event: KeyboardEvent) => {
        if (event.key === 'Escape') this.close(event);
    };

    connect(document: Document) {
        if (this.document === document) return;
        this.disconnect();
        this.document = document;
        document.addEventListener(this.event, this.outside, true);
        document.addEventListener('keydown', this.keyboard);
    }

    disconnect() {
        this.document?.removeEventListener(this.event, this.outside, true);
        this.document?.removeEventListener('keydown', this.keyboard);
        this.document = undefined;
    }
}

export type OverlayTarget = HTMLElement | (() => HTMLElement);

/** A dependency-free fixed-position overlay with viewport flip and clamping. */
export class OverlayPosition {
    private resize?: ResizeObserver;
    private view?: Window;

    constructor(
        readonly element: HTMLElement,
        readonly target: OverlayTarget,
        readonly placement: Placement = 'top',
        readonly offset = 8,
        readonly flip = true
    ) {
        validatePlacement(placement);
        if (!Number.isFinite(offset))
            throw new RangeError('Overlay offset must be finite');
    }

    resolveTarget() {
        const target =
            typeof this.target === 'function' ? this.target() : this.target;
        if (!(target instanceof HTMLElement))
            throw new TypeError(
                'A visible overlay requires an HTMLElement target'
            );
        return target;
    }

    update = () => {
        const target = this.resolveTarget();
        const rect = target.getBoundingClientRect();
        const box = this.element.getBoundingClientRect();
        const view = target.ownerDocument.defaultView;
        const [requested, align] = this.placement.split('-');
        const space = {
            top: rect.top,
            bottom: view.innerHeight - rect.bottom,
            left: rect.left,
            right: view.innerWidth - rect.right
        };
        let side =
            requested === 'auto'
                ? Object.keys(space).reduce((a, b) =>
                      space[a] > space[b] ? a : b
                  )
                : requested;
        const opposite = {
            top: 'bottom',
            bottom: 'top',
            left: 'right',
            right: 'left'
        };
        const vertical = side === 'top' || side === 'bottom';
        if (
            this.flip &&
            space[side] < (vertical ? box.height : box.width) + this.offset &&
            space[opposite[side]] > space[side]
        )
            side = opposite[side];
        let left = rect.left + (rect.width - box.width) / 2;
        let top = rect.top + (rect.height - box.height) / 2;
        if (side === 'top' || side === 'bottom') {
            top =
                side === 'top'
                    ? rect.top - box.height - this.offset
                    : rect.bottom + this.offset;
            if (align === 'start') left = rect.left;
            if (align === 'end') left = rect.right - box.width;
        } else {
            left =
                side === 'left'
                    ? rect.left - box.width - this.offset
                    : rect.right + this.offset;
            if (align === 'start') top = rect.top;
            if (align === 'end') top = rect.bottom - box.height;
        }
        left = Math.max(0, Math.min(left, view.innerWidth - box.width));
        top = Math.max(0, Math.min(top, view.innerHeight - box.height));
        Object.assign(this.element.style, {
            position: 'fixed',
            left: `${left}px`,
            top: `${top}px`
        });
        this.element.dataset.placement = `${side}${align ? `-${align}` : ''}`;
        const direction = { left: 'start', right: 'end' }[side] || side;
        for (const content of this.element.querySelectorAll<HTMLElement>(
            '.popover, .tooltip'
        )) {
            const prefix = content.classList.contains('popover')
                ? 'popover'
                : 'tooltip';
            for (const className of [...content.classList])
                if (className.startsWith(`bs-${prefix}-`))
                    content.classList.remove(className);
            content.classList.add(`bs-${prefix}-${direction}`);
            content.dataset.placement = this.element.dataset.placement;
        }
    };

    connect() {
        this.disconnect();
        const target = this.resolveTarget();
        this.update();
        this.view = target.ownerDocument.defaultView;
        this.view.addEventListener('resize', this.update);
        this.view.addEventListener('scroll', this.update, true);
        if (typeof ResizeObserver === 'function') {
            this.resize = new ResizeObserver(this.update);
            this.resize.observe(target);
            this.resize.observe(this.element);
        }
    }

    disconnect() {
        this.view?.removeEventListener('resize', this.update);
        this.view?.removeEventListener('scroll', this.update, true);
        this.resize?.disconnect();
        this.view = undefined;
    }
}
