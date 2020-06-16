import { WebCellProps, createCell } from 'web-cell';
import { HTMLHyperLinkProps } from 'web-utility/source/DOM-type';
import classNames from 'classnames';

import { DropMenu } from './DropMenu';
import { BackgroundColors } from '../utility/constant';
import './Nav.less';

interface NavLink extends HTMLHyperLinkProps {
    title: string;
    href?: string | URL;
    disabled?: boolean;
    list?: NavLink[];
}

export interface NavProps extends WebCellProps {
    list: NavLink[];
    activeIndex?: number;
    direction?: 'row' | 'column';
    align?: 'start' | 'center' | 'end';
    itemMode?: 'tabs' | 'pills';
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
    list,
    activeIndex = 0,
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
            {list.map(
                (
                    { list, title, tabIndex, disabled, className, ...rest },
                    index
                ) => {
                    const active = index === activeIndex;

                    rest = {
                        ...rest,
                        className: classNames(
                            'nav-item',
                            'nav-link',
                            'text-nowrap',
                            list && 'p-0',
                            className,
                            disabled ? 'disabled' : active && 'active'
                        ),
                        tabIndex: disabled ? -1 : tabIndex,
                        'aria-disabled': Boolean(disabled) + ''
                    };

                    return list ? (
                        <DropMenu {...rest} title={title} list={list} />
                    ) : (
                        <a {...rest}>
                            {title}
                            {!active ? null : (
                                <span className="sr-only">(current)</span>
                            )}
                        </a>
                    );
                }
            )}
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
