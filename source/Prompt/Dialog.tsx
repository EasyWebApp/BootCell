import { WebCellElement, WebCellProps, render, createCell } from 'web-cell';
import { formToJSON } from 'web-utility/source/DOM';
import classNames from 'classnames';

import { Button, CloseButton } from '../Form/Button';
import style from './Dialog.less';

export async function openDialog(content: WebCellElement) {
    const { body } = document;
    const dialog = body.appendChild(document.createElement('dialog'));

    dialog.className = style.dialog;

    const result = new Promise((resolve, reject) => {
        dialog.onclose = () =>
            resolve(formToJSON(dialog.querySelector('form')));
        dialog.oncancel = reject;
    });

    render(
        <form method="dialog" className="h-100" onReset={() => dialog.close()}>
            {content}
        </form>,
        dialog
    );

    dialog.showModal(), dialog.scrollIntoView({ behavior: 'smooth' });

    const { overflow } = body.style;
    body.style.overflow = 'hidden';

    result.finally(() => {
        dialog.remove();
        body.style.overflow = overflow;
    });

    return result;
}

export interface ModalProps extends WebCellProps {
    cancelText?: WebCellElement;
    confirmText?: WebCellElement;
    scrollable?: boolean;
    centered?: boolean;
    size?: 'sm' | 'lg' | 'xl';
}

export function Modal({
    scrollable,
    centered,
    size,
    className,
    title,
    cancelText = 'Close',
    confirmText = 'Confirm',
    defaultSlot,
    ...rest
}: ModalProps) {
    return (
        <div
            className={classNames(
                'modal-dialog',
                scrollable && 'modal-dialog-scrollable',
                centered && 'modal-dialog-centered',
                size && `modal-${size}`,
                className
            )}
            {...rest}
        >
            <div className="modal-content">
                <header className="modal-header">
                    <h5 className="modal-title">{title}</h5>
                    <CloseButton
                        aria-label={
                            typeof cancelText === 'string'
                                ? cancelText
                                : 'Close'
                        }
                    />
                </header>
                <div className="modal-body">{defaultSlot}</div>

                {(cancelText || confirmText) && (
                    <footer className="modal-footer">
                        {cancelText && (
                            <Button type="reset" color="secondary">
                                {cancelText}
                            </Button>
                        )}
                        {confirmText && (
                            <Button type="submit" color="primary">
                                {confirmText}
                            </Button>
                        )}
                    </footer>
                )}
            </div>
        </div>
    );
}
