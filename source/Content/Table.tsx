import { createCell } from 'web-cell';
import classNames from 'classnames';
import { HTMLProps } from '../utility';

import style from './Table.less';

export interface TableProps extends HTMLProps {
    theme?: string;
    center?: boolean;
    striped?: boolean;
    hover?: boolean;
    defaultSlot?: any[];
}

export function Table({
    theme = 'light',
    center,
    striped,
    hover,
    defaultSlot,
    ...rest
}: TableProps) {
    return (
        <div
            {...rest}
            className={classNames(
                'table-responsive',
                `table-${theme}`,
                striped && 'table-striped',
                hover && 'table-hover'
            )}
        >
            <table
                className={classNames(
                    'table',
                    style.table,
                    center && style['cell-center']
                )}
            >
                {defaultSlot}
            </table>
        </div>
    );
}
