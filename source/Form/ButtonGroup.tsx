import classNames from 'classnames';
import { FC, WebCellProps } from 'web-cell';

export interface ButtonGroupProps extends WebCellProps<HTMLDivElement> {
    vertical?: boolean;
    size?: 'sm' | 'lg';
}

export const ButtonGroup: FC<ButtonGroupProps> = ({
    className = '',
    vertical,
    size,
    children,
    ...props
}) => (
    <div
        className={classNames(
            `btn-group${vertical ? '-vertical' : ''}`,
            size && `btn-group-${size}`,
            className
        )}
        role="group"
        {...props}
    >
        {children}
    </div>
);

export type ButtonToolbarProps = WebCellProps<HTMLDivElement>;

export const ButtonToolbar: FC<ButtonToolbarProps> = ({
    className = '',
    children,
    ...props
}) => (
    <div className={`btn-toolbar ${className}`} role="toolbar" {...props}>
        {children}
    </div>
);
