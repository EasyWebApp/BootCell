import { WebCellProps, createCell } from 'web-cell';
import { BaseFieldProps } from 'web-utility/source/DOM-type';
import classNames from 'classnames';

export interface FieldProps extends BaseFieldProps, WebCellProps {
    is?: 'input' | 'output' | 'select' | 'textarea';
    type?:
        | 'button'
        | 'checkbox'
        | 'color'
        | 'date'
        | 'datetime-local'
        | 'email'
        | 'file'
        | 'hidden'
        | 'image'
        | 'month'
        | 'number'
        | 'password'
        | 'radio'
        | 'range'
        | 'reset'
        | 'search'
        | 'submit'
        | 'tel'
        | 'text'
        | 'time'
        | 'url'
        | 'week';
    size?: 'sm' | 'lg' | number;
    valid?: boolean;
}

export function Field({
    is = 'input',
    type = 'text',
    className,
    size,
    defaultValue,
    valid,
    defaultSlot,
    ...rest
}: FieldProps) {
    const sizeClass = typeof size === 'string' && `form-control-${size}`,
        validClass = valid ? 'is-valid' : valid === false && 'is-invalid';

    if (typeof size === 'number') rest.size = size;

    return {
        input:
            type !== 'file' ? (
                <input
                    {...rest}
                    type={type}
                    className={classNames(
                        type === 'range' ? 'custom-range' : 'form-control',
                        validClass,
                        sizeClass,
                        className
                    )}
                />
            ) : (
                <input
                    {...rest}
                    type="file"
                    className={classNames(
                        'custom-file-input',
                        validClass,
                        sizeClass,
                        className
                    )}
                />
            ),
        output: (
            <output
                {...rest}
                className={classNames(
                    'form-control',
                    'form-control-plaintext',
                    className
                )}
            >
                {defaultValue}
            </output>
        ),
        select: (
            <select
                {...rest}
                className={classNames(
                    'custom-select',
                    validClass,
                    typeof size === 'string' && `custom-select-${size}`,
                    className
                )}
            >
                {defaultSlot}
            </select>
        ),
        textarea: (
            <textarea
                {...rest}
                className={classNames(
                    'form-control',
                    validClass,
                    sizeClass,
                    className
                )}
            >
                {defaultValue}
            </textarea>
        )
    }[is];
}
