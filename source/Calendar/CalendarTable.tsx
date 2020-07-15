import { createCell, WebCellProps } from 'web-cell';

import { Table } from '../Content/Table';
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
    defaultSlot
}: CalendarTableProps) {
    return (
        <Table border center className={style.table}>
            <thead>
                <tr className="bg-primary text-white">
                    {weekDays.map(day => (
                        <th className="text-truncate">{day}</th>
                    ))}
                </tr>
            </thead>
            <tbody>{defaultSlot}</tbody>
        </Table>
    );
}
