import { createCell } from 'web-cell';
import classNames from 'classnames';
import { HTMLHyperLinkProps, WebCellProps, Status, Theme } from '../utility';

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
