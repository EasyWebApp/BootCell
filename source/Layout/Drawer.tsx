import classNames from 'classnames';
import { action, observable } from 'mobx';
import {
    FC,
    WebCell,
    WebCellProps,
    attribute,
    component,
    observer,
    on
} from 'web-cell';
import { uniqueID } from 'web-utility';

import { BootstrapStyles } from '../BootstrapStyles';
import { CloseButton } from '../Form/Button';

export const DrawerTitle: FC<WebCellProps<HTMLHeadingElement>> = ({
    className = '',
    children,
    ...props
}) => (
    <h5 className={`drawer-title ${className}`} {...props}>
        {children}
    </h5>
);

export interface DrawerHeaderProps extends WebCellProps<HTMLDivElement> {
    closeButton?: boolean;
    onHide?: () => any;
}

export const DrawerHeader: FC<DrawerHeaderProps> = ({
    className = '',
    closeButton,
    children,
    onHide,
    ...props
}) => (
    <div className={`drawer-header ${className}`} {...props}>
        {children}

        {closeButton && (
            <CloseButton data-bs-dismiss="drawer" onClick={onHide} />
        )}
    </div>
);

export const DrawerBody: FC<WebCellProps<HTMLDivElement>> = ({
    className = '',
    children,
    ...props
}) => (
    <div className={`drawer-body ${className}`} {...props}>
        {children}
    </div>
);

export interface DrawerProps extends WebCellProps {
    backdrop?: boolean | 'static';
    show?: boolean;
    onHide?: (event: CustomEvent) => any;
}

export interface Drawer extends WebCell<DrawerProps> {}

@component({ tagName: 'drawer-box', mode: 'open' })
@observer
export class Drawer extends HTMLElement implements WebCell<DrawerProps> {
    @attribute
    @observable
    accessor backdrop: DrawerProps['backdrop'] = true;

    @attribute
    @observable
    accessor show = false;

    @attribute
    @observable
    accessor ariaLabelledby: string;

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
        if (event.target === dialog && this.backdrop === true) this.dismiss();
    }

    @on('click', '[data-bs-dismiss="drawer"]')
    handleDismiss() {
        this.dismiss();
    }

    @action
    dismiss = () => {
        this.show = false;
        this.emit('hide', undefined, { bubbles: true });
    };

    render() {
        const { backdrop, show } = this;

        return (
            <>
                <BootstrapStyles />
                <dialog
                    key="drawer"
                    className={classNames(
                        'drawer drawer-end',
                        backdrop === 'static' && 'drawer-static',
                        this.className
                    )}
                    style={{
                        '--drawer-backdrop-bg':
                            backdrop === false ? 'transparent' : undefined
                    }}
                    tabIndex={-1}
                    id={this.id}
                    aria-labelledby={this.ariaLabelledby}
                    data-bs-open={String(!!show)}
                    data-bs-backdrop={
                        backdrop === 'static'
                            ? 'static'
                            : backdrop === false
                              ? 'false'
                              : undefined
                    }
                    onCancel={event => {
                        event.preventDefault();
                        this.dismiss();
                    }}
                    onClose={() => {
                        if (!this.dialog.open && this.show) this.dismiss();
                    }}
                >
                    <slot />
                </dialog>
            </>
        );
    }
}

export interface DrawerBoxProps extends DrawerProps {
    title?: string;
    closeButton?: boolean;
    titleId?: string;
}

export const DrawerBox: FC<DrawerBoxProps> = ({
    title,
    titleId = uniqueID(),
    closeButton,
    onHide,
    children,
    ...props
}) => (
    <Drawer {...{ ...props, onHide }} ariaLabelledby={titleId}>
        <DrawerHeader {...{ closeButton }}>
            <DrawerTitle id={titleId}>{title}</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>{children}</DrawerBody>
    </Drawer>
);
