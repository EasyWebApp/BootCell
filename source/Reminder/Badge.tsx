import classNames from 'classnames';
import { FC, WebCellProps } from 'web-cell';

import { Color } from '../type';

export interface BadgeProps extends WebCellProps<HTMLAnchorElement> {
    bg?: Color;
    text?: Color;
    pill?: boolean;
}

export const Badge: FC<BadgeProps> = ({
    className,
    bg,
    text,
    pill,
    href,
    children,
    ...rest
}) => {
    const Class = classNames(
        'badge',
        bg && `text-bg-${bg}`,
        text && `text-${text}`,
        pill && `rounded-pill`,
        href && 'text-decoration-none',
        className
    );

    return href ? (
        <a {...rest} className={Class} href={href}>
            {children}
        </a>
    ) : (
        <span {...rest} className={Class}>
            {children}
        </span>
    );
};
