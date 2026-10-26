import classNames from 'classnames';
import { JsxChildren } from 'dom-renderer';
import { action, observable } from 'mobx';
import { FC, WebCellProps, attribute, component, observer } from 'web-cell';

import { Button, ButtonProps } from '../Form/Button';
import { BootstrapStyles } from '../BootstrapStyles';
import {
    CallbackElement,
    OverlayPosition,
    Placement,
    RootCloseGuard
} from '../Prompt/OverlayModel';

export type DropdownAlign =
    | 'start'
    | 'end'
    | Partial<Record<'sm' | 'md' | 'lg' | 'xl' | '2xl', 'start' | 'end'>>;
export interface DropdownProps extends Omit<
    WebCellProps<HTMLDivElement>,
    'onToggle' | 'onSelect'
> {
    show?: boolean;
    defaultShow?: boolean;
    drop?: 'up' | 'down' | 'start' | 'end' | 'up-centered' | 'down-centered';
    align?: DropdownAlign;
    autoClose?: boolean | 'inside' | 'outside';
    focusFirstItemOnShow?: boolean | 'keyboard';
    rootCloseEvent?: 'click' | 'mousedown';
    onToggle?: (
        show: boolean,
        meta: {
            source: 'click' | 'keydown' | 'rootClose' | 'select';
            originalEvent?: Event;
        }
    ) => void;
    onSelect?: (eventKey: string, event: Event) => void;
}

function alignClasses(align: DropdownAlign = 'start') {
    if (typeof align === 'string') {
        if (!['start', 'end'].includes(align))
            throw new TypeError(`Invalid dropdown alignment: ${align}`);
        return align === 'end' ? 'menu-end' : undefined;
    }
    return Object.entries(align).map(([size, value]) => {
        if (
            !['sm', 'md', 'lg', 'xl', '2xl'].includes(size) ||
            !['start', 'end'].includes(value)
        )
            throw new TypeError('Invalid responsive dropdown alignment');
        return `${size}:menu-${value}`;
    });
}

const controllers = new WeakMap<HTMLElement, DropdownController>();

