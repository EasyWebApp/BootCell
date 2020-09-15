import { WebCellProps, createCell } from 'web-cell';
import { TableCellProps, BaseFieldProps } from 'web-utility/source/DOM-type';
import classNames from 'classnames';

import { CommonColors } from '../utility/constant';
import { FieldProps } from '../Form/Field';

import style from './Table.less';

export interface TableProps extends WebCellProps {
    theme?: CommonColors;
    center?: boolean;
    border?: boolean;
    striped?: boolean;
    hover?: boolean;
    small?: boolean;
    responsive?: '' | 'sm' | 'md' | 'lg' | 'xl';
}

export function Table({
    className,
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
            className={classNames(
                `table-responsive${responsive && '-' + responsive}`,
                className
            )}
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

export interface InputCellProps extends TableCellProps, BaseFieldProps {
    is?: FieldProps['is'];
    type?: FieldProps['type'];
}

export function InputCell({
    className,
    colSpan,
    rowspan,
    is = 'input',
    type,
    defaultSlot,
    ...rest
}: InputCellProps) {
    const Class =
        'form-control border-left-0 border-right-0 border-top-0 rounded-0';

    return (
        <td colSpan={colSpan} rowspan={rowspan} className={className}>
            {is === 'input' ? (
                <input {...rest} type={type} className={Class} />
            ) : is === 'select' ? (
                <select {...rest} className={Class}>
                    {defaultSlot}
                </select>
            ) : (
                <textarea {...rest} className={Class} />
            )}
        </td>
    );
}
