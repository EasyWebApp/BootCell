import classNames from 'classnames';
import { FC, WebCellProps } from 'web-cell';

import { Size, Status, Theme } from '../type';

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
                `list-group-horizontal${horizontal === true ? '' : `-${horizontal}`}`,
            className
        )}
        {...props}
    >
        {children}
    </div>
);

export interface ListGroupItemProps
    extends WebCellProps<HTMLAnchorElement>,
        Partial<Record<'active' | 'disabled', boolean>> {
    variant?: keyof typeof Status | keyof typeof Theme;
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
            variant && `list-group-item-${variant}`,
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
