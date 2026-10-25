import classNames from 'classnames';
import { FC, WebCellProps } from 'web-cell';

import { BackgroundColor, TextColor } from '../type';

export interface IconProps extends WebCellProps {
    name: string;
    color?: TextColor;
    size?: number;
}

export const Icon: FC<IconProps> = ({
    className,
    style,
    color,
    name,
    size,
    children,
    ...rest
}) => (
    <i
        className={classNames(`bi-${name}`, color && `fg-${color}`, className)}
        style={{
            ...style,
            fontSize: size ? `${size}rem` : undefined
        }}
        {...rest}
    />
);

export interface BGIconProps extends IconProps {
    type?: 'square' | 'circle';
    bg?: BackgroundColor;
}

export const BGIcon: FC<BGIconProps> = ({
    className = '',
    type = 'square',
    color = 'contrast-primary',
    bg = 'primary',
    children,
    ...props
}) => (
    <span
        className={classNames(
            'd-inline-block',
            'p-5',
            `bg-${bg}`,
            `rounded${type === 'square' ? '' : '-circle'}`,
            className
        )}
        {...props}
    >
        <Icon color={color} {...props} />
    </span>
);
