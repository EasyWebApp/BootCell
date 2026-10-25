import { JsxChildren, JsxProps } from 'dom-renderer';
import classNames from 'classnames';
import { action, observable } from 'mobx';
import {
    FC,
    WebCell,
    WebCellProps,
    attribute,
    component,
    observer
} from 'web-cell';
import { delegate, uniqueID } from 'web-utility';

import { Container, ContainerProps } from '../Layout/Grid';
import {
    Drawer,
    DrawerBody,
    DrawerBoxProps,
    DrawerHeader,
    DrawerTitle
} from '../Layout/Drawer';
import { BootstrapStyles } from '../BootstrapStyles';
import { BackgroundColor, PositionY, Size } from '../type';
import { CallbackElement, RootCloseGuard } from '../Prompt/OverlayModel';

export type NavbarBrandProps = JsxProps<HTMLAnchorElement>;

export const NavbarBrand: FC<NavbarBrandProps> = ({
    className = '',
    children,
    ...props
}) => (
    <a className={`navbar-brand ${className}`} {...props}>
        {children}
    </a>
);

export type NavbarToggleProps = JsxProps<HTMLButtonElement>;

export const NavbarToggle: FC<NavbarToggleProps> = ({
    className = '',
    type,
    children,
    ...props
}) => (
    <button className={`navbar-toggler ${className}`} type="button" {...props}>
        {children && (!Array.isArray(children) || children.length) ? (
            children
        ) : (
            <span className="navbar-toggler-icon" />
        )}
    </button>
);

export interface NavbarProps extends Omit<
    WebCellProps,
    'onToggle' | 'onSelect'
> {
    variant?: 'light' | 'dark';
    bg?: BackgroundColor;
    expand?: boolean | Size;
    fixed?: PositionY;
    sticky?: PositionY;
    expanded?: boolean;
    defaultExpanded?: boolean;
    collapseOnSelect?: boolean;
    onToggle?: (expanded: boolean) => void;
    onSelect?: (eventKey: string, event: Event) => void;
}

export const NavbarCollapse: FC<WebCellProps> = ({
    className,
    children,
    ...props
}) => (
    <div
        {...props}
        data-navbar-collapse=""
        className={classNames('collapse navbar-collapse', className)}
    >
        {children}
    </div>
);

export const NavbarText: FC<WebCellProps> = ({
    className,
    children,
    ...props
}) => (
    <span {...props} className={classNames('navbar-text', className)}>
        {children}
    </span>
);

const disclosures = new WeakMap<HTMLElement, NavbarDisclosure>();
let collapseId = 0;

class NavbarDisclosure {
    private disposed = false;
    private open: boolean;
    private guard: RootCloseGuard;
    private removal?: MutationObserver;

    constructor(
        private root: HTMLElement,
        private props: NavbarProps
    ) {
        this.open = props.expanded ?? props.defaultExpanded ?? false;
        this.guard = new RootCloseGuard(
            event => event.composedPath().includes(root),
            () => {
                if (root.isConnected) this.toggle(false);
                else this.dispose();
            }
        );
        root.addEventListener('click', this.click);
        queueMicrotask(() => this.sync());
    }
    configure(props: NavbarProps) {
        if (this.disposed) {
            this.disposed = false;
            this.root.addEventListener('click', this.click);
        }
        this.props = props;
        if (props.expanded !== undefined) this.open = props.expanded;
        queueMicrotask(() => this.sync());
    }
    private toggle(open: boolean) {
        this.props.onToggle?.(open);
        if (this.props.expanded === undefined) this.open = open;
        this.sync();
    }
    private click = (event: MouseEvent) => {
        if (!this.root.querySelector('[data-navbar-collapse]')) return;
        const path = event.composedPath();
        if (
            path.some(
                node =>
                    node instanceof Element && node.matches('.navbar-toggler')
            )
        ) {
            this.toggle(!this.open);
            return;
        }
        const link = path.find(
            node =>
                node instanceof HTMLAnchorElement &&
                node.matches('.nav-link, .menu-item')
        ) as HTMLAnchorElement;
        if (
            !link ||
            event.defaultPrevented ||
            link.matches('.disabled, [aria-disabled="true"]')
        )
            return;
        this.props.onSelect?.(
            link.dataset.eventKey ?? link.getAttribute('href'),
            event
        );
        if (this.props.collapseOnSelect) this.toggle(false);
    };
    sync() {
        if (this.disposed) return;
        const content = this.root.querySelector<HTMLElement>(
            '[data-navbar-collapse]'
        );
        if (!content) return;
        if (!content.id) content.id = `navbar-collapse-${++collapseId}`;
        content.classList.toggle('show', this.open);
        for (const toggle of this.root.querySelectorAll('.navbar-toggler')) {
            toggle.setAttribute('aria-controls', content.id);
            toggle.setAttribute('aria-expanded', String(this.open));
        }
        if (this.open && this.root.isConnected) {
            this.guard.connect(this.root.ownerDocument);
        } else this.guard.disconnect();
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
        this.guard.disconnect();
        this.removal?.disconnect();
        this.removal = undefined;
    }
    dispose() {
        this.disposed = true;
        this.disconnect();
        this.root.removeEventListener('click', this.click);
    }
}

