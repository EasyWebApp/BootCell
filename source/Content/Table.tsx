import classNames from 'classnames';
import { FC, WebCellProps } from 'web-cell';

import { ThemeColor, Size } from '../type';

export interface TableProps extends WebCellProps<HTMLTableElement> {
    variant?: ThemeColor;
    size?: 'sm';
    responsive?: boolean | Size;
    striped?: boolean | 'columns';
    hover?: boolean;
    bordered?: boolean;
    borderless?: boolean;
    caption?: 'top';
}

export const Table: FC<TableProps> = ({
    className,
    variant,
    size,
    responsive,
    striped,
    hover,
    bordered,
    borderless,
    caption,
    children,
    ...props
}) => {
    const table = (
        <table
            className={classNames(
                'table',
                variant && `theme-${variant}`,
                size && `table-${size}`,
                striped &&
                    `table-striped${striped === 'columns' ? '-columns' : ''}`,
                hover && 'table-hover',
                bordered && 'table-bordered',
                borderless && 'table-borderless',
                caption && `caption-${caption}`
            )}
            {...props}
        >
            {children}
        </table>
    );

    return responsive ? (
        <div
            className={
                responsive === true
                    ? 'table-responsive'
                    : `${responsive}:table-responsive`
            }
        >
            {table}
        </div>
    ) : (
        table
    );
};
