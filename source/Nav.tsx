import { JsxProps } from 'dom-renderer';
import { FC, WebCell, WebCellProps, component } from 'web-cell';

import { OffcanvasNavbar } from './Navbar';

export interface NavLinkProps extends JsxProps<HTMLAnchorElement> {
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
