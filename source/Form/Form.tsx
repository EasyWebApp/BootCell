import { WebCellProps, createCell } from 'web-cell';
import { HTMLProps } from 'web-utility/source/DOM-type';
import classNames from 'classnames';

export interface FormProps extends HTMLProps, WebCellProps {
    inline?: boolean;
    validate?: boolean;
    onSubmit?: (event: Event) => any;
    onReset?: (event: Event) => any;
}

export function Form({
    inline,
    validate,
    className,
    defaultSlot,
    ...rest
}: FormProps) {
    return (
        <form
            className={classNames(
                inline && 'form-inline',
                'was-validated',
                validate && 'needs-validation',
                className
            )}
            novalidate={validate}
            {...rest}
        >
            {defaultSlot}
        </form>
    );
}
