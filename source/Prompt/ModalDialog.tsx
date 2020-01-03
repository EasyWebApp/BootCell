import {
    VNodeChildElement,
    component,
    mixin,
    watch,
    attribute,
    createCell
} from 'web-cell';
import classNames from 'classnames';

import { Button } from '../Form/Button';

import style from './ModalDialog.less';

export interface ModalDialogProps {
    title?: VNodeChildElement;
    closeSlot?: VNodeChildElement;
    confirmSlot?: VNodeChildElement;
    size?: 'sm' | 'lg' | 'xl';
    open?: boolean;
}

@component({
    tagName: 'modal-dialog',
    renderTarget: 'children'
})
export class ModalDialog extends mixin<ModalDialogProps>() {
    @attribute
    @watch
    title = '';

    @attribute
    @watch
    closeSlot = 'Close';

    @attribute
    @watch
    confirmSlot = 'Confirm';

    @attribute
    @watch
    size = '';

    @attribute
    set open(value: boolean) {
        const dialog = this.firstElementChild as HTMLDialogElement;

        if (dialog)
            if (value) dialog.showModal();
            else dialog.close();

        this.setProps({ open: value });
    }

    get open() {
        return this.props.open;
    }

    async requestInput() {
        const dialog = this.firstElementChild as HTMLDialogElement;

        const closed = new Promise((resolve, reject) => {
            dialog.addEventListener('close', ({ returnValue }) =>
                resolve(returnValue)
            );
            dialog.addEventListener('cancel', reject);
        });

        this.open = true;

        const value = await closed;

        await this.setProps({ open: false });

        return value;
    }

    handleSubmit = (event: Event) => {
        event.preventDefault(), event.stopPropagation();

        const dialog = this.firstElementChild as HTMLDialogElement,
            form = new FormData(event.target as HTMLFormElement);

        dialog.close(new URLSearchParams(Array.from(form) as string[][]) + '');

        return this.setProps({ open: false });
    };

    render({ title, closeSlot, confirmSlot, size }: ModalDialogProps) {
        return (
            <dialog
                className={classNames(
                    style.dialog,
                    'modal-dialog',
                    size && `modal-${size}`
                )}
            >
                <form
                    className="modal-content"
                    method="dialog"
                    onReset={() => (this.open = false)}
                    onSubmit={this.handleSubmit}
                >
                    <header className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button
                            type="reset"
                            className="close"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </header>
                    <div className="modal-body">{this.defaultSlot}</div>
                    <footer className="modal-footer">
                        <Button type="reset" kind="secondary">
                            {closeSlot}
                        </Button>
                        <Button type="submit" kind="primary">
                            {confirmSlot}
                        </Button>
                    </footer>
                </form>
            </dialog>
        );
    }
}
