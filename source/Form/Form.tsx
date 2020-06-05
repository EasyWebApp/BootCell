import { WebCellProps, createCell } from 'web-cell';
import classNames from 'classnames';

export interface FormProps extends WebCellProps {
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
