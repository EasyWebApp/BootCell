import classNames from 'classnames';
import { FC, WebCellProps } from 'web-cell';

import { Size } from '../type';

export interface ModalProps extends WebCellProps<HTMLDialogElement> {
    backdrop?: 'static' | boolean;
    size?: 'sm' | 'lg' | 'xl';
    fullscreen?: true | `${Size}-down`;
    centered?: boolean;
    scrollable?: boolean;
    animation?: boolean;
    show?: boolean;
}

const emitHideByClick = ({ currentTarget }: MouseEvent) =>
    (currentTarget as HTMLElement)
        .closest('.dialog')
        .dispatchEvent(new CustomEvent('hide'));

export const Modal: FC<ModalProps> = ({
    className,
    backdrop,
    size,
    fullscreen,
    centered,
    scrollable,
    animation,
    show,
    ref,
    children,
    ...props
}) => (
    <dialog
        className={classNames(
            'dialog',
            !animation && 'dialog-instant',
            size && `dialog-${size}`,
            fullscreen &&
                `${
                    fullscreen === true ? '' : `${fullscreen}:`
                }dialog-fullscreen`,
            scrollable && 'dialog-scrollable',
            className
        )}
        data-bs-backdrop={backdrop != null ? backdrop + '' : undefined}
        tabIndex={-1}
        ariaHidden={!show + ''}
        ref={node => {
            if (!node) return;

            const dialog = node as HTMLDialogElement;

            if (show && !dialog.open) dialog.showModal();
            else if (!show && dialog.open) dialog.close();
        }}
        onCancel={event => {
            event.preventDefault();
            event.currentTarget.dispatchEvent(new CustomEvent('hide'));
        }}
        {...props}
    >
        {children}
    </dialog>
);

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
                data-bs-dismiss="dialog"
                ariaLabel="Close"
                onClick={emitHideByClick}
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
