import { JsxChildren } from 'dom-renderer';
import { observable } from 'mobx';
import { WebCell, attribute, component, observer } from 'web-cell';

import { Badge } from '../Reminder/Badge';
import { DateData } from './MonthCalendar';
import { CalendarTable } from './CalendarTable';
import {
    TimeSlot,
    WeekCalendarModel,
    WeekCalendarOptions
} from './WeekCalendarModel';

export interface WeekCalendarProps extends WeekCalendarOptions {
    weekDays?: readonly string[];
    locale?: string;
    value?: DateData[];
    renderCell?: (date: Date, end: Date) => JsxChildren;
    onSelect?: (event: CustomEvent<DateData>) => void;
}

export interface WeekCalendar extends WebCell<WeekCalendarProps> {}

@component({ tagName: 'week-calendar' })
@observer
export class WeekCalendar
    extends HTMLElement
    implements WebCell<WeekCalendarProps>
{
    @observable accessor date = new Date();
    @observable accessor weekDays: readonly string[] | undefined;
    @observable accessor value: DateData[] = [];
    @observable accessor renderCell: WeekCalendarProps['renderCell'];
    @attribute @observable accessor locale: string;
    @attribute @observable accessor weekStartsOn = 1;
    @attribute @observable accessor startTime = '00:00';
    @attribute @observable accessor endTime = '24:00';
    @attribute @observable accessor hourInterval = 2;

    static hourDiff = WeekCalendarModel.hourDiff.bind(WeekCalendarModel);
    static createHourList =
        WeekCalendarModel.createHourList.bind(WeekCalendarModel);

    renderSlot = ({ start, end }: TimeSlot) => (
        <td className="p-3 align-top" data-date={start.toISOString()}>
            {this.renderCell?.(new Date(start), new Date(end))}
            {this.value
                .filter(
                    ({ date }) =>
                        +new Date(date) >= +start && +new Date(date) < +end
                )
                .map(item => (
                    <Badge
                        className="d-block text-truncate"
                        href={item.link}
                        onClick={() => this.emit('select', item)}
                    >
                        {item.content}
                    </Badge>
                ))}
        </td>
    );

    render() {
        if (this.weekDays && this.weekDays.length !== 7)
            throw new RangeError('weekDays must contain seven labels');
        const { days, rows } = new WeekCalendarModel(this),
            weekdays = new Intl.DateTimeFormat(this.locale, {
                weekday: 'long'
            }),
            time = new Intl.DateTimeFormat(this.locale, {
                hour: '2-digit',
                minute: '2-digit',
                hourCycle: 'h23'
            });
        return (
            <CalendarTable
                weekDays={[
                    '',
                    ...(this.weekDays || days.map(day => weekdays.format(day)))
                ]}
            >
                {rows.map(row => (
                    <tr>
                        <th scope="row" className="text-center align-middle">
                            {time.format(row[0].start)} ~{' '}
                            {time.format(row[0].end)}
                        </th>
                        {row.map(this.renderSlot)}
                    </tr>
                ))}
            </CalendarTable>
        );
    }
}
