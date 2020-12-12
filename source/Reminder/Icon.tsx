import { WebCellProps, createCell } from 'web-cell';
import classNames from 'classnames';

import { TextColors } from '../utility/constant';

export interface IconProps extends WebCellProps {
    name: string;
    color?: TextColors;
    size?: number;
}

export function Icon({
    className,
    style,
    color,
    name,
    size,
    defaultSlot,
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
