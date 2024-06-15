import { FC } from 'web-cell';
import classNames from 'classnames';

import { TextColor } from '../type';
import { IconProps } from './Icon';

export interface FAIconProps extends Omit<IconProps, 'size'> {
    group?: 'solid' | 'brands' | 'regular' | 'light' | 'duotone';
    size?: 'xs' | 'sm' | 'lg' | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
    fixedWidth?: boolean;
    color?: TextColor;
    inverse?: boolean;
    border?: boolean;
    rotate?: 90 | 180 | 270;
    flip?: 'horizontal' | 'vertical' | 'both';
    animation?: 'spin' | 'pulse';
    pull?: 'left' | 'right';
    stack?: 1 | 2;
    listItem?: boolean;
}

export const FAIcon: FC<FAIconProps> = ({
    group = 'solid',
    name,
    size,
    fixedWidth,
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
                'fa' + group[0],
                'fa-' + name,
                size && 'fa-' + (typeof size === 'number' ? size + 'x' : size),
                fixedWidth && 'fa-fw',
                inverse && 'fa-inverse',
                border && 'fa-border',
                rotate && 'fa-rotate-' + rotate,
                flip && 'fa-flip-' + flip,
                animation && 'fa-' + animation,
                pull && 'fa-pull-' + pull,
                stack && `fa-stack-${stack}x`,
                color && 'text-' + color,
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
            color && 'text-' + color,
            className
        )}
    >
        <FAIcon name={type} stack={2} />
        <FAIcon {...rest} stack={1} inverse />
    </span>
);
