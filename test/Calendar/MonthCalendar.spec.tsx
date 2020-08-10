import { assertLooksLike } from '@tech_query/snabbdom-looks-like';
import { createCell } from 'web-cell';

import { WeekDays, CalendarTable } from '../../source/Calendar/CalendarTable';
import {
    MonthCalendar,
    MonthCalendarProps
} from '../../source/Calendar/MonthCalendar';
import { IconButton } from '../../source/Form/Button';

const {
    prototype: { render, renderRow },
    createDayGrid
} = MonthCalendar;

function InlineCalendar({ date, renderCell }: MonthCalendarProps) {
    return (
        <div>
            {render.call(
                { renderRow: renderRow.bind({ props: { date, renderCell } }) },
                {
                    date,
                    dateTemplate: 'YYYY-MM',
                    weekDays: WeekDays
                },
                { dayGrid: createDayGrid(new Date(date)) }
            )}
        </div>
    );
}

describe('Month Calendar', () => {
    const date = new Date(1989, 5, 4);

    it('should render a Calendar Table based on the Date', () => {
        assertLooksLike(
            <InlineCalendar
                date={date}
                renderCell={date => <a>{date.getDate()}</a>}
            />,
            <div>
                <header className="d-flex justify-content-between align-items-center py-3">
                    <IconButton className="p-1" name="chevron-left px-2" />
                    <time className="font-weight-bold">1989-06</time>
                    <IconButton className="p-1" name="chevron-right px-2" />
                </header>
                <CalendarTable>
                    <tr>
                        <td className="p-3 p-sm-4 text-secondary bg-light">
                            <a>{29}</a>
                        </td>
                        <td className="p-3 p-sm-4 text-secondary bg-light">
                            <a>{30}</a>
                        </td>
                        <td className="p-3 p-sm-4 text-secondary bg-light">
                            <a>{31}</a>
                        </td>
                        <td className="p-3 p-sm-4">
                            <a>{1}</a>
                        </td>
                        <td className="p-3 p-sm-4">
                            <a>{2}</a>
                        </td>
                        <td className="p-3 p-sm-4">
                            <a>{3}</a>
                        </td>
                        <td className="p-3 p-sm-4 bg-primary">
                            <a>{4}</a>
                        </td>
                    </tr>
                    <tr>
                        <td className="p-3 p-sm-4">
                            <a>{5}</a>
                        </td>
                        <td className="p-3 p-sm-4">
                            <a>{6}</a>
                        </td>
                        <td className="p-3 p-sm-4">
                            <a>{7}</a>
                        </td>
                        <td className="p-3 p-sm-4">
                            <a>{8}</a>
                        </td>
                        <td className="p-3 p-sm-4">
                            <a>{9}</a>
                        </td>
                        <td className="p-3 p-sm-4">
                            <a>{10}</a>
                        </td>
                        <td className="p-3 p-sm-4">
                            <a>{11}</a>
                        </td>
                    </tr>
                    <tr>
                        <td className="p-3 p-sm-4">
                            <a>{12}</a>
                        </td>
                        <td className="p-3 p-sm-4">
                            <a>{13}</a>
                        </td>
                        <td className="p-3 p-sm-4">
                            <a>{14}</a>
                        </td>
                        <td className="p-3 p-sm-4">
                            <a>{15}</a>
                        </td>
                        <td className="p-3 p-sm-4">
                            <a>{16}</a>
                        </td>
                        <td className="p-3 p-sm-4">
                            <a>{17}</a>
                        </td>
                        <td className="p-3 p-sm-4">
                            <a>{18}</a>
                        </td>
                    </tr>
                    <tr>
                        <td className="p-3 p-sm-4">
                            <a>{19}</a>
                        </td>
                        <td className="p-3 p-sm-4">
                            <a>{20}</a>
                        </td>
                        <td className="p-3 p-sm-4">
                            <a>{21}</a>
                        </td>
                        <td className="p-3 p-sm-4">
                            <a>{22}</a>
                        </td>
                        <td className="p-3 p-sm-4">
                            <a>{23}</a>
                        </td>
                        <td className="p-3 p-sm-4">
                            <a>{24}</a>
                        </td>
                        <td className="p-3 p-sm-4">
                            <a>{25}</a>
                        </td>
                    </tr>
                    <tr>
                        <td className="p-3 p-sm-4">
                            <a>{26}</a>
                        </td>
                        <td className="p-3 p-sm-4">
                            <a>{27}</a>
                        </td>
                        <td className="p-3 p-sm-4">
                            <a>{28}</a>
                        </td>
                        <td className="p-3 p-sm-4">
                            <a>{29}</a>
                        </td>
                        <td className="p-3 p-sm-4">
                            <a>{30}</a>
                        </td>
                        <td className="p-3 p-sm-4 text-secondary bg-light">
                            <a>{1}</a>
                        </td>
                        <td className="p-3 p-sm-4 text-secondary bg-light">
                            <a>{2}</a>
                        </td>
                    </tr>
                    <tr>
                        <td className="p-3 p-sm-4 text-secondary bg-light">
                            <a>{3}</a>
                        </td>
                        <td className="p-3 p-sm-4 text-secondary bg-light">
                            <a>{4}</a>
                        </td>
                        <td className="p-3 p-sm-4 text-secondary bg-light">
                            <a>{5}</a>
                        </td>
                        <td className="p-3 p-sm-4 text-secondary bg-light">
                            <a>{6}</a>
                        </td>
                        <td className="p-3 p-sm-4 text-secondary bg-light">
                            <a>{7}</a>
                        </td>
                        <td className="p-3 p-sm-4 text-secondary bg-light">
                            <a>{8}</a>
                        </td>
                        <td className="p-3 p-sm-4 text-secondary bg-light">
                            <a>{9}</a>
                        </td>
                    </tr>
                </CalendarTable>
            </div>
        );
    });
});
