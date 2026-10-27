import classNames from 'classnames';
import { FC, WebCellProps } from 'web-cell';

import { BackgroundColor, Status, TextColor } from '../type';

export interface BadgeProps extends WebCellProps<HTMLAnchorElement> {
    bg?: BackgroundColor;
    text?: TextColor;
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
        bg && Object.hasOwn(Status, bg) && `theme-${bg}`,
        bg && `bg-${bg}`,
        text && `fg-${text}`,
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
