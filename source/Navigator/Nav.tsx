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
import { DrawerNavbar } from './Navbar';
import { BackgroundColor } from '../type';

export interface NavLinkProps extends WebCellProps<HTMLAnchorElement> {
    active?: boolean;
    disabled?: boolean;
}

export const NavLink: FC<NavLinkProps> = ({
    className = '',
    active,
    disabled,
    onClick,
    children,
    ...props
}) => (
    <a
        {...props}
        className={classNames('nav-link', { active, disabled }, className)}
        tabIndex={disabled ? -1 : props.tabIndex}
        ariaDisabled={disabled ? 'true' : props.ariaDisabled}
        ariaCurrent={active ? 'page' : props.ariaCurrent}
        onClick={event => {
            if (disabled) {
                event.preventDefault();
                event.stopPropagation();
            } else onClick?.(event);
        }}
    >
        {children}
    </a>
);

export interface NavDropdownProps
    extends
        Omit<NavLinkProps, 'title' | 'type'>,
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
    direction?: 'row' | 'column';
    align?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
    scrollable?: boolean;
    bg?: BackgroundColor;
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

    @attribute @observable accessor direction: NavProps['direction'];
    @attribute @observable accessor align: NavProps['align'];
    @attribute @observable accessor scrollable = false;
    @attribute @observable accessor bg: BackgroundColor;

    private managedClasses: string[] = [];

    @reaction(
        ({ variant, fill, justify, direction, align, scrollable, bg }) => ({
            variant,
            fill,
            justify,
            direction,
            align,
            scrollable,
            bg
        })
    )
    protected updateClass(
        { variant, fill, justify, direction, align, scrollable, bg } = this
    ) {
        this.classList.remove(...this.managedClasses);
        this.managedClasses = classNames('nav', {
            [`nav-${variant}`]: variant,
            'nav-fill': fill,
            'nav-justified': justify,
            [`flex-${direction}`]: direction,
            [`justify-content-${align}`]: align,
            'flex-nowrap overflow-x-auto': scrollable,
            [`bg-${bg}`]: bg
        }).split(' ');
        this.classList.add(...this.managedClasses);
    }

    connectedCallback() {
        this.updateClass();
        this.role ||= 'tablist';

        const navBar = this.closest<DrawerNavbar>('drawer-navbar, .navbar');
        if (!navBar) return;

        const expand =
            navBar.expand ||
            navBar.className.match(/(?:^|\s)(\S+):navbar-expand/)?.[1];

        this.classList.add(
            'navbar-nav',
            'align-items-center',
            expand && 'flex-column',
            expand && (expand === true ? 'flex-row' : `${expand}:flex-row`)
        );
    }

    render() {
        return <slot />;
    }
}
