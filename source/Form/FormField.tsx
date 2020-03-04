import { WebCellProps, createCell } from 'web-cell';
import { BaseFieldProps } from 'web-utility/source/DOM-type';
import { uniqueID } from 'web-utility/source/data';
import classNames from 'classnames';

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
    fileButton?: string;
}

export function FormField({
    className,
    is,
    type = 'text',
    id = uniqueID(),
    label,
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

    return (
        <div className={classNames('form-group', className)}>
            {label && <label htmlFor={id}>{label}</label>}

            {!is && defaultSlot[0] ? defaultSlot : field[is || 'input']}
        </div>
    );
}
