import classNames from 'classnames';
import { FC, WebCellProps } from 'web-cell';
import { uniqueID } from 'web-utility';

import { ThemeColor, Size } from '../type';
import {
    FormCheck,
    FormControl,
    FormControlProps,
    FormControlTag
} from '../Form/Form';

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

export interface TableRowProps extends WebCellProps<HTMLTableRowElement> {
    type?: 'head' | 'body' | 'foot';
    checked?: boolean;
    indeterminate?: boolean;
    name?: string;
    onCheck?: (event: CustomEvent<{ checked: boolean; value: string }>) => void;
}

export const TableRow: FC<TableRowProps> = ({
    type = 'body',
    checked,
    indeterminate,
    name = 'table-row',
    id = uniqueID(),
    onCheck,
    children,
    ...props
}) => {
    const Cell = type === 'head' ? 'th' : 'td';
    return (
        <tr {...props} {...{ onCheck }} id={id} data-type={type}>
            {(checked !== undefined || indeterminate !== undefined) && (
                <Cell style={{ width: '1.5rem' }}>
                    <FormCheck
                        type="checkbox"
                        id={`${id}-check`}
                        name={name}
                        value={id}
                        checked={checked}
                        indeterminate={!!indeterminate}
                        ariaLabel={
                            type === 'head' ? 'Select all rows' : 'Select row'
                        }
                        onChange={event => {
                            const input = event.target as HTMLInputElement;
                            const change = new CustomEvent('check', {
                                bubbles: true,
                                detail: { checked: input.checked, value: id }
                            });
                            input.closest('tr')?.dispatchEvent(change);
                        }}
                    />
                </Cell>
            )}
            {children}
        </tr>
    );
};

export type InputCellProps<T extends FormControlTag = 'input'> =
    FormControlProps<T> & {
        cellProps?: WebCellProps<HTMLTableCellElement>;
        colSpan?: number;
        rowSpan?: number;
    };

export function InputCell<T extends FormControlTag = 'input'>({
    cellProps,
    colSpan,
    rowSpan,
    className,
    ...props
}: InputCellProps<T>) {
    return (
        <td {...cellProps} colSpan={colSpan} rowSpan={rowSpan}>
            <FormControl<T>
                {...(props as FormControlProps<T>)}
                className={classNames(
                    'border-start-0 border-end-0 border-top-0 rounded-0',
                    className
                )}
            />
        </td>
    );
}
