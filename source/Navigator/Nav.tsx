import classNames from 'classnames';
import { JsxChildren } from 'dom-renderer';
import { observable } from 'mobx';
import {
    FC,
    WebCell,
    WebCellProps,
    attribute,
    component,
    observer,
    reaction
} from 'web-cell';

import { ButtonProps } from '../Form/Button';
import { DropdownButton } from './Dropdown';
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
    extends Omit<NavLinkProps, 'title' | 'type'>,
        Pick<ButtonProps, 'disabled' | 'onClick'> {
    title: JsxChildren;
}

export const NavDropdown: FC<NavDropdownProps> = ({
    title,
    children,
    ...props
}) => (
    <DropdownButton
        boxClass="nav-item"
        buttonClass="nav-link"
        caption={title}
        {...props}
    >
        {children}
    </DropdownButton>
);

export interface NavProps extends WebCellProps {
    variant?: 'pills' | 'underline' | 'tabs';
    fill?: boolean;
    justify?: boolean;
}

export interface Nav extends WebCell<NavProps> {}

@component({
    tagName: 'bs-nav',
    mode: 'open'
})
@observer
export class Nav extends HTMLElement implements WebCell<NavProps> {
    @attribute
    @observable
    accessor variant: 'pills' | 'underline' | 'tabs' | undefined;

    @attribute
    @observable
    accessor fill = false;

    @attribute
    @observable
    accessor justify = false;

    @reaction(({ variant, fill, justify }) => ({ variant, fill, justify }))
    protected updateClass({ variant, fill, justify } = this) {
        this.className = classNames('nav', this.className, {
            [`nav-${variant}`]: variant,
            'nav-fill': fill,
            [`nav-justified`]: justify
        });
    }

    connectedCallback() {
        this.updateClass();
        this.role = 'tablist';

        const navBar = this.closest<OffcanvasNavbar>(
            'offcanvas-navbar, .navbar'
        );
        if (!navBar) return;

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
