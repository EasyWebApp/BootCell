import { createCell, WebCellProps } from 'web-cell';

import { Table, TableRow } from '../Content/Table';
import style from './CalendarTable.less';

export const WeekDays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
];

export interface CalendarTableProps extends WebCellProps {
    weekDays?: string[];
}

export function CalendarTable({
    weekDays = WeekDays,
    defaultSlot,
    ...rest
}: CalendarTableProps) {
    return (
        <Table {...rest} border center className={style.table}>
            <TableRow type="head" className="bg-primary text-white">
                {weekDays.map(day => (
                    <th className="text-truncate">{day}</th>
                ))}
            </TableRow>

            {defaultSlot}
        </Table>
    );
}
