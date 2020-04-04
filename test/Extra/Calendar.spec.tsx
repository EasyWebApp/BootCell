import '../polyfill';
import { assertLooksLike } from 'snabbdom-looks-like';
import { createCell, Fragment } from 'web-cell';
import classNames from 'classnames';

import { CalendarView, CalendarProps } from '../../source/Extra/Calendar';
import style from '../../source/Content/Table.less';

const {
    prototype: { render, renderRow },
    createDayGrid
} = CalendarView;

function Calendar({ date, renderCell }: CalendarProps) {
    render.call(
        { renderRow: renderRow.bind({ props: { date, renderCell } }) },
        { date },
        { dayGrid: createDayGrid(date) }
    );
}

describe('Calendar', () => {
    const date = new Date(1989, 5, 4);

    it('should ', () => {
        assertLooksLike(
            <Calendar
                date={date}
                renderCell={date => <a>{date.getDate()}</a>}
            />,
            <Fragment>
                <header className="d-flex justify-content-between align-items-center py-3">
                    <button type="button" className="btn btn-primary p-1">
                        <span
                            className="fas fa-chevron-left"
                            aria-hidden="true"
                        />
                    </button>
                    <time className="font-weight-bold">
                        <span>1989</span>-<span>6</span>
                    </time>
                    <button type="button" className="btn btn-primary p-1">
                        <span
                            className="fas fa-chevron-right"
                            aria-hidden="true"
                        />
                    </button>
                </header>
                <div className="table-responsive">
                    <table
                        className={classNames(
                            'table',
                            'table-bordered',
                            style.table,
                            style['cell-center']
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
                                    <a>29</a>
                                </td>
                                <td className="text-secondary bg-light">
                                    <a>30</a>
                                </td>
                                <td className="text-secondary bg-light">
                                    <a>31</a>
                                </td>
                                <td>
                                    <a>1</a>
                                </td>
                                <td>
                                    <a>2</a>
                                </td>
                                <td>
                                    <a>3</a>
                                </td>
                                <td>
                                    <a>4</a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <a>5</a>
                                </td>
                                <td>
                                    <a>6</a>
                                </td>
                                <td>
                                    <a>7</a>
                                </td>
                                <td>
                                    <a>8</a>
                                </td>
                                <td>
                                    <a>9</a>
                                </td>
                                <td>
                                    <a>10</a>
                                </td>
                                <td>
                                    <a>11</a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <a>12</a>
                                </td>
                                <td>
                                    <a>13</a>
                                </td>
                                <td>
                                    <a>14</a>
                                </td>
                                <td>
                                    <a>15</a>
                                </td>
                                <td>
                                    <a>16</a>
                                </td>
                                <td>
                                    <a>17</a>
                                </td>
                                <td>
                                    <a>18</a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <a>19</a>
                                </td>
                                <td>
                                    <a>20</a>
                                </td>
                                <td>
                                    <a>21</a>
                                </td>
                                <td>
                                    <a>22</a>
                                </td>
                                <td>
                                    <a>23</a>
                                </td>
                                <td>
                                    <a>24</a>
                                </td>
                                <td>
                                    <a>25</a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <a>26</a>
                                </td>
                                <td>
                                    <a>27</a>
                                </td>
                                <td>
                                    <a>28</a>
                                </td>
                                <td>
                                    <a>29</a>
                                </td>
                                <td>
                                    <a>30</a>
                                </td>
                                <td className="text-secondary bg-light">
                                    <a>1</a>
                                </td>
                                <td className="text-secondary bg-light">
                                    <a>2</a>
                                </td>
                            </tr>
                            <tr>
                                <td className="text-secondary bg-light">
                                    <a>3</a>
                                </td>
                                <td className="text-secondary bg-light">
                                    <a>4</a>
                                </td>
                                <td className="text-secondary bg-light">
                                    <a>5</a>
                                </td>
                                <td className="text-secondary bg-light">
                                    <a>6</a>
                                </td>
                                <td className="text-secondary bg-light">
                                    <a>7</a>
                                </td>
                                <td className="text-secondary bg-light">
                                    <a>8</a>
                                </td>
                                <td className="text-secondary bg-light">
                                    <a>9</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Fragment>
        );
    });
});
