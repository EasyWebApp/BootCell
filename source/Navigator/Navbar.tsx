import { JsxChildren, JsxProps } from 'dom-renderer';
import { observable } from 'mobx';
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
        <span className="navbar-toggler-icon" />
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

    connectedCallback() {
        globalThis.addEventListener?.('keyup', this.close, true);

        this.addEventListener('click', this.handleLink);
    }

    disconnectedCallback() {
        globalThis.removeEventListener?.('keyup', this.close, true);

        this.addEventListener('click', this.handleLink);
    }

    close = (event?: KeyboardEvent | MouseEvent) => {
        if (
            event instanceof KeyboardEvent &&
            !['Escape', 'Enter'].includes(event.key)
        )
            return;

        this.open = false;
    };

    handleLink = delegate('a[href].nav-link', this.close);

    renderContent() {
        const { variant, bg, expand, fixed, sticky, fluid, brand } = this,
            { title, titleId, drawerId, open, closeButton } = this;

        return (
            <Navbar {...{ variant, bg, expand, fixed, sticky }}>
                <Container fluid={fluid}>
                    {brand || title}
                    <NavbarToggle
                        aria-controls={drawerId}
                        ariaLabel="Toggle navigation"
                        onClick={() => (this.open = true)}
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
                            onHide={() => (this.open = false)}
                        >
                            <DrawerTitle id={titleId}>
                                {brand || title}
                            </DrawerTitle>
                        </DrawerHeader>
                        <DrawerBody>
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
