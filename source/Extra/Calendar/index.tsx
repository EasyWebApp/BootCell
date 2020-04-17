import {
    VNodeChildElement,
    component,
    mixin,
    attribute,
    watch,
    createCell,
    Fragment
} from 'web-cell';
import { TimeData, Day, changeMonth } from 'web-utility/source/date';

import { IconButton } from '../../Form/Button';
import { Table } from '../../Content/Table';

import { WeekDay } from './meta.json';

export interface CalendarProps {
    date?: Date;
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

        return (
            <tr>
                {row.map(day => {
                    const prev = !index && day > 14,
                        next = index > 3 && day < 14;

                    const outer = prev || next;

                    return (
                        <td className={outer ? 'text-secondary bg-light' : ''}>
                            {!renderCell
                                ? day
                                : renderCell(
                                      new Date(
                                          date.getFullYear(),
                                          date.getMonth() +
                                              (prev ? -1 : next ? 1 : 0),
                                          day
                                      )
                                  )}
                        </td>
                    );
                })}
            </tr>
        );
    }

    render({ date }: CalendarProps, { dayGrid }: CalendarState) {
        return (
            <Fragment>
                <header className="d-flex justify-content-between align-items-center py-3">
                    <IconButton
                        name="chevron-left"
                        onClick={() => (this.date = changeMonth(this.date, -1))}
                    />
                    <time className="font-weight-bold">
                        <span>{date?.getFullYear()}</span>-
                        <span>{date?.getMonth() + 1}</span>
                    </time>
                    <IconButton
                        name="chevron-right"
                        onClick={() => (this.date = changeMonth(this.date, 1))}
                    />
                </header>
                <Table border center>
                    <thead>
                        <tr className="bg-primary">
                            {CalendarView.WeekDay.map(day => (
                                <th>{day}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {dayGrid.map((row, index) =>
                            this.renderRow(row, index)
                        )}
                    </tbody>
                </Table>
            </Fragment>
        );
    }
}
