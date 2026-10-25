import { FC } from 'web-cell';

import { Table, TableProps } from '../Content/Table';

export const WeekDays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
] as const;

export interface CalendarTableProps extends TableProps {
    weekDays?: readonly string[];
}

export const CalendarTable: FC<CalendarTableProps> = ({
    weekDays = WeekDays,
    children,
    style,
    variant = 'primary',
    ...props
}) => (
    <Table bordered {...props} style={{ tableLayout: 'fixed', ...style }}>
        <thead>
            <tr className={variant && `theme-${variant}`}>
                {weekDays.map(day => (
                    <th scope="col" className="text-center text-truncate">
                        {day}
                    </th>
                ))}
            </tr>
        </thead>
        <tbody>{children}</tbody>
    </Table>
);
