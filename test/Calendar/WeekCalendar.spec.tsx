import { expect } from 'expect';
import { runInAction } from 'mobx';
import { describe, it } from 'node:test';

import { CalendarTable } from '../../source/Calendar/CalendarTable';
import { WeekCalendar } from '../../source/Calendar/WeekCalendar';
import { WeekCalendarModel } from '../../source/Calendar/WeekCalendarModel';
import { render } from '../render';

describe('WeekCalendar', () => {
    it('renders seven distinct local dates and time slots', () => {
        const calendar = new WeekCalendar();
        runInAction(() => {
            calendar.date = new Date(2024, 1, 15);
            calendar.startTime = '08:00';
            calendar.endTime = '09:30';
            calendar.hourInterval = 1;
            calendar.locale = 'en-US';
        });
        const dates: Date[] = [];
        calendar.renderCell = date => {
            dates.push(date);
            return date.getDate();
        };
        const root = render(calendar.render());
        expect(root.querySelectorAll('tbody tr')).toHaveLength(2);
        expect(root.querySelectorAll('tbody td')).toHaveLength(14);
        expect(dates.slice(0, 7).map(date => date.getDate())).toEqual([
            12, 13, 14, 15, 16, 17, 18
        ]);
        expect(dates[7].getHours()).toBe(9);
        expect(root.querySelector('tbody tr:last-child th').textContent).toBe(
            '09:00 ~ 09:30'
        );
    });

    it('validates time ranges, intervals and week configuration', () => {
        for (const options of [
            { hourInterval: 0 },
            { hourInterval: -1 },
            { hourInterval: Infinity },
            { startTime: '24:01' },
            { endTime: '12:60' },
            { startTime: '12:00', endTime: '08:00' },
            { weekStartsOn: 7 },
            { date: new Date(NaN) }
        ])
            expect(() => new WeekCalendarModel(options)).toThrow(RangeError);
        expect(WeekCalendar.hourDiff('08:30', '24:00')).toBe(15.5);
        expect(WeekCalendar.createHourList('08:00', '10:30', 1)).toHaveLength(
            3
        );
    });

    it('keeps local midnight across a year boundary and accepts a Sunday week', () => {
        const model = new WeekCalendarModel({
            date: new Date(2025, 0, 1),
            weekStartsOn: 0
        });
        expect(model.days[0]).toEqual(new Date(2024, 11, 29));
        expect(model.days[6]).toEqual(new Date(2025, 0, 4));
        expect(model.rows.at(-1)[0].end).toEqual(new Date(2024, 11, 30));
    });

    it('renders entries only in their actual date and slot and emits selection', () => {
        const calendar = new WeekCalendar();
        const item = { date: new Date(2024, 1, 15, 8, 30), content: 'Meeting' };
        runInAction(() => {
            calendar.date = new Date(2024, 1, 15);
            calendar.startTime = '08:00';
            calendar.endTime = '10:00';
            calendar.value = [item];
        });
        let selected: unknown;
        calendar.addEventListener('select', (event: CustomEvent) => {
            selected = event.detail;
        });
        const root = render(calendar.render());
        expect(root.querySelectorAll('.badge')).toHaveLength(1);
        root.querySelector<HTMLElement>('.badge').click();
        expect(selected).toEqual(item);
    });

    it('uses proper table sections for a standalone calendar table', () => {
        const root = render(
            <CalendarTable>
                <tr>
                    <td>Event</td>
                </tr>
            </CalendarTable>
        );
        expect(root.querySelectorAll('thead th')).toHaveLength(7);
        expect(root.querySelector('tbody td').textContent).toBe('Event');
    });
});
