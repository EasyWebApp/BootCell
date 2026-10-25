import classNames from 'classnames';
import { FC, WebCellProps } from 'web-cell';
import { uniqueID } from 'web-utility';

import { CloseButton } from '../Form/Button';

export const OffcanvasTitle: FC<WebCellProps<HTMLHeadingElement>> = ({
    className = '',
    children,
    ...props
}) => (
    <h5 className={`drawer-title ${className}`} {...props}>
        {children}
    </h5>
);

export interface OffcanvasHeaderProps extends WebCellProps<HTMLDivElement> {
    closeButton?: boolean;
    onHide?: () => any;
}

export const OffcanvasHeader: FC<OffcanvasHeaderProps> = ({
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

export const OffcanvasBody: FC<WebCellProps<HTMLDivElement>> = ({
    className = '',
    children,
    ...props
}) => (
    <div className={`drawer-body ${className}`} {...props}>
        {children}
    </div>
);

export interface OffcanvasProps extends WebCellProps<HTMLDialogElement> {
    backdrop?: boolean | 'static';
    show?: boolean;
    onHide?: () => any;
}

export const Offcanvas: FC<OffcanvasProps> = ({
    className = '',
    style,
    backdrop = true,
    show,
    onHide,
    onClick,
    children,
    ...props
}) => (
    <dialog
        className={classNames('drawer drawer-end', className)}
        style={{
            '--drawer-backdrop-bg':
                backdrop === false ? 'transparent' : undefined,
            ...style
        }}
        tabIndex={-1}
        ref={node => {
            if (!node) return;

            const dialog = node as HTMLDialogElement;

            if (show && !dialog.open)
                backdrop === false && typeof dialog.show === 'function'
                    ? dialog.show()
                    : typeof dialog.showModal === 'function'
                      ? dialog.showModal()
                      : (dialog.open = true);
            else if (!show && dialog.open) dialog.close();
        }}
        data-bs-backdrop={
            backdrop === 'static'
                ? 'static'
                : backdrop === false
                  ? 'false'
                  : undefined
        }
        onCancel={() => onHide?.()}
        onClick={event => {
            onClick?.(event);

            if (event.target === event.currentTarget && backdrop === true)
                onHide?.();
        }}
        {...props}
    >
        {children}
    </dialog>
);

export interface OffcanvasBoxProps extends OffcanvasProps {
    title?: string;
    closeButton?: boolean;
    titleId?: string;
}

export const OffcanvasBox: FC<OffcanvasBoxProps> = ({
    title,
    titleId = uniqueID(),
    closeButton,
    onHide,
    children,
    ...props
}) => (
    <Offcanvas {...{ ...props, onHide }} aria-labelledby={titleId}>
        <OffcanvasHeader {...{ closeButton, onHide }}>
            <OffcanvasTitle id={titleId}>{title}</OffcanvasTitle>
        </OffcanvasHeader>
        <OffcanvasBody>{children}</OffcanvasBody>
    </Offcanvas>
);
