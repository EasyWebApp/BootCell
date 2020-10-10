import { WebCellProps, createCell } from 'web-cell';
import { BaseFieldProps } from 'web-utility/source/DOM-type';
import classNames from 'classnames';

import { TextColors } from '../utility/constant';
import style from './Range.less';

export interface RangeProp extends BaseFieldProps, WebCellProps {
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
    max,
    defaultValue = '0',
    size,
    emptyIcon,
    fullIcon,
    color = 'primary',
    onChange,
    defaultSlot,
    ...rest
}: RangeProp) {
    const iconMode = emptyIcon && fullIcon;
    const sizeClass =
        size &&
        (!iconMode
            ? `form-control-${size}`
            : style[size === 'lg' ? 'large' : 'small']);

    function setRange({ parentElement: { dataset }, value }: HTMLInputElement) {
        dataset.content = fullIcon.repeat(+value).padEnd(max, emptyIcon);
    }

    return !iconMode ? (
        <input
            {...rest}
            type="range"
            name={name}
            max={max}
            defaultValue={defaultValue}
            className={classNames('custom-range', sizeClass, className)}
            onChange={onChange}
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
        >
            <input
                type="range"
                name={name}
                min={0}
                step={1}
                max={max}
                defaultValue={defaultValue}
                ref={setRange}
                onChange={(event: Event) => (
                    setRange(event.target as HTMLInputElement),
                    onChange?.call(event.target, event)
                )}
            />
        </div>
    );
}
