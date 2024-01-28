import classNames from 'classnames';
import { VNode } from 'dom-renderer';
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
    label?: VNode;
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
            label && 'form-check',
            inline && 'form-check-inline',
            reverse && 'form-check-reverse',
            type === 'switch' && 'form-switch',
            className
        )}
        style={style}
    >
        <input
            className="form-check-input"
            type={type === 'switch' ? 'checkbox' : type}
            role={type === 'switch' ? 'switch' : undefined}
            id={id}
            {...props}
        />
        {label && (
            <label className="form-check-label" htmlFor={id} title={title}>
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
    label,
    labelFloat,
    ...props
}: FormFieldProps<T>) => {
    label ||= props.title || (props as FormControlProps<'input'>).placeholder;

    const field = <FormControl {...(props as FormControlProps<T>)} />;

    return labelFloat ? (
        <FloatingLabel {...{ className, label }}>{field}</FloatingLabel>
    ) : (
        <FormGroup className={className}>
            <FormLabel>{label}</FormLabel>
            {field}
        </FormGroup>
    );
};