/** Keeps menu state, selection, focus and document subscriptions together. */
class DropdownController {
    private disposed = false;
    private open: boolean;
    private guard: RootCloseGuard;
    private removal?: MutationObserver;
    private position?: OverlayPosition;
    constructor(
        private root: HTMLElement,
        private props: DropdownProps
    ) {
        this.open = props.show ?? props.defaultShow ?? false;
        this.guard = this.createGuard(props.rootCloseEvent);
        root.addEventListener('click', this.click);
        root.addEventListener('keydown', this.keyboard);
        queueMicrotask(() => this.sync());
    }
    private createGuard(type: DropdownProps['rootCloseEvent']) {
        return new RootCloseGuard(
            event => event.composedPath().includes(this.root),
            event => {
                if (!this.root.isConnected) {
                    this.dispose();
                    return;
                }
                this.change(false, 'rootClose', event);
                if (event instanceof KeyboardEvent && !this.open)
                    this.toggle?.focus();
            },
            type
        );
    }
    configure(props: DropdownProps) {
        if (this.disposed) {
            this.disposed = false;
            this.root.addEventListener('click', this.click);
            this.root.addEventListener('keydown', this.keyboard);
        }
        if (props.rootCloseEvent !== this.props.rootCloseEvent) {
            this.guard.disconnect();
            this.guard = this.createGuard(props.rootCloseEvent);
        }
        this.props = props;
        if (props.show !== undefined) this.open = props.show;
        queueMicrotask(() => this.sync());
    }
    get toggle() {
        return this.root.querySelector<HTMLElement>('[data-dropdown-toggle]');
    }
    get menu() {
        return this.root.querySelector<HTMLElement>('.menu');
    }
    get alignment(): DropdownAlign {
        return this.menu?.['dropdownAlign'] ?? this.props.align;
    }
    get items() {
        const nodes = [
            ...this.root.querySelectorAll<HTMLElement>('.menu-item')
        ];
        for (const slot of this.root.querySelectorAll('slot'))
            for (const child of slot.assignedElements({ flatten: true }))
                nodes.push(
                    ...(child.matches('.menu-item')
                        ? [child as HTMLElement]
                        : [
                              ...child.querySelectorAll<HTMLElement>(
                                  '.menu-item'
                              )
                          ])
                );
        return nodes.filter(
            item =>
                !item.matches('.disabled, :disabled, [aria-disabled="true"]')
        );
    }
    sync() {
        if (this.disposed) return;
        this.position?.disconnect();
        const alignment = this.alignment;
        this.root.classList.toggle('show', this.open);
        if (this.toggle) {
            this.toggle.setAttribute('aria-expanded', String(this.open));
            if (!this.toggle.id) this.toggle.id = `dropdown-${++dropdownId}`;
        }
        if (this.menu) {
            if (alignment !== undefined) {
                for (const name of [...this.menu.classList])
                    if (
                        /^(?:(?:sm|md|lg|xl|2xl):)?menu-(start|end)$/.test(name)
                    )
                        this.menu.classList.remove(name);
                this.menu.classList.add(
                    ...[alignClasses(alignment)].flat().filter(Boolean)
                );
            }
            this.menu.classList.toggle('show', this.open);
            this.menu.hidden = !this.open;
            if (!this.menu.hasAttribute('aria-labelledby'))
                this.menu.setAttribute(
                    'aria-labelledby',
                    this.toggle?.id || ''
                );
        }
        if (this.open && this.root.isConnected) {
            if (this.toggle && this.menu && typeof alignment !== 'object') {
                const drop = this.props.drop ?? 'down';
                const side = {
                    up: 'top',
                    down: 'bottom',
                    start: 'left',
                    end: 'right',
                    'up-centered': 'top',
                    'down-centered': 'bottom'
                }[drop];
                const placement =
                    `${side}${drop.endsWith('centered') ? '' : `-${alignment ?? 'start'}`}` as Placement;
                this.position = new OverlayPosition(
                    this.menu,
                    this.toggle,
                    placement,
                    2
                );
                this.position.connect();
            } else if (this.menu && this.position) {
                for (const name of ['position', 'left', 'top'])
                    this.menu.style.removeProperty(name);
            }
            this.guard.connect(this.root.ownerDocument);
        } else {
            this.guard.disconnect();
        }
        if (this.root.isConnected && !this.removal) {
            this.removal = new MutationObserver(() => {
                if (!this.root.isConnected) this.dispose();
            });
            this.removal.observe(this.root.ownerDocument, {
                childList: true,
                subtree: true
            });
        }
    }
    disconnect() {
        this.position?.disconnect();
        this.guard.disconnect();
        this.removal?.disconnect();
        this.removal = undefined;
    }
    dispose() {
        this.disposed = true;
        this.disconnect();
        this.root.removeEventListener('click', this.click);
        this.root.removeEventListener('keydown', this.keyboard);
    }
    change(
        show: boolean,
        source: Parameters<NonNullable<DropdownProps['onToggle']>>[1]['source'],
        originalEvent?: Event
    ) {
        const { autoClose = true } = this.props;
        if (
            !show &&
            ((autoClose === false && source !== 'click') ||
                (autoClose === 'inside' && source === 'rootClose') ||
                (autoClose === 'outside' && source === 'select'))
        )
            return;
        this.props.onToggle?.(show, { source, originalEvent });
        if (this.props.show === undefined) this.open = show;
        this.sync();
    }
    private click = (event: MouseEvent) => {
        const path = event.composedPath();
        const toggle = path.find(
            node =>
                node instanceof HTMLElement &&
                node.hasAttribute('data-dropdown-toggle')
        ) as HTMLElement;
        if (toggle) {
            if (
                toggle.matches(':disabled, .disabled, [aria-disabled="true"]')
            ) {
                event.preventDefault();
                return;
            }
            this.change(!this.open, 'click', event);
            if (this.open && this.props.focusFirstItemOnShow === true)
                this.items[0]?.focus();
            return;
        }
        const item = path.find(
            node => node instanceof HTMLElement && node.matches('.menu-item')
        ) as HTMLElement;
        if (!item || event.defaultPrevented) return;
        if (item.matches(':disabled, .disabled, [aria-disabled="true"]')) {
            event.preventDefault();
            return;
        }
        this.props.onSelect?.(
            item.dataset.eventKey ?? item.getAttribute('href'),
            event
        );
        this.change(false, 'select', event);
    };
    private keyboard = (event: KeyboardEvent) => {
        const target = event.composedPath()[0] as HTMLElement;
        if (target.matches('input, textarea, select') && event.key !== 'Escape')
            return;
        if (event.key === 'Tab') {
            queueMicrotask(() => {
                const active = this.root.getRootNode() as Document | ShadowRoot;
                if (!this.root.contains(active.activeElement))
                    this.change(false, 'rootClose', event);
            });
            return;
        }
        if (
            !['ArrowDown', 'ArrowUp', 'Home', 'End', 'Escape'].includes(
                event.key
            )
        )
            return;
        if (this.toggle?.matches(':disabled, .disabled')) return;
        event.preventDefault();
        if (event.key === 'Escape') {
            event.stopPropagation();
            this.change(false, 'rootClose', event);
            if (!this.open) this.toggle?.focus();
            return;
        }
        if (!this.open) this.change(true, 'keydown', event);
        if (!this.open || this.props.focusFirstItemOnShow === false) return;
        const items = this.items;
        const index = items.indexOf(target);
        const next =
            event.key === 'Home'
                ? 0
                : event.key === 'End'
                  ? items.length - 1
                  : event.key === 'ArrowDown'
                    ? (index + 1) % items.length
                    : index <= 0
                      ? items.length - 1
                      : index - 1;
        items[next]?.focus();
    };
}
let dropdownId = 0;

