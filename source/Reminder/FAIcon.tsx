import { FC } from 'web-cell';
import classNames from 'classnames';

import { TextColor } from '../type';
import { IconProps } from './Icon';

export interface FAIconProps extends Omit<IconProps, 'size'> {
    family?: 'classic' | 'duotone' | 'sharp' | 'sharp-duotone';
    group?: 'solid' | 'brands' | 'regular' | 'light' | 'thin';
    size?: 'xs' | 'sm' | 'lg' | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
    width?: 'auto' | 'fixed';
    color?: TextColor;
    inverse?: boolean;
    border?: boolean;
    rotate?: 90 | 180 | 270;
    flip?: 'horizontal' | 'vertical' | 'both';
    animation?: 'spin' | 'spin-pulse';
    pull?: 'start' | 'end';
    stack?: 1 | 2;
    listItem?: boolean;
}

export const FAIcon: FC<FAIconProps> = ({
    family = 'classic',
    group = 'solid',
    name,
    size,
    width,
    color,
    inverse,
    border,
    rotate,
    flip,
    animation,
    pull,
    stack,
    listItem,
    className,
    children,
    ...rest
}) => {
    const icon = (
        <span
            className={classNames(
                group !== 'brands' && `fa-${family}`,
                `fa-${group}`,
                'fa-' + name,
                size && 'fa-' + (typeof size === 'number' ? size + 'x' : size),
                width && `fa-width-${width}`,
                inverse && 'fa-inverse',
                border && 'fa-border',
                rotate && 'fa-rotate-' + rotate,
                flip && 'fa-flip-' + flip,
                animation && 'fa-' + animation,
                pull && 'fa-pull-' + pull,
                stack && `fa-stack-${stack}x`,
                color && `fg-${color}`,
                className
            )}
            aria-hidden="true"
            {...rest}
        />
    );

    return listItem ? <span className="fa-li">{icon}</span> : icon;
};

export interface FABGIconProps extends FAIconProps {
    type: 'square' | 'circle';
}

export const FABGIcon: FC<FABGIconProps> = ({
    size,
    color,
    className,
    type,
    ...rest
}) => (
    <span
        className={classNames(
            'fa-stack',
            size && 'fa-' + (typeof size === 'number' ? size + 'x' : size),
            color && `fg-${color}`,
            className
        )}
    >
        <FAIcon name={type} stack={2} />
        <FAIcon {...rest} stack={1} inverse />
    </span>
);
