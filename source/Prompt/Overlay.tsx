import { JsxChildren } from 'dom-renderer';
import { action, observable } from 'mobx';
import {
    WebCell,
    WebCellProps,
    attribute,
    component,
    observer
} from 'web-cell';
import { BootstrapStyles } from '../BootstrapStyles';
import {
    CallbackElement,
    OverlayPosition,
    OverlayTarget,
    Placement,
    RootCloseGuard,
    validateDelay
} from './OverlayModel';

export type { Placement, OverlayTarget } from './OverlayModel';

export interface OverlayProps extends WebCellProps {
    target: OverlayTarget;
    show?: boolean;
    defaultShow?: boolean;
    placement?: Placement;
    rootClose?: boolean;
    rootCloseEvent?: 'click' | 'mousedown';
    onHide?: (event?: Event) => void;
    offset?: number;
    flip?: boolean;
}

export interface Overlay extends WebCell {}

@component({ tagName: 'overlay-box', mode: 'open' })
@observer
export class Overlay extends CallbackElement {
    static callbacks = ['onHide'];
    declare props: OverlayProps;
    @observable accessor target: OverlayTarget;
    @attribute @observable accessor show: boolean;
    @attribute @observable accessor defaultShow = false;
    @observable accessor dismissed = false;
    @attribute @observable accessor placement: Placement = 'top';
    @attribute @observable accessor rootClose = false;
    @attribute @observable accessor rootCloseEvent: 'click' | 'mousedown' =
        'click';
    @attribute @observable accessor offset = 8;
    @attribute @observable accessor flip = true;
    onHide?: OverlayProps['onHide'];
    private position?: OverlayPosition;
    private guard?: RootCloseGuard;

    get visible() {
        return this.show ?? (this.defaultShow && !this.dismissed);
    }

    hide = action((event: Event) => {
        if (this.show === undefined) this.dismissed = true;
        this.onHide?.(event);
        this.dispatchEvent(new CustomEvent('hide', { detail: event }));
    });

    connectedCallback() {
        if (this.mounted) void this.update();
    }

    updatedCallback() {
        this.position?.disconnect();
        this.guard?.disconnect();
        this.hidden = !this.visible;
        if (typeof this.showPopover === 'function') {
            this.popover = 'manual';
            const open = this.matches(':popover-open');
            if (this.visible && this.isConnected && !open) this.showPopover();
            else if ((!this.visible || !this.isConnected) && open)
                this.hidePopover();
        }
        if (!this.visible || !this.isConnected) return;
        this.style.zIndex = '1080';
        this.position = new OverlayPosition(
            this,
            this.target,
            this.placement,
            this.offset,
            this.flip
        );
        this.position.connect();
        if (this.rootClose) {
            this.guard = new RootCloseGuard(
                event => {
                    const target = this.position.resolveTarget();
                    return (
                        event.composedPath().includes(this) ||
                        event.composedPath().includes(target)
                    );
                },
                this.hide,
                this.rootCloseEvent
            );
            this.guard.connect(this.ownerDocument);
        }
    }

    disconnectedCallback() {
        this.position?.disconnect();
        this.guard?.disconnect();
        if (
            typeof this.hidePopover === 'function' &&
            this.matches(':popover-open')
        )
            this.hidePopover();
    }

    render() {
        return (
            <>
                <BootstrapStyles />
                <style>{`
                :host {
                    display: block; width: max-content; max-width: 100vw;
                    margin: 0; padding: 0; border: 0; background: transparent;
                    color: inherit; overflow: visible;
                }
                :host([hidden]) { display: none; }
                ::slotted(.popover), ::slotted(.tooltip) { position: relative; inset: auto; }
            `}</style>
                <slot />
            </>
        );
    }
}

export type OverlayTriggerType = 'click' | 'hover' | 'focus';
export interface OverlayTriggerProps extends Omit<WebCellProps, 'onToggle'> {
    overlay: JsxChildren;
    trigger?: OverlayTriggerType | OverlayTriggerType[];
    show?: boolean;
    defaultShow?: boolean;
    placement?: Placement;
    delay?: number | { show?: number; hide?: number };
    onToggle?: (show: boolean) => void;
}

/** Shared trigger state and lifecycle for popovers and arbitrary overlays. */
export class OverlayTriggerElement extends CallbackElement {
    static callbacks = ['onToggle'];
    declare mounted: boolean;
    declare update: () => Promise<void>;
    @observable accessor overlay: JsxChildren;
    @observable accessor trigger: OverlayTriggerProps['trigger'] = [
        'hover',
        'focus'
    ];
    @attribute @observable accessor show: boolean;
    @attribute @observable accessor defaultShow = false;
    @attribute @observable accessor placement: Placement = 'right';
    @observable accessor delay: OverlayTriggerProps['delay'] = 0;
    @observable accessor active = false;
    private overlayId = `overlay-${++overlayId}`;
    onToggle?: OverlayTriggerProps['onToggle'];
    private timer?: ReturnType<typeof setTimeout>;
    @observable accessor initialized = false;
    private hovered = false;
    private focused = false;

