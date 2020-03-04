import {
    WebCellProps,
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

export interface ModalDialogProps extends WebCellProps {
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

    private box: HTMLDialogElement;

    @attribute
    set open(value: boolean) {
        if (value) this.box.showModal();
        else this.box.close();
    }

    get open() {
        return this.box.open;
    }

    valueOf() {
        return Object.fromEntries([
            ...new FormData(this.box.firstElementChild as HTMLFormElement)
        ] as string[][]);
    }

    requestInput<D = { [key: string]: string }>() {
        const result = new Promise<D>((resolve, reject) => {
            this.box.addEventListener('close', () => resolve(this.valueOf()));
            this.box.addEventListener('cancel', reject);
        });

        this.open = true;

        return result;
    }

    render({
        size,
        defaultSlot,
        title,
        closeSlot,
        confirmSlot
    }: ModalDialogProps) {
        return (
            <dialog
                className={classNames(
                    style.dialog,
                    'modal-dialog',
                    size && `modal-${size}`
                )}
            >
                <form className="modal-content" method="dialog">
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
                    <div className="modal-body">{defaultSlot}</div>
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
