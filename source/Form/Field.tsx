import { WebCellProps, VNodeChildElement, VNode, createCell } from 'web-cell';
import type {
    HTMLInputProps,
    NumberFieldProps,
    TextFieldProps
} from 'web-utility';
import { uniqueID } from 'web-utility/source/data';
import classNames from 'classnames';

import type { ToggleFieldProps } from './ToggleField';

export interface FieldProps
    extends WebCellProps,
        HTMLInputProps,
        Omit<TextFieldProps, 'size'>,
        NumberFieldProps,
        Pick<ToggleFieldProps, 'checked' | 'indeterminate'> {
    is?: 'input' | 'output' | 'select' | 'textarea';
    size?: 'sm' | 'lg' | number;
    multiple?: boolean;
    valid?: boolean;
    label?: string;
    fileButton?: string;
}

export function Field({
    is = 'input',
    type = 'text',
    className,
    id = uniqueID(),
    size,
    defaultValue,
    valid,
    label,
    fileButton = 'Browse',
    defaultSlot,
    ...rest
}: FieldProps) {
    const sizeClass = typeof size === 'string' && `form-control-${size}`,
        validClass = valid ? 'is-valid' : valid === false && 'is-invalid';

    if (typeof size === 'number') rest['size'] = size;

    return {
        input:
            type === 'file' ? (
                <div className={classNames('form-file', className)}>
                    <input
                        {...rest}
                        type="file"
                        className={classNames(
                            'form-file-input',
                            validClass,
                            sizeClass,
                            className
                        )}
                        id={id}
                    />
                    <label
                        className="form-file-label"
                        htmlFor={id}
                        data-file={label || 'Choose file'}
                        data-browse={fileButton}
                    />
                </div>
            ) : (
                <input
                    {...rest}
                    type={type}
                    className={classNames(
                        type === 'range' ? 'form-range' : 'form-control',
                        validClass,
                        sizeClass,
                        className
                    )}
                    id={id}
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
                id={id}
            >
                {defaultValue}
            </output>
        ),
        select: (
            <select
                {...rest}
                className={classNames(
                    'form-select',
                    validClass,
                    typeof size === 'string' && `form-select-${size}`,
                    className
                )}
                id={id}
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
                id={id}
            >
                {defaultValue}
            </textarea>
        )
    }[is];
}

export function isField(node: VNodeChildElement): node is VNode {
    const {
        'form-control': origin,
        'form-select': select,
        'form-file': file,
        'form-range': range
    } = (node as VNode).data?.class || {};

    return origin || select || file || range;
}
