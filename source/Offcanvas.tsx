import { JsxProps } from 'dom-renderer';
import { FC } from 'web-cell';
import { uniqueID } from 'web-utility';

import { CloseButton } from './Button';

export const OffcanvasTitle: FC<JsxProps<HTMLHeadingElement>> = ({
    className = '',
    children,
    ...props
}) => (
    <h5 className={`offcanvas-title ${className}`} {...props}>
        {children}
    </h5>
);

export interface OffcanvasHeaderProps extends JsxProps<HTMLDivElement> {
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

export const OffcanvasBody: FC<JsxProps<HTMLDivElement>> = ({
    className = '',
    children,
    ...props
}) => (
    <div className={`offcanvas-body ${className}`} {...props}>
        {children}
    </div>
);

export interface OffcanvasProps extends JsxProps<HTMLDivElement> {
    backdrop?: boolean | 'static';
    show?: boolean;
}

export const Offcanvas: FC<OffcanvasProps> = ({
    className = '',
    backdrop = true,
    show,
    children,
    ...props
}) => (
    <>
        <div
            className={`offcanvas ${className} ${
                show ? 'offcanvas-end show' : 'offcanvas-start'
            }`}
            tabIndex={-1}
            {...(backdrop === 'static' ? { 'data-bs-backdrop': 'static' } : {})}
            {...props}
        >
            {children}
        </div>
        {show && <div className="offcanvas-backdrop show" />}
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
    children,
    ...props
}) => (
    <Offcanvas {...props} aria-labelledby={titleId}>
        <OffcanvasHeader closeButton={closeButton}>
            <OffcanvasTitle id={titleId}>{title}</OffcanvasTitle>
        </OffcanvasHeader>
        <OffcanvasBody>{children}</OffcanvasBody>
    </Offcanvas>
);
