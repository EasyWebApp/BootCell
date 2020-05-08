import { VNodeChildElement, render, createCell } from 'web-cell';
import { formToJSON } from 'web-utility/source/DOM';
import classNames from 'classnames';

import { Button, CloseButton } from '../Form/Button';
import style from './Dialog.less';

export async function openDialog(
    content: VNodeChildElement,
    boxClass?: string
) {
    const dialog = document.body.appendChild(document.createElement('dialog'));

    dialog.className = style.dialog;

    const result = new Promise((resolve, reject) => {
        dialog.onclose = () =>
            resolve(formToJSON(dialog.querySelector('form')));
        dialog.oncancel = reject;
    });

    render(
        <form
            method="dialog"
            className={boxClass}
            onReset={() => dialog.close()}
        >
            {content}
        </form>,
        dialog
    );

    dialog.showModal(), dialog.scrollIntoView({ behavior: 'smooth' });

    document.body.style.overflow = 'hidden';

    result.finally(() => {
        dialog.remove();

        document.body.style.overflow = 'auto';
    });

    return result;
}

export interface ModalProps {
    title: string;
    body: VNodeChildElement;
    cancelText?: VNodeChildElement;
    confirmText?: VNodeChildElement;
    scrollable?: boolean;
    centered?: boolean;
    size?: 'sm' | 'lg' | 'xl';
}

export function openModal({
    title,
    body,
    cancelText = 'Close',
    confirmText = 'Confirm',
    scrollable,
    centered,
    size
}: ModalProps) {
    return openDialog(
        <div className="modal-content">
            <header className="modal-header">
                <h5 className="modal-title">{title}</h5>
                <CloseButton
                    aria-label={
                        typeof cancelText === 'string' ? cancelText : 'Close'
                    }
                />
            </header>
            <div className="modal-body">{body}</div>
            <footer className="modal-footer">
                <Button type="reset" kind="secondary">
                    {cancelText}
                </Button>
                <Button type="submit" kind="primary">
                    {confirmText}
                </Button>
            </footer>
        </div>,
        classNames(
            'modal-dialog',
            scrollable && 'modal-dialog-scrollable',
            centered && 'modal-dialog-centered',
            size && `modal-${size}`
        )
    );
}
