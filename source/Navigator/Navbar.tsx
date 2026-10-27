import { JsxChildren, JsxProps } from 'dom-renderer';
import { action, observable } from 'mobx';
import {
    FC,
    WebCell,
    WebCellProps,
    attribute,
    component,
    observer
} from 'web-cell';
import { uniqueID } from 'web-utility';

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
    style,
    ...props
}) => (
    <button
        className={`btn btn-icon navbar-toggler ${className}`}
        type="button"
        style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding:
                'var(--navbar-toggler-padding-y, .25rem) var(--navbar-toggler-padding-x, .75rem)',
            color: 'var(--navbar-color, inherit)',
            backgroundColor: 'transparent',
            border: '1px solid var(--navbar-toggler-border-color, currentColor)',
            borderRadius: 'var(--navbar-toggler-border-radius, .375rem)',
            ...style
        }}
        {...props}
    >
        <span className="navbar-toggler-icon" ariaHidden="true" />
    </button>
);

export interface NavbarProps extends WebCellProps {
    variant?: 'light' | 'dark';
    bg?: BackgroundColor;
    expand?: boolean | Size;
    fixed?: PositionY;
    sticky?: PositionY;
}

export const Navbar: FC<NavbarProps> = ({
    variant = 'light',
    bg = '1',
    fixed,
    sticky,
    expand,
    children
}) => (
    <nav
        className={`navbar bg-${bg} ${fixed ? `fixed-${fixed}` : ''} ${
            sticky ? `sticky-${sticky}` : ''
        } ${
            expand
                ? expand === true
                    ? 'navbar-expand'
                    : `${expand}:navbar-expand`
                : ''
        }`}
        data-bs-theme={variant}
    >
        {children}
    </nav>
);

export interface DrawerNavbarProps
    extends DrawerBoxProps, NavbarProps, ContainerProps {
    brand?: JsxChildren;
}

export interface DrawerNavbar extends WebCell {}

@component({
    tagName: 'drawer-navbar',
    mode: 'open'
})
@observer
export class DrawerNavbar extends HTMLElement implements WebCell {
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

    @observable
    private accessor expanded = false;

    private layoutObserver?: ResizeObserver;

    connectedCallback() {
        this.addEventListener('click', this.handleLink);
        if (this.mounted) {
            this.update();
            this.mountedCallback();
        }
    }

    disconnectedCallback() {
        this.removeEventListener('click', this.handleLink);
        this.layoutObserver?.disconnect();
        this.layoutObserver = undefined;
    }

    mountedCallback() {
        this.layoutObserver = new ResizeObserver(this.syncLayout);
        this.layoutObserver.observe(this.shadowRoot.querySelector('nav'));
        this.layoutObserver.observe(
            this.shadowRoot.querySelector('.navbar-toggler')
        );
        this.syncLayout();
    }

    updatedCallback() {
        if (this.layoutObserver) this.syncLayout();
    }

    @action
    syncLayout = () => {
        const toggle = this.shadowRoot.querySelector('.navbar-toggler');
        if (!toggle) return;

        // Bootstrap 6 expands against the navbar container, not the viewport.
        this.expanded =
            this.expand === true || getComputedStyle(toggle).display === 'none';
        if (this.expanded) this.open = false;
    };

    @action
    toggle = () => {
        this.open = !this.open;
    };

    @action
    close = (event?: KeyboardEvent | MouseEvent | CustomEvent) => {
        if (event instanceof KeyboardEvent && event.key !== 'Escape') return;

        this.open = false;
    };

    handleLink = (event: MouseEvent) => {
        if (
            event
                .composedPath()
                .some(
                    node =>
                        node instanceof HTMLAnchorElement &&
                        node.matches('a[href].nav-link, a[href].menu-item')
                )
        )
            this.close();
    };

    renderContent() {
        const { variant, bg, expand, fixed, fluid, brand } = this,
            { title, titleId, drawerId, open, closeButton, expanded } = this;

        return (
            <Navbar {...{ variant, bg, expand, fixed }}>
                <Container fluid={fluid}>
                    {brand || title}
                    <NavbarToggle
                        key="toggle"
                        aria-controls={drawerId}
                        ariaExpanded={String(open)}
                        ariaLabel="Toggle navigation"
                        onClick={this.toggle}
                    />
                    {expanded ? (
                        <div key="inline" className="navbar-content">
                            <slot />
                        </div>
                    ) : (
                        <Drawer
                            key="drawer"
                            id={drawerId}
                            ariaLabelledby={titleId}
                            show={open}
                            onHide={this.close}
                        >
                            <DrawerHeader closeButton={closeButton}>
                                <DrawerTitle id={titleId}>
                                    {brand || title}
                                </DrawerTitle>
                            </DrawerHeader>
                            <DrawerBody>
                                <slot />
                            </DrawerBody>
                        </Drawer>
                    )}
                </Container>
            </Navbar>
        );
    }

    render() {
        return (
            <>
                <BootstrapStyles />
                <style>{`
                    :host { display: block; }
                    :host([sticky]) { position: sticky; z-index: var(--bs-z-sticky, 1020); }
                    :host([sticky="top"]) { top: 0; }
                    :host([sticky="bottom"]) { bottom: 0; }
                    .navbar-content {
                        display: flex;
                        flex: 1;
                        align-items: center;
                        min-width: 0;
                    }
                    ::slotted(.navbar-nav) {
                        display: flex;
                        align-items: center;
                        flex-direction: column !important;
                    }
                    .navbar-content ::slotted(.navbar-nav) { flex-direction: row !important; }
                `}</style>
                {this.renderContent()}
            </>
        );
    }
}