export const Dropdown: FC<DropdownProps> = ({
    className = '',
    children,
    ref,
    ...props
}) => {
    let element: HTMLElement;
    const {
        show,
        defaultShow,
        drop = 'down',
        align,
        autoClose,
        focusFirstItemOnShow,
        rootCloseEvent,
        onToggle,
        onSelect,
        ...rest
    } = props;
    const directions = {
        down: '',
        up: 'dropup',
        start: 'dropstart',
        end: 'dropend',
        'up-centered': 'dropup dropup-center',
        'down-centered': 'dropdown-center'
    };
    if (!Object.hasOwn(directions, drop))
        throw new TypeError(`Invalid dropdown direction: ${drop}`);
    if (
        autoClose !== undefined &&
        ![true, false, 'inside', 'outside'].includes(autoClose)
    )
        throw new TypeError(`Invalid dropdown autoClose: ${autoClose}`);
    return (
        <div
            className={classNames(className, directions[drop])}
            {...rest}
            {...{
                dropdownProps: {
                    props,
                    bind: (node: HTMLElement) => {
                        element = node;
                    }
                }
            }}
            ref={node => {
                if (!node) {
                    controllers.get(element)?.dispose();
                    return;
                }
                const root = node as HTMLElement;
                element = root;
                const controller = controllers.get(root);
                if (controller) controller.configure(props);
                else {
                    const model = new DropdownController(root, props);
                    controllers.set(root, model);
                    Object.defineProperty(root, 'dropdownProps', {
                        configurable: true,
                        set: value => {
                            value.bind(root);
                            model.configure(value.props);
                        }
                    });
                }
                if (typeof ref === 'function') ref(node);
            }}
        >
            {children}
        </div>
    );
};

export const DropdownToggle: FC<ButtonProps & { split?: boolean }> = ({
    className = '',
    split,
    children,
    ...props
}) => (
    <Button
        {...props}
        className={classNames(className, split && 'menu-toggle-split')}
        data-dropdown-toggle=""
        aria-haspopup="true"
        type="button"
    >
        {children}
    </Button>
);

export const DropdownMenu: FC<WebCellProps & { align?: DropdownAlign }> = ({
    className = '',
    align,
    children,
    ...props
}) => (
    <div
        {...{ dropdownAlign: align }}
        className={classNames('menu', className, alignClasses(align))}
        {...props}
    >
        {children}
    </div>
);

export const DropdownItem: FC<
    WebCellProps<HTMLAnchorElement> & {
        active?: boolean;
        disabled?: boolean;
        eventKey?: string;
    }
> = ({ className = '', active, disabled, eventKey, children, ...props }) => (
    <a
        {...props}
        className={classNames('menu-item', className, { active, disabled })}
        data-event-key={eventKey}
        ariaDisabled={disabled ? 'true' : undefined}
        tabIndex={disabled ? -1 : props.tabIndex}
        onClick={event => {
            if (disabled) event.preventDefault();
            else props.onClick?.(event);
        }}
    >
        {children}
    </a>
);

export const DropdownDivider: FC<WebCellProps> = ({ className, ...props }) => (
    <div
        {...props}
        className={classNames('menu-divider', className)}
        role="separator"
    />
);
export const DropdownHeader: FC<WebCellProps> = ({
    className,
    children,
    ...props
}) => (
    <h6 {...props} className={classNames('menu-header', className)}>
        {children}
    </h6>
);
export const DropdownItemText: FC<WebCellProps> = ({
    className,
    children,
    ...props
}) => (
    <span {...props} className={classNames('menu-item-text', className)}>
        {children}
    </span>
);