export const Navbar: FC<NavbarProps> = ({
    variant = 'light',
    bg = '1',
    fixed,
    sticky,
    expand,
    children,
    className,
    expanded,
    defaultExpanded,
    collapseOnSelect,
    onToggle,
    onSelect,
    ref,
    ...props
}) => {
    let element: HTMLElement;
    const state: NavbarProps = {
        expanded,
        defaultExpanded,
        collapseOnSelect,
        onToggle,
        onSelect
    };
    return (
        <nav
            {...props}
            {...{
                navbarState: {
                    props: state,
                    bind: (node: HTMLElement) => {
                        element = node;
                    }
                }
            }}
            ref={node => {
                if (!node) {
                    disclosures.get(element)?.dispose();
                    return;
                }
                element = node as HTMLElement;
                const model = new NavbarDisclosure(element, state);
                disclosures.set(element, model);
                Object.defineProperty(element, 'navbarState', {
                    configurable: true,
                    set: value => {
                        value.bind(element);
                        model.configure(value.props);
                    }
                });
                if (typeof ref === 'function') ref(node);
            }}
            className={classNames(
                className,
                `navbar bg-${bg} ${fixed ? `fixed-${fixed}` : ''} ${
                    sticky ? `sticky-${sticky}` : ''
                } ${
                    expand
                        ? expand === true
                            ? 'navbar-expand'
                            : `${expand}:navbar-expand`
                        : ''
                }`
            )}
            data-bs-theme={variant}
        >
            {children}
        </nav>
    );
};

export interface DrawerNavbarProps
    extends
        Omit<DrawerBoxProps, 'onToggle' | 'onSelect'>,
        NavbarProps,
        Omit<ContainerProps, 'onToggle' | 'onSelect'> {
    brand?: JsxChildren;
    narrow?: boolean;
    direction?: 'left' | 'right';
    menuAlign?: 'start' | 'center' | 'end';
}

class DrawerNavbarElement extends CallbackElement {
    static callbacks = ['onToggle', 'onSelect'];
    declare mounted: boolean;
    declare update: () => Promise<void>;
    declare props: DrawerNavbarProps;

    @attribute
    @observable
    accessor variant: DrawerNavbarProps['variant'];

    @attribute
    @observable
    accessor bg: DrawerNavbarProps['bg'];

    @attribute
    @observable
    accessor expand: DrawerNavbarProps['expand'];

    @attribute
    @observable
    accessor fixed: DrawerNavbarProps['fixed'];

    @attribute
    @observable
    accessor sticky: DrawerNavbarProps['sticky'];

    @attribute
    @observable
    accessor fluid: ContainerProps['fluid'];

    @attribute
    @observable
    accessor title: string;

    titleId = uniqueID();

    @observable
    accessor brand: DrawerNavbarProps['brand'];

    drawerId = uniqueID();

    @attribute
    @observable
    accessor open = false;

    @attribute
    @observable
    accessor closeButton = true;

    @attribute @observable accessor narrow = false;
    @attribute @observable accessor direction: 'left' | 'right' = 'left';
    @attribute @observable accessor menuAlign: DrawerNavbarProps['menuAlign'] =
        'start';
    @attribute @observable accessor expanded: boolean;
    @attribute @observable accessor defaultExpanded = false;
    @attribute @observable accessor collapseOnSelect = true;
    onToggle?: DrawerNavbarProps['onToggle'];
    onSelect?: DrawerNavbarProps['onSelect'];
    @observable accessor initialized = false;
    private guard = new RootCloseGuard(
        event => event.composedPath().includes(this),
        event => this.close(event as KeyboardEvent | MouseEvent)
    );

    get visible() {
        return (
            this.expanded ??
            (this.initialized ? this.open : this.open || this.defaultExpanded)
        );
    }

    toggle = action((open: boolean) => {
        this.initialized = true;
        if (this.expanded === undefined) this.open = open;
        this.onToggle?.(open);
        this.dispatchEvent(new CustomEvent('toggle', { detail: open }));
    });

