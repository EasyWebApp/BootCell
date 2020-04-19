import { WebCellProps, createCell } from 'web-cell';
import { HTMLProps } from 'web-utility/source/DOM-type';
import classNames from 'classnames';

export interface FormProps extends HTMLProps, WebCellProps {
    inline?: boolean;
    validate?: boolean;
    validated?: boolean;
    onSubmit?: (event: Event) => any;
    onReset?: (event: Event) => any;
}

export function Form({
    inline,
    validate,
    validated,
    className,
    defaultSlot,
    ...rest
}: FormProps) {
    return (
        <form
            {...rest}
            className={classNames(
                inline && 'form-inline',
                validate && 'needs-validation',
                validated && 'was-validated',
                className
            )}
            novalidate={validate}
        >
            {defaultSlot}
        </form>
    );
}
