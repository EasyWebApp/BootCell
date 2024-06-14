import classNames from 'classnames';
import { FC, WebCellProps } from 'web-cell';

import { TextColor } from '../type';

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
        className={classNames(
            `bi-${name}`,
            color && `text-${color}`,
            className
        )}
        style={{
            ...style,
            fontSize: size ? `${size}rem` : undefined
        }}
        {...rest}
    />
);

export interface BGIconProps extends IconProps {
    type?: 'square' | 'circle';
}

export const BGIcon: FC<BGIconProps> = ({
    className = '',
    type = 'square',
    color = 'primary',
    children,
    ...props
}) => (
    <span
        className={classNames(
            'd-inline-block',
            'p-3',
            `bg-${color}`,
            `rounded${type === 'square' ? '' : '-circle'}`,
            className
        )}
        {...props}
    >
        <Icon color={color === 'light' ? 'dark' : 'light'} {...props} />
    </span>
);
