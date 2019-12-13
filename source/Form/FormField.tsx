import { createCell } from 'web-cell';
import { uniqueID } from '../utility';

interface BaseFieldProps {
    name?: string;
    defaultValue?: string;
    value?: string;
    required?: boolean;
    label?: string;
    placeholder?: string;
    [key: string]: any;
}

export interface FieldProps extends BaseFieldProps {
    is?: 'input' | 'select' | 'textarea';
    type?: string;
    defaultSlot?: any[];
}

export function FormField({
    is,
    type = 'text',
    label,
    defaultSlot,
    ...rest
}: FieldProps = {}) {
    const UID = uniqueID();

    const field = {
        input: (
            <input type={type} className="form-control" id={UID} {...rest} />
        ),
        select: (
            <select className="form-control" id={UID} {...rest}>
                {defaultSlot}
            </select>
        ),
        textarea: <textarea className="form-control" id={UID} {...rest} />
    };

    return (
        <section className="form-group">
            <label htmlFor={UID}>{label || rest.name}</label>

            {!is && defaultSlot[0] ? defaultSlot : field[is || 'input']}
        </section>
    );
}
