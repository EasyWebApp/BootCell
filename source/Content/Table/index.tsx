import { WebCellProps, VNode, createCell } from 'web-cell';
import type { HTMLTableCellProps, BaseFieldProps } from 'web-utility';
import { uniqueID } from 'web-utility/source/data';
import classNames from 'classnames';

import { CommonColors } from '../../utility/constant';
import { ToggleFieldProps } from '../../Form/ToggleField';
import { Field, FieldProps } from '../../Form/Field';

import style from './index.less';

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
    const [head, body, foot] = (defaultSlot as VNode[]).reduce(
        ([head, body, foot], node) => {
            if (typeof node === 'object')
                switch (node?.data.dataset?.type) {
                    case 'head':
                        head.push(node);
                        break;
                    case 'foot':
                        foot.push(node);
                        break;
                    default:
                        body.push(node);
                }
            return [head, body, foot];
        },
        [[], [], []] as VNode[][]
    );

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
                {head[0] && <thead>{head}</thead>}
                <tbody>{body}</tbody>
                {foot[0] && <tfoot>{foot}</tfoot>}
            </table>
        </div>
    );
}

declare global {
    interface HTMLElementEventMap {
        check: CustomEvent;
    }
}

export interface TableRowProps
    extends WebCellProps,
        Pick<ToggleFieldProps, 'name' | 'checked' | 'indeterminate'> {
    type?: 'head' | 'body' | 'foot';
    onCheck?: (event: CustomEvent) => any;
}

export function TableRow({
    type = 'body',
    checked,
    indeterminate,
    name = 'table-row',
    defaultSlot,
    ...rest
}: TableRowProps) {
    const Cell = type === 'head' ? 'th' : 'td',
        checkable =
            typeof checked === 'boolean' || typeof indeterminate === 'boolean';

    if (checkable && !rest.id) rest.id = uniqueID();

    return (
        <tr {...rest} data-type={type}>
            {!checkable ? null : (
                <Cell className={style['row-checker']}>
                    <Field
                        type="checkbox"
                        id={rest.id + '-check'}
                        name={name}
                        value={rest.id}
                        checked={checked}
                        indeterminate={indeterminate}
                        onClick={({ target }) =>
                            target.dispatchEvent(
                                new CustomEvent('check', { bubbles: true })
                            )
                        }
                    />
                </Cell>
            )}
            {defaultSlot}
        </tr>
    );
}

export interface InputCellProps
    extends WebCellProps,
        HTMLTableCellProps,
        BaseFieldProps {
    is?: FieldProps['is'];
    type?: FieldProps['type'];
}

export function InputCell({
    className,
    style,
    colSpan,
    rowSpan,
    is = 'input',
    type,
    defaultSlot,
    ...rest
}: InputCellProps) {
    const Class =
        'form-control border-left-0 border-right-0 border-top-0 rounded-0';

    return (
        <td {...{ className, style, colSpan, rowSpan }}>
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
