import {
    VNodeChildElement,
    component,
    mixin,
    attribute,
    watch,
    createCell,
    Fragment
} from 'web-cell';
import {
    TimeData,
    Day,
    formatDate,
    changeMonth
} from 'web-utility/source/date';
import classNames from 'classnames';

import { IconButton } from '../../Form/Button';
import { Table } from '../../Content/Table';

import style from './index.less';
import { WeekDay } from './meta.json';

export interface CalendarProps {
    date?: TimeData;
    dateTemplate?: string;
    renderCell?: (date: Date) => VNodeChildElement;
}

interface CalendarState {
    dayGrid: number[][];
}

@component({
    tagName: 'calendar-view',
    renderTarget: 'children'
})
export class CalendarView extends mixin<CalendarProps, CalendarState>() {
    static WeekDay = WeekDay;

    state = {
        dayGrid: []
    };

    @attribute
    @watch
    set date(date: TimeData) {
        if (!(date instanceof Date)) date = new Date(date);

        this.setProps({ date });
        this.setState({ dayGrid: CalendarView.createDayGrid(date) });
    }

    @attribute
    @watch
    dateTemplate = 'YYYY-MM';

    @watch
    renderCell: CalendarProps['renderCell'];

    connectedCallback() {
        if (!this.date) this.date = new Date();
    }

    static createDayGrid(date: Date) {
        var start = new Date(date.getFullYear(), date.getMonth(), 1);

        var offset = start.getDay() - 1;

        if (offset < 0) offset = 7 + offset;

        if (offset) start = new Date(+start - Day * offset);

        return Array(42)
            .fill(0)
            .reduce((list: number[][], _, index) => {
                if (!(index % 7)) list.push([]);

                const row = Math.floor(index / 7);

                list[row].push(new Date(+start + Day * index).getDate());

                return list;
            }, []);
    }

    renderRow(row: number[], index: number) {
        const { date, renderCell } = this.props;

        return row.map(day => {
            const prev = !index && day > 14,
                next = index > 3 && day < 14;

            const outer = prev || next,
                today = new Date(
                    (date as Date).getFullYear(),
                    (date as Date).getMonth() + (prev ? -1 : next ? 1 : 0),
                    day
                );
            const sameDay =
                formatDate(date, 'YYYY-MM-DD') ===
                formatDate(today, 'YYYY-MM-DD');

            return (
                <td
                    className={classNames(
                        'p-3',
                        'p-sm-4',
                        outer
                            ? 'text-secondary bg-light'
                            : sameDay
                            ? 'bg-primary text-white'
                            : 'bg-white'
                    )}
                >
                    {!renderCell ? day : renderCell(today)}
                </td>
            );
        });
    }

    render({ date, dateTemplate }: CalendarProps, { dayGrid }: CalendarState) {
        return (
            <Fragment>
                <header className="d-flex justify-content-between align-items-center py-3">
                    <IconButton
                        name="chevron-left px-2"
                        onClick={() => (this.date = changeMonth(date, -1))}
                    />
                    <time className="font-weight-bold">
                        {formatDate(date, dateTemplate)}
                    </time>
                    <IconButton
                        name="chevron-right px-2"
                        onClick={() => (this.date = changeMonth(date, 1))}
                    />
                </header>
                <Table border center className={style.table}>
                    <thead>
                        <tr className="bg-primary text-white">
                            {CalendarView.WeekDay.map(day => (
                                <th className="text-truncate">{day}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {dayGrid.map((row, index) => (
                            <tr>{this.renderRow(row, index)}</tr>
                        ))}
                    </tbody>
                </Table>
            </Fragment>
        );
    }
}
