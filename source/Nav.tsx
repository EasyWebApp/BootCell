import { JsxChildren } from 'dom-renderer';
import { FC, WebCell, WebCellProps, component } from 'web-cell';

import { ButtonProps } from './Button';
import { Dropdown, DropdownMenu, DropdownToggle } from './Dropdown';
import { OffcanvasNavbar } from './Navbar';

export interface NavLinkProps extends WebCellProps<HTMLAnchorElement> {
    active?: boolean;
}

export const NavLink: FC<NavLinkProps> = ({
    className = '',
    active,
    children,
    ...props
}) => (
    <a className={`nav-link ${active ? 'active' : ''} ${className}`} {...props}>
        {children}
    </a>
);

export interface NavDropdownProps
    extends Omit<NavLinkProps, 'title'>,
        Pick<ButtonProps, 'disabled' | 'onClick'> {
    title: JsxChildren;
}

export const NavDropdown: FC<NavDropdownProps> = ({
    title,
    disabled,
    onClick,
    children
}) => (
    <Dropdown className="nav-item">
        <DropdownToggle
            className="nav-link"
            href="#"
            disabled={disabled}
            onClick={event => {
                event.preventDefault();
                onClick?.(event);
            }}
        >
            {title}
        </DropdownToggle>

        <DropdownMenu>{children}</DropdownMenu>
    </Dropdown>
);

export interface Nav extends WebCell {}

@component({
    tagName: 'bs-nav',
    mode: 'open'
})
export class Nav extends HTMLElement {
    declare props: WebCellProps;

    connectedCallback() {
        const navBar = this.closest<OffcanvasNavbar>(
            'offcanvas-navbar, .navbar'
        );

        if (!navBar) return this.classList.add('nav');

        const expand =
            navBar.expand ||
            navBar.className.match(/navbar-expand(-(\S+))?/)?.[2];

        this.classList.add(
            'navbar-nav',
            'align-items-center',
            expand && 'flex-column',
            expand && `flex-${expand}-row`
        );
    }

    render() {
        return <slot />;
    }
}
