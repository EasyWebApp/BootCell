import classNames from 'classnames';
import { FC, WebCellProps } from 'web-cell';

import { Size } from '../type';

export interface ModalProps extends WebCellProps<HTMLDivElement> {
    backdrop?: 'static' | boolean;
    size?: 'sm' | 'lg' | 'xl';
    fullscreen?: true | `${Size}-down`;
    centered?: boolean;
    scrollable?: boolean;
    animation?: boolean;
    show?: boolean;
}

function emitHide(event: Event) {
    if (
        event.type === 'keyup'
            ? (event as KeyboardEvent).key === 'Escape'
            : event.type === 'click' &&
              (event.currentTarget as HTMLElement).className === 'btn-close'
    )
        (event.currentTarget as HTMLElement)
            .closest('.modal')
            .dispatchEvent(new CustomEvent('hide'));
}

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
    <div
        className={classNames('modal', { fade: animation, show }, className)}
        data-bs-backdrop={backdrop != null ? backdrop + '' : undefined}
        tabIndex={-1}
        ariaHidden={!show + ''}
        ref={node =>
            node
                ? globalThis.addEventListener?.('keyup', emitHide)
                : globalThis.removeEventListener?.('keyup', emitHide)
        }
        {...props}
    >
        <div
            className={classNames(
                'modal-dialog',
                size && `modal-${size}`,
                fullscreen &&
                    `modal-fullscreen${fullscreen === true ? '' : `-${fullscreen}`}`,
                centered && 'modal-dialog-centered',
                scrollable && 'modal-dialog-scrollable'
            )}
        >
            <div className="modal-content">{children}</div>
        </div>
    </div>
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
    <div className={`modal-header ${className}`} {...props}>
        {children}

        {closeButton && (
            <button
                type="button"
                className="btn-close"
                ariaLabel="Close"
                onClick={emitHide}
            />
        )}
    </div>
);

export type ModalTitleProps = WebCellProps<HTMLHeadingElement>;

export const ModalTitle: FC<ModalTitleProps> = ({
    className = 'fs-5',
    children,
    ...props
}) => (
    <h1 className={`modal-title ${className}`} {...props}>
        {children}
    </h1>
);

export type ModalBodyProps = WebCellProps<HTMLDivElement>;

export const ModalBody: FC<ModalBodyProps> = ({
    className = '',
    children,
    ...props
}) => (
    <div className={`modal-body ${className}`} {...props}>
        {children}
    </div>
);

export type ModalFooterProps = WebCellProps<HTMLDivElement>;

export const ModalFooter: FC<ModalFooterProps> = ({
    className = '',
    children,
    ...props
}) => (
    <div className={`modal-footer ${className}`} {...props}>
        {children}
    </div>
);
