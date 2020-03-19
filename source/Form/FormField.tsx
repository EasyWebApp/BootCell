import { WebCellProps, createCell } from 'web-cell';
import { BaseFieldProps } from 'web-utility/source/DOM-type';
import { uniqueID } from 'web-utility/source/data';
import classNames from 'classnames';

import style from './FormField.less';

export interface FieldProps extends BaseFieldProps, WebCellProps {
    is?: 'input' | 'select' | 'textarea';
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
    label?: string;
    labelFloat?: boolean;
    fileButton?: string;
}

export function FormField({
    className,
    is,
    type = 'text',
    id = uniqueID(),
    label,
    labelFloat,
    fileButton = 'Browse',
    defaultSlot,
    ...rest
}: FieldProps = {}) {
    label = label || rest.name;

    if (type === 'file')
        return (
            <div className={classNames('custom-file', className)}>
                <input
                    {...rest}
                    type="file"
                    className="custom-file-input"
                    id={id}
                />
                <label
                    className="custom-file-label"
                    for={id}
                    data-browse={fileButton}
                >
                    {label || 'Choose file'}
                </label>
            </div>
        );

    const field = {
        input: (
            <input
                {...rest}
                type={type}
                className={type === 'range' ? 'custom-range' : 'form-control'}
                id={id}
            />
        ),
        select: (
            <select {...rest} className="custom-select" id={id}>
                {defaultSlot}
            </select>
        ),
        textarea: <textarea {...rest} className="form-control" id={id} />
    };

    if (labelFloat) label = label || rest.placeholder;

    defaultSlot = [
        label && <label htmlFor={id}>{label}</label>,
        !is && defaultSlot[0] ? defaultSlot : field[is || 'input']
    ];

    return (
        <div
            className={classNames(
                labelFloat ? style['form-label-group'] : 'form-group',
                className
            )}
        >
            {labelFloat ? defaultSlot.reverse() : defaultSlot}
        </div>
    );
}
