import { expect } from 'expect';
import { fn } from 'jest-mock';
import { runInAction } from 'mobx';
import { describe, it } from 'node:test';

import { DateData, MonthCalendar } from '../../source/Calendar/MonthCalendar';
import { render } from '../render';

function calendar() {
    const calendar = new MonthCalendar();

    runInAction(() => {
        calendar.currentDate = new Date(2024, 1, 15);
        calendar.locale = 'en-US';
    });
    return calendar;
}

describe('MonthCalendar', () => {
    it('should produce six complete weeks including a leap day', () => {
        const grid = calendar().dateGrid;

        expect(grid).toHaveLength(6);
        expect(grid.every(week => week.length === 7)).toBe(true);
        expect(grid[0][0]).toEqual(new Date(2024, 0, 28));
        expect(grid[4][4]).toEqual(new Date(2024, 1, 29));
        expect(grid[5][6]).toEqual(new Date(2024, 2, 9));
    });

    it('should render localized weekdays, navigation and date cells', () => {
        const root = render(calendar().render());

        expect(root.querySelectorAll('tbody td')).toHaveLength(42);
        expect(root.querySelector('caption').textContent).toContain('2024-02');
        expect(root.querySelector('thead').textContent).toBe(
            'SundayMondayTuesdayWednesdayThursdayFridaySaturday'
        );
        expect(
            root.querySelector('tbody td').classList.contains('opacity-50')
        ).toBe(true);
    });

    it('should emit a change when navigating between months', () => {
        const instance = calendar();
        const onChange = fn<(event: CustomEvent<Date>) => void>();
        instance.addEventListener('change', onChange);

        render(instance.render())
            .querySelector<HTMLButtonElement>('button')
            .click();

        expect(instance.currentDate).toEqual(new Date(2024, 0, 15));
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange.mock.calls[0][0].detail).toEqual(instance.currentDate);
    });

    it('should render event links and emit the selected date data', () => {
        const instance = calendar();
        const item: DateData = {
            date: new Date(2024, 1, 15),
            content: 'Meeting',
            link: '#meeting'
        };
        const onSelect = fn<(event: CustomEvent<DateData>) => void>();
        instance.addEventListener('select', onSelect);
        runInAction(() => {
            instance.value = [item];
        });
        const link = render(
            instance.renderDate(new Date(2024, 1, 15))
        ).querySelector('a');

        expect(link.getAttribute('href')).toBe('#meeting');
        expect(link.textContent).toBe('Meeting');
        link.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        expect(onSelect).toHaveBeenCalledTimes(1);
        expect(onSelect.mock.calls[0][0].detail).toEqual(item);
    });
});
