import { WebCellProps, createCell } from 'web-cell';
import { HTMLHyperLinkProps } from 'web-utility/source/DOM-type';
import classNames from 'classnames';

import { Status, Theme } from '../utility/constant';

interface BadgeProps extends HTMLHyperLinkProps, WebCellProps {
    kind?: keyof typeof Status | keyof typeof Theme;
    pill?: boolean;
}

export function Badge({
    kind = 'secondary',
    pill,
    className,
    href,
    defaultSlot,
    ...rest
}: BadgeProps) {
    const Class = classNames(
        'badge',
        `badge-${kind}`,
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