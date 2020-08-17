import { WebCellProps, WebCellElement, createCell, Fragment } from 'web-cell';
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
    onSubmit,
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
            onSubmit={
                !validate
                    ? onSubmit
                    : function (event: Event) {
                          const form = event.target as HTMLFormElement;

                          if (!form.checkValidity()) {
                              event.preventDefault();
                              event.stopPropagation();
                          }
                          form.classList.add('was-validated');

                          return onSubmit.call(this, event);
                      }
            }
        >
            {defaultSlot}
        </form>
    );
}

export interface ValidableFieldProps {
    validMode?: 'feedback' | 'tooltip';
    validMessage?: WebCellElement;
    invalidMessage?: WebCellElement;
}

export function ValidMessage({
    validMode = 'feedback',
    validMessage,
    invalidMessage
}: ValidableFieldProps) {
    return (
        <Fragment>
            {validMessage && (
                <div class={'valid-' + validMode}>{validMessage}</div>
            )}
            {invalidMessage && (
                <div class={'invalid-' + validMode}>{invalidMessage}</div>
            )}
        </Fragment>
    );
}
