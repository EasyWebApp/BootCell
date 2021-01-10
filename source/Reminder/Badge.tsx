import { WebCellProps, createCell } from 'web-cell';
import type { HTMLHyperLinkProps } from 'web-utility';
import classNames from 'classnames';

import { CommonColors } from '../utility/constant';

export interface BadgeProps extends HTMLHyperLinkProps, WebCellProps {
    color?: CommonColors;
    pill?: boolean;
}

export function Badge({
    color = 'secondary',
    pill,
    className,
    href,
    defaultSlot,
    ...rest
}: BadgeProps) {
    const Class = classNames(
        'badge',
        `badge-${color}`,
        pill && 'badge-pill',
        className
    );

    return href ? (
        <a {...rest} className={Class} href={href}>
            {defaultSlot}
        </a>
    ) : (
        <span {...rest} className={Class}>
            {defaultSlot}
        </span>
    );
}
