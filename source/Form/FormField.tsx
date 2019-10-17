import { createCell } from 'web-cell';

import { uniqueID } from '../utility';

interface BaseFieldProps {
    name?: string;
    defaultValue?: string;
    value?: string;
    required?: boolean;
    label?: string;
    placeholder?: string;
    [key: string]: string | boolean;
}

interface FieldProps extends BaseFieldProps {
    is?: 'input' | 'select' | 'textarea';
    type?: string;
    children?: any;
}

export function FormField({
    is,
    type = 'text',
    label,
    children,
    ...rest
}: FieldProps = {}) {
    const UID = uniqueID();

    const field = {
        input: (
            <input type={type} className="form-control" id={UID} {...rest} />
        ),
        select: (
            <select className="form-control" id={UID} {...rest}>
                {children}
            </select>
        ),
        textarea: <textarea className="form-control" id={UID} {...rest} />
    };

    return (
        <section className="form-group">
            <label htmlFor={UID}>{label || rest.name}</label>

            {!is && children[0] ? children : field[is || 'input']}
        </section>
    );
}
