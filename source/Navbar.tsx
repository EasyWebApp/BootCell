import { JsxProps, VNode } from 'dom-renderer';
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

import { Container, ContainerProps } from './Grid';
import {
    Offcanvas,
    OffcanvasBody,
    OffcanvasBoxProps,
    OffcanvasHeader,
    OffcanvasTitle
} from './Offcanvas';
import { BackgroundColor, PositionY, Size } from './type';

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
    bg = 'body-tertiary',
    fixed,
    sticky,
    expand,
    children
}) => (
    <nav
        className={`navbar bg-${bg} ${fixed ? `fixed-${fixed}` : ''} ${
            sticky ? `sticky-${sticky}` : ''
        } ${
            expand ? `navbar-expand${expand === true ? '' : `-${expand}`}` : ''
        }`}
        data-bs-theme={variant}
    >
        {children}
    </nav>
);

export interface OffcanvasNavbarProps
    extends OffcanvasBoxProps,
        NavbarProps,
        ContainerProps {
    brand?: VNode;
}

export interface OffcanvasNavbar extends WebCell {}

@component({
    tagName: 'offcanvas-navbar',
    mode: 'open'
})
@observer
export class OffcanvasNavbar extends HTMLElement implements WebCell {
    declare props: OffcanvasNavbarProps;

    @attribute
    @observable
    accessor variant: OffcanvasNavbarProps['variant'];

    @attribute
    @observable
    accessor bg: OffcanvasNavbarProps['bg'];

    @attribute
    @observable
    accessor expand: OffcanvasNavbarProps['expand'];

    @attribute
    @observable
    accessor fixed: OffcanvasNavbarProps['fixed'];

    @attribute
    @observable
    accessor sticky: OffcanvasNavbarProps['sticky'];

    @attribute
    @observable
    accessor fluid: ContainerProps['fluid'];

    @attribute
    @observable
    accessor title: string;

    titleId = uniqueID();

    @observable
    accessor brand: VNode;

    offcanvasId = uniqueID();

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
            { title, titleId, offcanvasId, open, closeButton } = this;

        return (
            <Navbar {...{ variant, bg, expand, fixed, sticky }}>
                <Container fluid={fluid}>
                    {brand || title}
                    <NavbarToggle
                        aria-controls={offcanvasId}
                        ariaLabel="Toggle navigation"
                        onClick={() => (this.open = true)}
                    />
                    <Offcanvas
                        id={offcanvasId}
                        aria-labelledby={titleId}
                        show={open}
                        onHide={this.close}
                    >
                        <OffcanvasHeader
                            closeButton={closeButton}
                            onHide={() => (this.open = false)}
                        >
                            <OffcanvasTitle id={titleId}>
                                {brand || title}
                            </OffcanvasTitle>
                        </OffcanvasHeader>
                        <OffcanvasBody>
                            <slot />
                        </OffcanvasBody>
                    </Offcanvas>
                </Container>
            </Navbar>
        );
    }

    render() {
        return (
            <>
                <link
                    rel="stylesheet"
                    href="https://unpkg.com/bootstrap@5.3.2/dist/css/bootstrap.min.css"
                />
                {this.renderContent()}
            </>
        );
    }
}