    connectedCallback() {
        this.addEventListener('click', this.handleLink);
        if (this.mounted) void this.update();
    }

    disconnectedCallback() {
        this.guard.disconnect();
        this.removeEventListener('click', this.handleLink);
    }

    updatedCallback() {
        if (this.visible && this.isConnected)
            this.guard.connect(this.ownerDocument);
        else this.guard.disconnect();
    }

    close = (event?: KeyboardEvent | MouseEvent) => {
        if (event instanceof KeyboardEvent && event.key !== 'Escape') return;

        this.toggle(false);
    };

    handleLink = delegate(
        'a[href].nav-link, .menu-item:not(.disabled)',
        event => {
            if (event.defaultPrevented) return;
            const link =
                event.target instanceof Element
                    ? event.target.closest('a')
                    : undefined;
            if (link?.matches('.disabled, [aria-disabled="true"]')) return;
            this.onSelect?.(link?.getAttribute('href'), event);
            if (this.collapseOnSelect) this.toggle(false);
        }
    );

    renderContent() {
        const { variant, bg, expand, fixed, sticky, fluid, brand } = this,
            {
                title,
                titleId,
                drawerId,
                closeButton,
                narrow,
                direction,
                menuAlign
            } = this,
            open = this.visible;

        return (
            <Navbar {...{ variant, bg, expand, fixed, sticky }}>
                <Container
                    fluid={fluid ?? !narrow}
                    className={
                        direction === 'right' && expand !== true
                            ? classNames(
                                  'flex-row-reverse',
                                  expand && `${expand}:flex-row`
                              )
                            : undefined
                    }
                >
                    {brand || title}
                    <NavbarToggle
                        aria-controls={drawerId}
                        ariaLabel="Toggle navigation"
                        ariaExpanded={String(open)}
                        onClick={() => this.toggle(!open)}
                    />
                    <Drawer
                        id={drawerId}
                        className={
                            expand && expand !== true ? `${expand}:drawer` : ''
                        }
                        aria-labelledby={titleId}
                        show={open}
                        onHide={this.close}
                    >
                        <DrawerHeader
                            closeButton={closeButton}
                            onHide={() => this.toggle(false)}
                        >
                            <DrawerTitle id={titleId}>
                                {brand || title}
                            </DrawerTitle>
                        </DrawerHeader>
                        <DrawerBody
                            className={`d-flex flex-column align-items-${menuAlign}`}
                        >
                            <slot />
                        </DrawerBody>
                    </Drawer>
                </Container>
            </Navbar>
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

export interface DrawerNavbar extends Omit<
    WebCell,
    'props' | 'connectedCallback' | 'disconnectedCallback' | 'updatedCallback'
> {}
@component({ tagName: 'drawer-navbar', mode: 'open' })
@observer
export class DrawerNavbar extends DrawerNavbarElement {}

/** A collapsible top banner composed with the same navbar state and dismissal guard. */
@component({ tagName: 'banner-navbar', mode: 'open' })
@observer
export class BannerNavbar extends DrawerNavbarElement {
    @attribute @observable accessor variant: DrawerNavbarProps['variant'] =
        'dark';
    @attribute @observable accessor bg: DrawerNavbarProps['bg'] = 'inverse';
    @attribute @observable accessor sticky: DrawerNavbarProps['sticky'] = 'top';
    renderContent() {
        const {
            variant,
            bg,
            fixed,
            sticky,
            brand,
            title,
            drawerId,
            narrow,
            direction
        } = this;
        const open = this.visible;
        return (
            <div
                className={classNames(
                    bg && `bg-${bg}`,
                    fixed && `fixed-${fixed}`,
                    sticky && `sticky-${sticky}`
                )}
            >
                <div
                    id={drawerId}
                    hidden={!open}
                    className={classNames('navbar-collapse', open && 'show')}
                >
                    <Container fluid={!narrow}>
                        <slot />
                    </Container>
                </div>
                <Navbar {...{ variant, bg }}>
                    <Container
                        fluid={!narrow}
                        className={classNames(
                            direction === 'right' && 'flex-row-reverse'
                        )}
                    >
                        <NavbarBrand href=".">{brand || title}</NavbarBrand>
                        <NavbarToggle
                            aria-controls={drawerId}
                            ariaExpanded={String(open)}
                            ariaLabel="Toggle navigation"
                            onClick={() => this.toggle(!open)}
                        />
                    </Container>
                </Navbar>
            </div>
        );
    }
}
