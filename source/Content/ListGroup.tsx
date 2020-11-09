import { WebCellProps, VNodeChildElement, VNode, createCell } from 'web-cell';
import { HTMLHyperLinkProps } from 'web-utility/source/DOM-type';
import classNames from 'classnames';

import { CommonColors } from '../utility/constant';

export interface ListItemProps extends WebCellProps, HTMLHyperLinkProps {
    color?: CommonColors;
    disabled?: boolean;
    active?: boolean;
}

export function ListItem({
    className,
    color,
    disabled,
    active,
    tabIndex,
    defaultSlot,
    ...rest
}: ListItemProps) {
    return (
        <a
            {...rest}
            className={classNames(
                'list-group-item',
                'list-group-item-action',
                color && `list-group-item-${color}`,
                !disabled && active && 'active',
                disabled && 'disabled',
                className
            )}
            tabIndex={disabled ? -1 : tabIndex}
            aria-disabled={Boolean(disabled) + ''}
        >
            {defaultSlot}
        </a>
    );
}

export function isListItem(node: VNodeChildElement): node is VNode {
    return (node as VNode).data?.class?.['list-group-item'];
}

export interface ListGroupProps extends WebCellProps {
    flush?: boolean;
    horizontal?: boolean | 'sm' | 'md' | 'lg' | 'xl';
}

export function ListGroup({
    className,
    flush,
    horizontal,
    defaultSlot,
    ...rest
}: ListGroupProps) {
    var modeClass = '';

    if (flush) modeClass += 'list-group-flush';
    else if (horizontal) {
        modeClass += 'list-group-horizontal';

        if (typeof horizontal === 'string') modeClass += '-' + horizontal;
    }

    return (
        <div
            {...rest}
            className={classNames('list-group', modeClass, className)}
        >
            {defaultSlot}
        </div>
    );
}
