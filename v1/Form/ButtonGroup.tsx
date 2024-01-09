import { WebCellProps, createCell } from 'web-cell';
import classNames from 'classnames';

export interface ButtonGroupProps extends WebCellProps {
    size?: 'sm' | 'lg';
    vertical?: boolean;
}

export function ButtonGroup({
    vertical,
    size,
    className,
    defaultSlot,
    ...rest
}: ButtonGroupProps) {
    return (
        <div
            {...rest}
            className={classNames(
                `btn-group${vertical ? '-vertical' : ''}`,
                size && `btn-group-${size}`,
                className
            )}
            role="group"
        >
            {defaultSlot}
        </div>
    );
}

export function Toolbar({ className, defaultSlot, ...rest }: WebCellProps) {
    return (
        <div
            {...rest}
            className={classNames('btn-toolbar', className)}
            role="toolbar"
        >
            {defaultSlot}
        </div>
    );
}
