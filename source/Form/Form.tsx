import classNames from 'classnames';
import { JsxChildren } from 'dom-renderer';
import { FC, WebCellProps } from 'web-cell';
import { uniqueID } from 'web-utility';

export type FormGroupProps = WebCellProps<HTMLDivElement>;

export const FormGroup: FC<FormGroupProps> = ({ children, ...props }) => (
    <div {...props}>{children}</div>
);

export type FormLabelProps = WebCellProps<HTMLLabelElement>;

export const FormLabel: FC<FormLabelProps> = ({
    className = '',
    children,
    ...props
}) => (
    <label className={`form-label ${className}`} {...props}>
        {children}
    </label>
);

export interface FloatingLabelProps extends FormLabelProps {
    label: string;
}

export const FloatingLabel: FC<FloatingLabelProps> = ({
    className = '',
    style,
    label,
    children,
    ...props
}) => (
    <div className={`form-floating ${className}`} style={style}>
        {children}
        <label {...props}>{label}</label>
    </div>
);

export interface InputGroupProps extends WebCellProps<HTMLDivElement> {
    size?: 'sm' | 'lg';
}

export const InputGroup: FC<InputGroupProps> = ({
    className = '',
    size,
    children,
    ...props
}) => (
    <div
        className={classNames(
            'input-group',
            size && `input-group-${size}`,
            className
        )}
        {...props}
    >
        {children}
    </div>
);

export const InputGroupText: FC<WebCellProps<HTMLSpanElement>> = ({
    className = '',
    children,
    ...props
}) => (
    <span className={`input-group-text ${className}`} {...props}>
        {children}
    </span>
);

export type FormControlTag = 'input' | 'textarea' | 'select';

export type FormControlProps<T extends FormControlTag> = WebCellProps &
    Omit<JSX.IntrinsicElements[T], 'size'> & {
        as?: T;
        htmlSize?: number;
        size?: 'sm' | 'lg';
        plaintext?: boolean;
    };

export const FormControl = <T extends FormControlTag = 'input'>({
    as: Tag = 'input' as T,
    className = '',
    htmlSize,
    size,
    plaintext,
    ...props
}: FormControlProps<T>) => (
    <Tag
        className={classNames(
            'form-control',
            size && `form-control-${size}`,
            (props as FormControlProps<'input'>).readOnly &&
                plaintext &&
                `form-control-plaintext`,
            (props as FormControlProps<'input'>).type === 'color' &&
                `form-control-color`,
            className
        )}
        {...props}
        size={htmlSize}
    />
);

export interface FormCheckProps extends WebCellProps<HTMLInputElement> {
    type: 'radio' | 'checkbox' | 'switch';
    inline?: boolean;
    reverse?: boolean;
    label?: JsxChildren;
}

export const FormCheck: FC<FormCheckProps> = ({
    id = uniqueID(),
    className = '',
    style,
    title,
    type,
    inline,
    reverse,
    label,
    ...props
}) => (
    <div
        className={classNames(
            'form-field',
            inline && 'd-inline-grid',
            className
        )}
        style={{
            ...style,
            ...(reverse ? { gridTemplateColumns: '1fr auto' } : {})
        }}
    >
        {type === 'switch' ? (
            <div
                className="switch"
                style={reverse ? { gridColumn: '2', gridRow: '1' } : undefined}
            >
                <input
                    type="checkbox"
                    role="switch"
                    switch
                    id={id}
                    {...props}
                />
            </div>
        ) : (
            <input
                className={type === 'radio' ? 'radio' : 'check'}
                style={reverse ? { gridColumn: '2' } : undefined}
                {...{ type, id }}
                {...props}
            />
        )}
        {label && (
            <label
                htmlFor={id}
                title={title}
                style={reverse ? { gridColumn: '1', gridRow: '1' } : undefined}
            >
                {label}
            </label>
        )}
    </div>
);

export type FormFieldProps<T extends FormControlTag> = FormGroupProps &
    FormLabelProps &
    FormControlProps<T> & {
        label?: string;
        labelFloat?: boolean;
    };

export const FormField = <T extends FormControlTag = 'input'>({
    className,
    id = uniqueID(),
    label,
    labelFloat,
    ...props
}: FormFieldProps<T>) => {
    label ||= props.title || (props as FormControlProps<'input'>).placeholder;

    const field = <FormControl {...(props as FormControlProps<T>)} id={id} />;

    return labelFloat ? (
        <FloatingLabel {...{ className, label }} htmlFor={id}>
            {field}
        </FloatingLabel>
    ) : (
        <FormGroup className={classNames('form-field', className)}>
            {label && <FormLabel htmlFor={id}>{label}</FormLabel>}
            {field}
        </FormGroup>
    );
};
