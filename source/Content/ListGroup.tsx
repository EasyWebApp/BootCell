import classNames from 'classnames';
import { FC, WebCellProps } from 'web-cell';

import { Size, ThemeColor } from '../type';

export interface ListGroupProps extends WebCellProps<HTMLDivElement> {
    variant?: 'flush';
    numbered?: boolean;
    horizontal?: true | Size;
}

export const ListGroup: FC<ListGroupProps> = ({
    className = '',
    variant,
    numbered,
    horizontal,
    children,
    ...props
}) => (
    <div
        className={classNames(
            'list-group',
            variant && `list-group-${variant}`,
            numbered && `list-group-numbered`,
            horizontal &&
                `${horizontal === true ? '' : `${horizontal}:`}list-group-horizontal`,
            className
        )}
        {...props}
    >
        {children}
    </div>
);

export interface ListGroupItemProps
    extends
        WebCellProps<HTMLAnchorElement>,
        Partial<Record<'active' | 'disabled', boolean>> {
    variant?: ThemeColor;
}

export const ListGroupItem: FC<ListGroupItemProps> = ({
    className = '',
    variant,
    href,
    active,
    disabled,
    children,
    ...props
}) => (
    <a
        className={classNames(
            'list-group-item',
            variant && `theme-${variant}`,
            href && 'list-group-item-action',
            { active, disabled },
            disabled && 'pe-none',
            className
        )}
        ariaCurrent={active ? 'true' : undefined}
        ariaDisabled={disabled ? 'true' : undefined}
        {...{ href, ...props }}
    >
        {children}
    </a>
);
