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
        expect(root.querySelector('thead').textContent).toBe('SMTWTFS');
        expect(
            [...root.querySelectorAll('thead th')].map(cell =>
                cell.getAttribute('title')
            )
        ).toEqual([
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ]);
        expect(
            [...root.querySelectorAll('thead th')].every(
                cell => cell.getAttribute('scope') === 'col'
            )
        ).toBe(true);
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

    it('should share the native theme across navigation and weekday headings', () => {
        const instance = calendar();
        runInAction(() => {
            instance.variant = 'outline';
            instance.theme = 'accent';
        });
        const root = render(instance.render());

        expect(
            Array.from(root.querySelectorAll('button'), node => node.className)
        ).toEqual([
            'btn btn-outline theme-accent',
            'btn btn-outline theme-accent'
        ]);
        expect(
            Array.from(
                root.querySelectorAll('thead th'),
                node => node.className
            )
        ).toEqual(Array(7).fill('theme-accent'));
    });

    it('should keep table layout fixed regardless of host CSSStyleDeclaration values', () => {
        const instance = calendar();
        instance.style.tableLayout = 'auto';
        instance.style.width = '390px';
        const table = render(instance.render()).querySelector('table');

        expect(table.style.tableLayout).toBe('fixed');
        expect(table.style.width).toBe('');
    });

    it('should use compact localized headings with full accessible titles', () => {
        const instance = calendar();
        runInAction(() => (instance.locale = 'zh-CN'));
        const root = render(instance.render());
        const formatter = new Intl.DateTimeFormat('zh-CN', {
            weekday: 'narrow'
        });
        expect(
            [...root.querySelectorAll('thead th')].map(cell => cell.textContent)
        ).toEqual(instance.dateGrid[0].map(date => formatter.format(date)));
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
