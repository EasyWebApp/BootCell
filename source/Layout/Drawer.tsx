import classNames from 'classnames';
import { FC, WebCellProps } from 'web-cell';
import { uniqueID } from 'web-utility';

import { CloseButton } from '../Form/Button';
import { DialogController } from './DialogController';

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

export interface DrawerProps extends WebCellProps<HTMLDialogElement> {
    backdrop?: boolean | 'static';
    show?: boolean;
    onHide?: () => any;
}

export const Drawer: FC<DrawerProps> = ({
    className = '',
    style,
    backdrop = true,
    show,
    onHide,
    onClick,
    ref,
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
        data-bs-open={String(!!show)}
        {...DialogController.props(
            { show: !!show, modal: backdrop !== false },
            ref
        )}
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
    <Drawer {...{ ...props, onHide }} aria-labelledby={titleId}>
        <DrawerHeader {...{ closeButton, onHide }}>
            <DrawerTitle id={titleId}>{title}</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>{children}</DrawerBody>
    </Drawer>
);
