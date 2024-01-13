import classNames from 'classnames';
import { WebCellProps } from 'web-cell';

import { Color } from './type';

export interface IconProps extends WebCellProps {
    name: string;
    color?: Color;
    size?: number;
}

export function Icon({
    className,
    style,
    color,
    name,
    size,
    children,
    ...rest
}: IconProps) {
    return (
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
}
