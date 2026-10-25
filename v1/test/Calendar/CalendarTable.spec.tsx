import { assertLooksLike } from '@tech_query/snabbdom-looks-like';
import { createCell } from 'web-cell';
import classNames from 'classnames';

import { CalendarTable } from '../../Calendar/CalendarTable';
import Calendar_style from '../../Calendar/CalendarTable/index.less';
import Table_style from '../../Content/Table/index.less';

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
                        <tr className="theme-primary">
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
