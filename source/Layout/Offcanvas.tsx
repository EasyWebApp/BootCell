import classNames from 'classnames';
import { FC, WebCellProps } from 'web-cell';
import { uniqueID } from 'web-utility';

import { CloseButton } from '../Form/Button';

export const OffcanvasTitle: FC<WebCellProps<HTMLHeadingElement>> = ({
    className = '',
    children,
    ...props
}) => (
    <h5 className={`offcanvas-title ${className}`} {...props}>
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
    <div className={`offcanvas-header ${className}`} {...props}>
        {children}

        {closeButton && <CloseButton onClick={onHide} />}
    </div>
);

export const OffcanvasBody: FC<WebCellProps<HTMLDivElement>> = ({
    className = '',
    children,
    ...props
}) => (
    <div className={`offcanvas-body ${className}`} {...props}>
        {children}
    </div>
);

export interface OffcanvasProps
    extends Omit<OffcanvasHeaderProps, 'closeButton'> {
    backdrop?: boolean | 'static';
    show?: boolean;
}

export const Offcanvas: FC<OffcanvasProps> = ({
    className = '',
    style,
    backdrop = true,
    show,
    onHide,
    children,
    ...props
}) => (
    <>
        <div
            className={classNames(
                'offcanvas',
                show ? 'offcanvas-end show' : 'offcanvas-start',
                className
            )}
            style={{ maxWidth: '75vw', ...style }}
            tabIndex={-1}
            {...(backdrop === 'static' ? { 'data-bs-backdrop': 'static' } : {})}
            {...props}
        >
            {children}
        </div>

        {show && <div className="offcanvas-backdrop show" onClick={onHide} />}
    </>
);

export interface OffcanvasBoxProps
    extends OffcanvasProps,
        OffcanvasHeaderProps {
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
