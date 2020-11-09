import { WebCellProps, VNodeChildElement, VNode, createCell } from 'web-cell';
import { HTMLHyperLinkProps } from 'web-utility/source/DOM-type';
import classNames from 'classnames';

import { isDropMenuItem, DropMenu } from './DropMenu';
import { JustityType, BackgroundColors } from '../utility/constant';
import './Nav.less';

export interface NavLinkProps extends WebCellProps, HTMLHyperLinkProps {
    href?: string | URL;
    disabled?: boolean;
    active?: boolean;
}

export function NavLink({
    defaultSlot,
    disabled,
    active,
    className,
    tabIndex,
    title,
    ...rest
}: NavLinkProps) {
    const isMenu = isDropMenuItem(defaultSlot[0]);

    rest = {
        ...rest,
        className: classNames(
            'nav-item',
            'nav-link',
            'text-nowrap',
            isMenu && 'p-0',
            disabled ? 'disabled' : active && 'active',
            className
        ),
        tabIndex: disabled ? -1 : tabIndex,
        'aria-disabled': !!disabled + ''
    };

    return isMenu ? (
        <DropMenu {...rest} caption={title}>
            {defaultSlot}
        </DropMenu>
    ) : (
        <a {...rest} title={title}>
            {defaultSlot}
            {!active ? null : <span className="sr-only">(current)</span>}
        </a>
    );
}

export function isNavLink(node: VNodeChildElement): node is VNode {
    return (node as VNode).data?.class?.['nav-link'];
}

export interface NavProps extends WebCellProps {
    direction?: 'row' | 'column';
    align?: keyof typeof JustityType;
    itemMode?: 'tabs' | 'pills' | 'masthead';
    itemWidth?: 'fill' | 'justified';
    scrollable?: boolean;
    background?: BackgroundColors;
}

export function Nav({
    className,
    direction,
    align,
    itemMode,
    itemWidth,
    defaultSlot,
    scrollable,
    background = 'white',
    ...rest
}: NavProps) {
    const nav = (
        <nav
            {...(scrollable ? {} : rest)}
            className={classNames(
                'nav',
                direction && `flex-${direction}`,
                align && `justify-content-${align}`,
                itemMode && `nav-${itemMode}`,
                itemWidth && `nav-${itemWidth}`,
                scrollable && 'nav-underline',
                !scrollable && className
            )}
        >
            {defaultSlot}
        </nav>
    );

    return scrollable ? (
        <div
            className={classNames(
                'nav-scroller',
                'bg-' + background,
                'shadow-sm',
                className
            )}
            {...rest}
        >
            {nav}
        </div>
    ) : (
        nav
    );
}
