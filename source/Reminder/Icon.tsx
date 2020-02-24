import { createCell } from 'web-cell';
import classNames from 'classnames';
import { HTMLProps, WebCellProps } from '../utility/type';

export interface IconProps extends HTMLProps, WebCellProps {
    kind?: 'solid' | 'brands' | 'regular' | 'light' | 'duotone';
    name: string;
    size?: 'xs' | 'sm' | 'lg' | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
    fixedWidth?: boolean;
    inverse?: boolean;
    border?: boolean;
    rotate?: 90 | 180 | 270;
    flip?: 'horizontal' | 'vertical' | 'both';
    animation?: 'spin' | 'pulse';
    pull?: 'left' | 'right';
    stack?: 1 | 2;
    listItem?: boolean;
}

export function Icon({
    kind = 'solid',
    name,
    size,
    fixedWidth,
    inverse,
    border,
    rotate,
    flip,
    animation,
    pull,
    stack,
    listItem,
    className,
    defaultSlot,
    ...rest
}: IconProps) {
    const icon = (
        <span
            className={classNames(
                'fa' + kind[0],
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
                className
            )}
            aria-hidden="true"
            {...rest}
        />
    );

    return listItem ? <span className="fa-li">{icon}</span> : icon;
}
