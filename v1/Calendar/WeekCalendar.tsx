import {
    WebCellProps,
    VNodeChildElement,
    component,
    mixin,
    watch,
    attribute,
    createCell
} from 'web-cell';
import { Hour, formatDate } from 'web-utility/source/date';

import { CalendarTableProps, WeekDays, CalendarTable } from './CalendarTable';

export interface WeekCalendarProps extends WebCellProps {
    weekDays?: CalendarTableProps['weekDays'];
    startTime?: string;
    endTime?: string;
    hourInterval?: number;
    renderCell?: (date: Date) => VNodeChildElement;
}

@component({
    tagName: 'week-calendar',
    renderTarget: 'children'
})
export class WeekCalendar extends mixin<WeekCalendarProps>() {
    @watch
    weekDays = WeekDays;

    @attribute
    @watch
    startTime = '00:00';

    @attribute
    @watch
    endTime = '24:00';

    @attribute
    @watch
    hourInterval = 2;

    @watch
    renderCell: WeekCalendarProps['renderCell'];

    static hourDiff(start: string, end: string) {
        return (
            (+new Date(`1989-06-04 ${end}`) -
                +new Date(`1989-06-04 ${start}`)) /
            Hour
        );
    }

    static createHourList(
        startTime = '00:00',
        endTime = '24:00',
        hourInterval = 2
    ) {
        const today = formatDate(new Date(), 'YYYY-MM-DD');

        return Array.from(
            new Array(WeekCalendar.hourDiff(startTime, endTime) / hourInterval),
            (_, index) =>
                new Date(
                    +new Date(`${today} ${startTime}`) +
                        index * hourInterval * Hour
                )
        );
    }

    render({
        weekDays,
        startTime,
        endTime,
        hourInterval,
        renderCell
    }: WeekCalendarProps) {
        const hours = WeekCalendar.createHourList(
            startTime,
            endTime,
            hourInterval
        );

        return (
            <CalendarTable weekDays={['', ...weekDays]}>
                {hours.map((hour, index, list) => (
                    <tr>
                        <th>
                            {formatDate(hour, 'HH:mm')}
                            <div>~</div>
                            {index + 1 !== list.length
                                ? formatDate(list[index + 1], 'HH:mm')
                                : endTime}
                        </th>
                        {Array.from(new Array(7), () => (
                            <td className="p-3 p-sm-4">{renderCell?.(hour)}</td>
                        ))}
                    </tr>
                ))}
            </CalendarTable>
        );
    }
}
