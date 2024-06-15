import classNames from 'classnames';
import { FC, WebCellProps } from 'web-cell';

export interface CollapseProps extends WebCellProps<HTMLElement> {
    dimension?: 'width' | 'height';
    in?: boolean;
}

export const Collapse: FC<CollapseProps> = ({
    className,
    dimension = 'width',
    in: show,
    children,
    ...props
}) => (
    <div
        className={classNames(
            'collapse',
            { 'collapse-horizontal': dimension === 'height', show },
            className
        )}
        {...props}
    >
        {children}
    </div>
);
