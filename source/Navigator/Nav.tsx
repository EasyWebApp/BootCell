import { createCell } from 'web-cell';
import classNames from 'classnames';
import { HTMLHyperLinkProps, HTMLProps, WebCellProps } from '../utility';

interface NavLink extends HTMLHyperLinkProps {
    title: string;
    href: string | URL;
    disabled?: boolean;
}

export interface NavProps extends HTMLProps, WebCellProps {
    list: NavLink[];
    activeIndex?: number;
    direction?: 'row' | 'column';
    align?: 'start' | 'center' | 'end';
    itemMode?: 'tabs' | 'pills';
    itemWidth?: 'fill' | 'justified';
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
    ...rest
}: NavProps) {
    return (
        <nav
            {...rest}
            className={classNames(
                'nav',
                direction && `flex-${direction}`,
                align && `justify-content-${align}`,
                itemMode && `nav-${itemMode}`,
                itemWidth && `nav-${itemWidth}`,
                className
            )}
        >
            {list.map(({ title, tabIndex, disabled, ...rest }, index) => (
                <a
                    {...rest}
                    className={classNames(
                        'nav-item',
                        'nav-link',
                        'text-nowrap',
                        disabled
                            ? 'disabled'
                            : index === activeIndex && 'active'
                    )}
                    tabIndex={disabled ? -1 : tabIndex}
                    aria-disabled={Boolean(disabled) + ''}
                >
                    {title}
                </a>
            ))}
        </nav>
    );
}