export interface DropdownButtonProps
    extends
        Omit<DropdownProps, 'ref' | 'title'>,
        Omit<ButtonProps, 'onToggle' | 'onSelect' | 'ref' | 'title'> {
    boxClass?: string;
    buttonClass?: string;
    caption?: JsxChildren;
    title?: JsxChildren;
    split?: boolean;
    menuRole?: string;
}

@component({
    tagName: 'dropdown-button',
    mode: 'open'
})
@observer
export class DropdownButton extends CallbackElement {
    static callbacks = ['onToggle', 'onSelect'];
    declare props: DropdownButtonProps;

    @attribute
    @observable
    accessor boxClass: string;

    @attribute
    @observable
    accessor buttonClass: string;

    @attribute
    @observable
    accessor variant: ButtonProps['variant'];

    @attribute
    @observable
    accessor size: ButtonProps['size'];

    @observable
    accessor caption: JsxChildren;

    @observable accessor displayTitle: JsxChildren = '';

    constructor() {
        super();
        Object.defineProperty(this, 'title', {
            configurable: true,
            get: () =>
                typeof this.displayTitle === 'string' ? this.displayTitle : '',
            set: (value: JsxChildren) => {
                this.displayTitle = value;
            }
        });
    }

    @attribute
    @observable
    accessor disabled = false;

    @attribute
    @observable
    accessor show: boolean;

    @attribute @observable accessor defaultShow = false;
    @attribute @observable accessor split = false;
    @attribute @observable accessor href: string;
    @attribute @observable accessor target: string;
    @attribute @observable accessor drop: DropdownProps['drop'] = 'down';
    @observable accessor align: DropdownAlign = 'start';
    @observable accessor autoClose: DropdownProps['autoClose'] = true;
    @attribute @observable accessor menuRole: string;
    @attribute
    @observable
    accessor rootCloseEvent: DropdownProps['rootCloseEvent'] = 'click';
    @observable
    accessor focusFirstItemOnShow: DropdownProps['focusFirstItemOnShow'];
    @attribute @observable accessor theme: ButtonProps['theme'];
    @observable accessor open = false;
    onToggle?: DropdownProps['onToggle'];
    onSelect?: DropdownProps['onSelect'];
    private toggleId = `dropdown-${++dropdownId}`;
    @observable accessor initialized = false;

    handleToggle: DropdownProps['onToggle'] = action((show, meta) => {
        this.initialized = true;
        if (this.show === undefined) this.open = show;
        this.onToggle?.(show, meta);
        this.dispatchEvent(
            new CustomEvent('toggle', { detail: { show, ...meta } })
        );
    });

    renderContent() {
        const {
                boxClass,
                buttonClass,
                variant,
                size,
                caption,
                displayTitle,
                theme
            } = this,
            {
                disabled,
                split,
                href,
                target,
                drop,
                align,
                autoClose,
                rootCloseEvent,
                focusFirstItemOnShow
            } = this,
            show =
                this.show ?? (this.initialized ? this.open : this.defaultShow);

        return (
            <Dropdown
                className={classNames(boxClass, split && 'btn-group')}
                {...{
                    show,
                    drop,
                    align,
                    autoClose,
                    rootCloseEvent,
                    focusFirstItemOnShow
                }}
                onToggle={this.handleToggle}
                onSelect={this.onSelect}
            >
                {split && (
                    <Button
                        {...{ href, target, disabled, variant, size, theme }}
                    >
                        {caption ?? displayTitle}
                    </Button>
                )}
                <DropdownToggle
                    id={this.toggleId}
                    className={buttonClass}
                    {...{ variant, size, disabled, split, theme }}
                    href={split ? undefined : href}
                    target={split ? undefined : target}
                    ariaExpanded={String(show)}
                >
                    {split ? (
                        <span className="visually-hidden">Toggle Dropdown</span>
                    ) : (
                        (caption ?? displayTitle)
                    )}
                </DropdownToggle>
                <DropdownMenu
                    align={align}
                    role={this.menuRole}
                    aria-labelledby={this.toggleId}
                >
                    <slot />
                </DropdownMenu>
            </Dropdown>
        );
    }

    render() {
        return (
            <>
                <BootstrapStyles />
                <style>
                    {`:host {
                        display: inline-block;
                    }`}
                </style>
                {this.renderContent()}
            </>
        );
    }
}
