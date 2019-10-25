import { createCell } from 'web-cell';
import classNames from 'classnames';
import { HTMLHyperLinkProps, HTMLProps } from '../utility';

interface NavLink extends HTMLHyperLinkProps {
    title: string;
    href: string | URL;
    active?: boolean;
    disabled?: boolean;
}

interface NavProps extends HTMLProps {
    list: NavLink[];
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
    list
}: NavProps) {
    return (
        <nav
            className={classNames(
                'nav',
                direction && `flex-${direction}`,
                align && `justify-content-${align}`,
                itemMode && `nav-${itemMode}`,
                itemWidth && `nav-${itemWidth}`,
                className
            )}
        >
            {list.map(({ title, tabIndex, active, disabled, ...rest }) => (
                <a
                    {...rest}
                    className={classNames(
                        'nav-item',
                        'nav-link',
                        disabled ? 'disabled' : active && 'active'
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
