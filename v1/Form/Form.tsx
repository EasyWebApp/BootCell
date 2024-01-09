import { WebCellElement, createCell, Fragment } from 'web-cell';
import type { HTMLProps } from 'web-utility';
import classNames from 'classnames';

type HTMLFormProps = JSX.IntrinsicElements['form'];

export interface FormProps extends HTMLFormProps {
    inline?: boolean;
    validate?: boolean;
    validated?: boolean;
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
            // @ts-ignore
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

export interface ValidableFieldProps extends HTMLProps {
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
        <>
            {validMessage && (
                <div className={'valid-' + validMode}>{validMessage}</div>
            )}
            {invalidMessage && (
                <div className={'invalid-' + validMode}>{invalidMessage}</div>
            )}
        </>
    );
}
