import classNames from 'classnames';
import { FC, WebCellProps } from 'web-cell';

export const FormGroup: FC<WebCellProps<HTMLDivElement>> = ({
    children,
    ...props
}) => <div {...props}>{children}</div>;

export const FormLabel: FC<WebCellProps<HTMLLabelElement>> = ({
    className = '',
    children,
    ...props
}) => (
    <label className={`form-label ${className}`} {...props}>
        {children}
    </label>
);

export type FormControlTag = 'input' | 'textarea' | 'select';

export type FormControlProps<T extends FormControlTag> = WebCellProps &
    Omit<JSX.IntrinsicElements[T], 'size'> & {
        as?: T;
        htmlSize?:number
        size?: 'sm' | 'lg';
        plaintext?: boolean;
    };

export const FormControl = <T extends FormControlTag = 'input'>({
    as: Tag,
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
