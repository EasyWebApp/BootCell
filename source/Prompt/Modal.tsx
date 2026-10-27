import classNames from 'classnames';
import { observable } from 'mobx';
import {
    FC,
    WebCell,
    WebCellProps,
    attribute,
    component,
    observer,
    on
} from 'web-cell';

import { BootstrapStyles } from '../BootstrapStyles';
import { Size } from '../type';

export interface ModalProps extends WebCellProps {
    backdrop?: 'static' | boolean;
    size?: 'sm' | 'lg' | 'xl';
    fullscreen?: true | `${Size}-down`;
    scrollable?: boolean;
    animation?: boolean;
    keyboard?: boolean;
    show?: boolean;
    onHide?: (event: CustomEvent) => any;
}

export interface Modal extends WebCell<ModalProps> {}

@component({ tagName: 'modal-box', mode: 'open' })
@observer
export class Modal extends HTMLElement implements WebCell<ModalProps> {
    @attribute
    @observable
    accessor backdrop: ModalProps['backdrop'] = true;

    @attribute
    @observable
    accessor size: ModalProps['size'];

    @attribute
    @observable
    accessor fullscreen: ModalProps['fullscreen'];

    @attribute
    @observable
    accessor scrollable = false;

    @attribute
    @observable
    accessor animation = true;

    @attribute
    @observable
    accessor keyboard = true;

    @attribute
    @observable
    accessor ariaLabelledby: string;

    @attribute
    @observable
    accessor show = false;

    private currentModal?: boolean;

    get dialog() {
        return this.shadowRoot?.querySelector('dialog');
    }

    updatedCallback() {
        const dialog = this.dialog;

        if (!dialog) return;

        const { show, backdrop } = this,
            modal = backdrop !== false;

        if (
            dialog.open &&
            (!show ||
                (this.currentModal !== undefined &&
                    this.currentModal !== modal))
        )
            dialog.close();

        if (show && !dialog.open) {
            if (modal) dialog.showModal();
            else dialog.show();
        }
        this.currentModal = modal;
    }

    @on('click', 'dialog')
    handleBackdropClick(event: MouseEvent, dialog: HTMLDialogElement) {
        if (event.target === dialog && this.backdrop === true)
            this.emit('hide', undefined, { bubbles: true });
    }

    @on('click', '[data-bs-dismiss="modal"]')
    handleDismiss() {
        this.emit('hide', undefined, { bubbles: true });
    }

    render() {
        const {
            backdrop,
            size,
            fullscreen,
            scrollable,
            animation,
            show,
            keyboard
        } = this;

        return (
            <>
                <BootstrapStyles />
                <dialog
                    key="modal"
                    className={classNames(
                        'dialog',
                        !animation && 'dialog-instant',
                        backdrop === 'static' && 'dialog-static',
                        backdrop === false && 'dialog-nonmodal',
                        size && `dialog-${size}`,
                        fullscreen &&
                            `${
                                fullscreen === true ? '' : `${fullscreen}:`
                            }dialog-fullscreen`,
                        scrollable && 'dialog-scrollable',
                        this.className
                    )}
                    data-bs-backdrop={backdrop + ''}
                    data-bs-open={String(!!show)}
                    aria-hidden={!show + ''}
                    aria-labelledby={this.ariaLabelledby}
                    id={this.id}
                    tabIndex={-1}
                    onCancel={event => {
                        if (!keyboard) event.preventDefault();
                        else this.emit('hide', undefined, { bubbles: true });
                    }}
                >
                    <slot />
                </dialog>
            </>
        );
    }
}

export interface ModalHeaderProps extends WebCellProps<HTMLDivElement> {
    closeButton?: boolean;
}

export const ModalHeader: FC<ModalHeaderProps> = ({
    className = '',
    children,
    closeButton,
    ...props
}) => (
    <div className={`dialog-header ${className}`} {...props}>
        {children}

        {closeButton && (
            <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                ariaLabel="Close"
            />
        )}
    </div>
);

export type ModalTitleProps = WebCellProps<HTMLHeadingElement>;

export const ModalTitle: FC<ModalTitleProps> = ({
    className = 'fs-lg',
    children,
    ...props
}) => (
    <h1 className={`dialog-title ${className}`} {...props}>
        {children}
    </h1>
);

export type ModalBodyProps = WebCellProps<HTMLDivElement>;

export const ModalBody: FC<ModalBodyProps> = ({
    className = '',
    children,
    ...props
}) => (
    <div className={`dialog-body ${className}`} {...props}>
        {children}
    </div>
);

export type ModalFooterProps = WebCellProps<HTMLDivElement>;

export const ModalFooter: FC<ModalFooterProps> = ({
    className = '',
    children,
    ...props
}) => (
    <div className={`dialog-footer ${className}`} {...props}>
        {children}
    </div>
);
