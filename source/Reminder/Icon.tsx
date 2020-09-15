import { HTMLProps } from 'web-utility/source/DOM-type';
import { createCell } from 'web-cell';
import classNames from 'classnames';
import icons from 'bootstrap-icons/bootstrap-icons.svg';

import { TextColors } from '../utility/constant';

export interface IconProps extends HTMLProps {
    name: string;
    width?: number;
    height?: number;
    color?: TextColors;
    fill?: string;
    viewBox?: number[];
}

export function Icon({
    className,
    color,
    fill = 'currentColor',
    width = 16,
    height = width,
    viewBox = [0, 0, width, height],
    name,
    ...rest
}: IconProps) {
    return (
        <svg
            className={classNames(color && `text-${color}`, className)}
            fill={fill}
            viewBox={viewBox.join(' ')}
            width={width}
            height={height}
            {...rest}
        >
            <use {...{ 'xlink:href': `${icons}#${name}` }} />
        </svg>
    );
}
