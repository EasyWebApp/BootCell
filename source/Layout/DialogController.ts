import { WebCellProps } from 'web-cell';

type DialogState = Record<'show' | 'modal', boolean>;

/** Synchronizes native dialogs on every render, not only the insertion ref. */
export class DialogController {
    private modal?: boolean;

    constructor(private readonly dialog: HTMLDialogElement) {}

    sync({ show, modal }: DialogState) {
        const { dialog } = this;

        if (
            dialog.open &&
            (!show || (this.modal !== undefined && this.modal !== modal))
        )
            dialog.close();

        if (show && !dialog.open) {
            if (modal) dialog.showModal();
            else dialog.show();
        }
        this.modal = modal;
    }

    static props(
        state: DialogState,
        ref?: WebCellProps<HTMLDialogElement>['ref']
    ) {
        return {
            dialogState: state,
            ref: (node?: Node) => {
                if (node instanceof HTMLDialogElement) {
                    const controller = new DialogController(node);

                    Object.defineProperty(node, 'dialogState', {
                        configurable: true,
                        set: (value: DialogState) => controller.sync(value)
                    });
                    controller.sync(state);
                }
                ref?.(node);
            }
        };
    }
}
