import { WebCellProps, createCell, WebCellClass } from 'web-cell';
import { HTMLHyperLinkProps } from 'web-utility/source/DOM-type';
import classNames from 'classnames';

import { DropMenu } from './DropMenu';
import { JustityType, BackgroundColors } from '../utility/constant';
import './Nav.less';

export interface NavLinkProps extends WebCellProps, HTMLHyperLinkProps {
    title: string;
    href?: string | URL;
    disabled?: boolean;
    active?: boolean;
    list?: NavLinkProps[];
}

export function NavLink({
    list,
    title,
    tabIndex,
    disabled,
    active,
    className,
    defaultSlot,
    ...rest
}: NavLinkProps) {
    rest = {
        ...rest,
        className: classNames(
            'nav-item',
            'nav-link',
            'text-nowrap',
            list && 'p-0',
            disabled ? 'disabled' : active && 'active',
            className
        ),
        tabIndex: disabled ? -1 : tabIndex,
        'aria-disabled': Boolean(disabled) + ''
    };

    return list ? (
        <DropMenu {...rest} title={title} list={list} />
    ) : (
        <a {...rest}>
            {title}
            {!active ? null : <span className="sr-only">(current)</span>}
        </a>
    );
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
