import { assertLooksLike } from 'snabbdom-looks-like';
import { createCell } from 'web-cell';
import classNames from 'classnames';

import { CalendarView, CalendarProps } from '../../source/Extra/Calendar';
import Calendar_style from '../../source/Extra/Calendar/index.less';
import Table_style from '../../source/Content/Table.less';

import { IconButton } from '../../source/Form/Button';

const {
    prototype: { render, renderRow },
    createDayGrid
} = CalendarView;

function Calendar({ date, renderCell }: CalendarProps) {
    return (
        <div>
            {render.call(
                { renderRow: renderRow.bind({ props: { date, renderCell } }) },
                { date, dateTemplate: 'YYYY-MM' },
                { dayGrid: createDayGrid(date) }
            )}
        </div>
    );
}

describe('Calendar', () => {
    const date = new Date(1989, 5, 4);

    it('should render a Calendar Table based on the Date', () => {
        assertLooksLike(
            <Calendar
                date={date}
                renderCell={date => <a>{date.getDate()}</a>}
            />,
            <div>
                <header className="d-flex justify-content-between align-items-center py-3">
                    <IconButton className="p-1" name="chevron-left" />
                    <time className="font-weight-bold">1989-06</time>
                    <IconButton className="p-1" name="chevron-right" />
                </header>
                <div className="table-responsive">
                    <table
                        className={classNames(
                            'table',
                            'table-bordered',
                            Table_style.table,
                            Table_style['cell-center'],
                            Calendar_style.table
                        )}
                    >
                        <thead>
                            <tr className="bg-primary">
                                <th>Monday</th>
                                <th>Tuesday</th>
                                <th>Wednesday</th>
                                <th>Thursday</th>
                                <th>Friday</th>
                                <th>Saturday</th>
                                <th>Sunday</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="text-secondary bg-light">
                                    <a>{29}</a>
                                </td>
                                <td className="text-secondary bg-light">
                                    <a>{30}</a>
                                </td>
                                <td className="text-secondary bg-light">
                                    <a>{31}</a>
                                </td>
                                <td>
                                    <a>{1}</a>
                                </td>
                                <td>
                                    <a>{2}</a>
                                </td>
                                <td>
                                    <a>{3}</a>
                                </td>
                                <td className="bg-primary">
                                    <a>{4}</a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <a>{5}</a>
                                </td>
                                <td>
                                    <a>{6}</a>
                                </td>
                                <td>
                                    <a>{7}</a>
                                </td>
                                <td>
                                    <a>{8}</a>
                                </td>
                                <td>
                                    <a>{9}</a>
                                </td>
                                <td>
                                    <a>{10}</a>
                                </td>
                                <td>
                                    <a>{11}</a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <a>{12}</a>
                                </td>
                                <td>
                                    <a>{13}</a>
                                </td>
                                <td>
                                    <a>{14}</a>
                                </td>
                                <td>
                                    <a>{15}</a>
                                </td>
                                <td>
                                    <a>{16}</a>
                                </td>
                                <td>
                                    <a>{17}</a>
                                </td>
                                <td>
                                    <a>{18}</a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <a>{19}</a>
                                </td>
                                <td>
                                    <a>{20}</a>
                                </td>
                                <td>
                                    <a>{21}</a>
                                </td>
                                <td>
                                    <a>{22}</a>
                                </td>
                                <td>
                                    <a>{23}</a>
                                </td>
                                <td>
                                    <a>{24}</a>
                                </td>
                                <td>
                                    <a>{25}</a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <a>{26}</a>
                                </td>
                                <td>
                                    <a>{27}</a>
                                </td>
                                <td>
                                    <a>{28}</a>
                                </td>
                                <td>
                                    <a>{29}</a>
                                </td>
                                <td>
                                    <a>{30}</a>
                                </td>
                                <td className="text-secondary bg-light">
                                    <a>{1}</a>
                                </td>
                                <td className="text-secondary bg-light">
                                    <a>{2}</a>
                                </td>
                            </tr>
                            <tr>
                                <td className="text-secondary bg-light">
                                    <a>{3}</a>
                                </td>
                                <td className="text-secondary bg-light">
                                    <a>{4}</a>
                                </td>
                                <td className="text-secondary bg-light">
                                    <a>{5}</a>
                                </td>
                                <td className="text-secondary bg-light">
                                    <a>{6}</a>
                                </td>
                                <td className="text-secondary bg-light">
                                    <a>{7}</a>
                                </td>
                                <td className="text-secondary bg-light">
                                    <a>{8}</a>
                                </td>
                                <td className="text-secondary bg-light">
                                    <a>{9}</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    });
});
