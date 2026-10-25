import classNames from 'classnames';
import { FC, WebCellProps } from 'web-cell';

import { TextColor, Size } from '../type';

export interface TableProps extends WebCellProps<HTMLTableElement> {
    variant?: TextColor;
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
                variant && `table-${variant}`,
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
                    : `${responsive === 'xxl' ? '2xl' : responsive}:table-responsive`
            }
        >
            {table}
        </div>
    ) : (
        table
    );
};
