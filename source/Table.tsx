import { createCell } from 'web-cell';
import classNames from 'classnames';

import style from './Table.less';

interface TableProps {
    theme?: string;
    center?: boolean;
    striped?: boolean;
    hover?: boolean;
    children?: any[];
}

export function Table({
    theme = 'light',
    center,
    striped,
    hover,
    children
}: TableProps) {
    return (
        <main
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
                {children}
            </table>
        </main>
    );
}
