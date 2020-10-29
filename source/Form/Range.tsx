import { WebCellProps, createCell } from 'web-cell';
import { BaseFieldProps } from 'web-utility/source/DOM-type';
import classNames from 'classnames';

import { TextColors } from '../utility/constant';
import style from './Range.less';

export interface RangeProps extends BaseFieldProps, WebCellProps {
    min?: number;
    step?: number;
    max?: number;
    size?: 'sm' | 'lg';
    emptyIcon?: string;
    fullIcon?: string;
    color?: TextColors;
}

export function Range({
    className,
    name,
    min,
    step,
    max,
    value,
    defaultValue = '0',
    disabled,
    size,
    emptyIcon,
    fullIcon,
    color = 'primary',
    defaultSlot,
    ...rest
}: RangeProps) {
    const iconMode = emptyIcon && fullIcon;
    const sizeClass =
        size &&
        (!iconMode
            ? `form-control-${size}`
            : style[size === 'lg' ? 'large' : 'small']);

    return !iconMode ? (
        <input
            type="range"
            {...{ name, min, step, max, defaultValue, value, disabled }}
            {...rest}
            className={classNames('custom-range', sizeClass, className)}
        />
    ) : (
        <div
            {...rest}
            className={classNames(
                style.range,
                sizeClass,
                color && `text-${color}`,
                className
            )}
            data-content={fullIcon.repeat(+value).padEnd(max, emptyIcon)}
        >
            <input
                type="range"
                min={0}
                step={1}
                {...{ name, max, defaultValue, value, disabled }}
            />
        </div>
    );
}
