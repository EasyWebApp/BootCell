import classNames from 'classnames';
import { FC, WebCellProps } from 'web-cell';

import { CloseButton } from '../Form/Button';
import { TextColor } from '../type';

export interface AlertProps extends WebCellProps {
    variant?: TextColor;
    title?: string;
    dismissible?: boolean;
    show?: boolean;
    onClose?: (event: MouseEvent) => any;
}

export const Alert: FC<AlertProps> = ({
    className,
    variant = 'primary',
    title,
    children,
    show = true,
    dismissible,
    onClose
}) => (
    <aside
        className={classNames(
            'alert',
            `alert-${variant}`,
            { 'alert-dismissible fade': dismissible, show },
            className
        )}
        role="alert"
    >
        {title && <h4 className="alert-heading">{title}</h4>}

        {children}

        {dismissible && <CloseButton onClick={onClose} />}
    </aside>
);

export type AlertLinkProps = WebCellProps<HTMLAnchorElement>;

export const AlertLink: FC<AlertLinkProps> = ({
    className = '',
    children,
    ...props
}) => (
    <a className={`alert-link ${className}`} {...props}>
        {children}
    </a>
);
