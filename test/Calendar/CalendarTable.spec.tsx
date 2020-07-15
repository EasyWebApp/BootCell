import { assertLooksLike } from 'snabbdom-looks-like';
import { createCell } from 'web-cell';
import classNames from 'classnames';

import { CalendarTable } from '../../source/Calendar/CalendarTable';
import Calendar_style from '../../source/Calendar/CalendarTable.less';
import Table_style from '../../source/Content/Table.less';

describe('Calendar Table', () => {
    it('should render a Calendar Table with English headers defaultly', () => {
        assertLooksLike(
            <CalendarTable />,

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
                        <tr className="bg-primary text-white">
                            <th className="text-truncate">Monday</th>
                            <th className="text-truncate">Tuesday</th>
                            <th className="text-truncate">Wednesday</th>
                            <th className="text-truncate">Thursday</th>
                            <th className="text-truncate">Friday</th>
                            <th className="text-truncate">Saturday</th>
                            <th className="text-truncate">Sunday</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        );
    });
});