    get visible() {
        return this.show ?? (this.initialized ? this.active : this.defaultShow);
    }
    get targetElement() {
        return (
            this.querySelector<HTMLElement>('[slot="trigger"]') ||
            (this.firstElementChild as HTMLElement)
        );
    }
    private hasTrigger(type: OverlayTriggerType) {
        return [this.trigger].flat().includes(type);
    }

    toggle = (show: boolean) => {
        clearTimeout(this.timer);
        const delay =
            typeof this.delay === 'number'
                ? this.delay
                : (this.delay?.[show ? 'show' : 'hide'] ?? 0);
        validateDelay(delay);
        const apply = action(() => {
            this.initialized = true;
            if (this.show === undefined) this.active = show;
            this.onToggle?.(show);
            this.dispatchEvent(new CustomEvent('toggle', { detail: show }));
        });
        if (delay) this.timer = setTimeout(apply, delay);
        else apply();
    };

    private handleClick = (event: MouseEvent) => {
        if (
            this.hasTrigger('click') &&
            event.composedPath().includes(this.targetElement)
        )
            this.toggle(!this.visible);
    };
    private enter = () => {
        if (!this.hasTrigger('hover')) return;
        this.hovered = true;
        this.toggle(true);
    };
    private leave = () => {
        if (!this.hasTrigger('hover')) return;
        this.hovered = false;
        if (!this.focused) this.toggle(false);
    };
    private handleFocus = () => {
        if (!this.hasTrigger('focus')) return;
        this.focused = true;
        this.toggle(true);
    };
    private handleBlur = (event: FocusEvent) => {
        if (!this.hasTrigger('focus')) return;
        if (
            event.relatedTarget instanceof Node &&
            this.contains(event.relatedTarget)
        )
            return;
        this.focused = false;
        if (this.hasTrigger('focus') && !this.hovered) this.toggle(false);
    };
    connectedCallback() {
        this.style.display = 'inline-block';
        this.addEventListener('click', this.handleClick);
        this.addEventListener('mouseenter', this.enter);
        this.addEventListener('mouseleave', this.leave);
        this.addEventListener('focusin', this.handleFocus);
        this.addEventListener('focusout', this.handleBlur);
        if (this.mounted) void this.update();
    }
    disconnectedCallback() {
        clearTimeout(this.timer);
        this.removeEventListener('click', this.handleClick);
        this.removeEventListener('mouseenter', this.enter);
        this.removeEventListener('mouseleave', this.leave);
        this.removeEventListener('focusin', this.handleFocus);
        this.removeEventListener('focusout', this.handleBlur);
        const target = this.targetElement;
        const describedBy = target
            ?.getAttribute('aria-describedby')
            ?.split(' ')
            .filter(id => id !== this.overlayId);
        if (describedBy?.length)
            target.setAttribute('aria-describedby', describedBy.join(' '));
        else target?.removeAttribute('aria-describedby');
    }
    updatedCallback() {
        const target = this.targetElement;
        if (!target) return;
        const ids = new Set(
            target.getAttribute('aria-describedby')?.split(' ').filter(Boolean)
        );
        if (this.visible) ids.add(this.overlayId);
        else ids.delete(this.overlayId);
        if (ids.size)
            target.setAttribute('aria-describedby', [...ids].join(' '));
        else target.removeAttribute('aria-describedby');
    }
    renderOverlay() {
        return this.overlay;
    }
    render() {
        if (
            [this.trigger]
                .flat()
                .some(trigger => !['click', 'hover', 'focus'].includes(trigger))
        )
            throw new TypeError(
                'Overlay trigger must be click, hover or focus'
            );
        return (
            <>
                <BootstrapStyles />
                <slot />
                <Overlay
                    id={this.overlayId}
                    target={() => this.targetElement}
                    placement={this.placement}
                    show={this.visible}
                    rootClose
                    onHide={() => this.toggle(false)}
                >
                    {this.renderOverlay()}
                </Overlay>
            </>
        );
    }
}

let overlayId = 0;

export interface OverlayTrigger extends Omit<
    WebCell,
    'props' | 'connectedCallback' | 'disconnectedCallback' | 'updatedCallback'
> {}
@component({ tagName: 'overlay-trigger', mode: 'open' })
@observer
export class OverlayTrigger extends OverlayTriggerElement {
    declare props: OverlayTriggerProps;
}
