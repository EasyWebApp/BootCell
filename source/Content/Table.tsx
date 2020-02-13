import { createCell } from 'web-cell';
import classNames from 'classnames';
import {
    HTMLProps,
    WebCellProps,
    Status,
    Theme,
    BaseFieldProps
} from '../utility';

import style from './Table.less';

export interface TableProps extends HTMLProps, WebCellProps {
    theme?: keyof typeof Status | keyof typeof Theme;
    center?: boolean;
    border?: boolean;
    striped?: boolean;
    hover?: boolean;
    small?: boolean;
    responsive?: '' | 'sm' | 'md' | 'lg' | 'xl';
}

export function Table({
    theme,
    center,
    border,
    striped,
    hover,
    small,
    responsive = '',
    defaultSlot,
    ...rest
}: TableProps) {
    return (
        <div
            {...rest}
            className={`table-responsive${responsive && '-' + responsive}`}
        >
            <table
                className={classNames(
                    'table',
                    theme && `table-${theme}`,
                    border != null &&
                        (border ? 'table-bordered' : 'table-borderless'),
                    striped && 'table-striped',
                    hover && 'table-hover',
                    small && 'table-sm',
                    style.table,
                    center && style['cell-center']
                )}
            >
                {defaultSlot}
            </table>
        </div>
    );
}

export interface TableCellProps {
    colSpan?: number;
    rowSpan?: number;
}

export type InputCellProps = TableCellProps & BaseFieldProps;

export function InputCell({
    colSpan,
    rowspan,
    defaultSlot,
    ...rest
}: InputCellProps) {
    return (
        <td colSpan={colSpan} rowspan={rowspan}>
            <input
                className="form-control border-left-0 border-right-0 border-top-0 rounded-0"
                {...rest}
            />
        </td>
    );
}
