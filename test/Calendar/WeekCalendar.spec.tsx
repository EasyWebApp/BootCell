import { assertLooksLike } from '@tech_query/snabbdom-looks-like';
import { createCell } from 'web-cell';

import {
    WeekCalendar,
    WeekCalendarProps
} from '../../source/Calendar/WeekCalendar';
import { WeekDays, CalendarTable } from '../../source/Calendar/CalendarTable';

const { render } = WeekCalendar.prototype;

function InlineCalendar({
    weekDays = WeekDays,
    startTime = '00:00',
    endTime = '24:00',
    hourInterval = 2,
    ...rest
}: WeekCalendarProps) {
    return render({ weekDays, startTime, endTime, hourInterval, ...rest });
}

describe('Week Calendar', () => {
    it('should render an empty Week Calendar with 13 rows & 8 columns defaultly', () => {
        assertLooksLike(
            <InlineCalendar />,

            <CalendarTable weekDays={['', ...WeekDays]}>
                <tr>
                    <th>
                        00:00<div>~</div>02:00
                    </th>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                </tr>
                <tr>
                    <th>
                        02:00<div>~</div>04:00
                    </th>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                </tr>
                <tr>
                    <th>
                        04:00<div>~</div>06:00
                    </th>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                </tr>
                <tr>
                    <th>
                        06:00<div>~</div>08:00
                    </th>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                </tr>
                <tr>
                    <th>
                        08:00<div>~</div>10:00
                    </th>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                </tr>
                <tr>
                    <th>
                        10:00<div>~</div>12:00
                    </th>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                </tr>
                <tr>
                    <th>
                        12:00<div>~</div>14:00
                    </th>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                </tr>
                <tr>
                    <th>
                        14:00<div>~</div>16:00
                    </th>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                </tr>
                <tr>
                    <th>
                        16:00<div>~</div>18:00
                    </th>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                </tr>
                <tr>
                    <th>
                        18:00<div>~</div>20:00
                    </th>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                </tr>
                <tr>
                    <th>
                        20:00<div>~</div>22:00
                    </th>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                </tr>
                <tr>
                    <th>
                        22:00<div>~</div>24:00
                    </th>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                </tr>
            </CalendarTable>
        );
    });

    it('should render a custom Week Calendar with properties', () => {
        assertLooksLike(
            <InlineCalendar
                startTime="09:00"
                endTime="22:30"
                hourInterval={1.5}
            />,
            <CalendarTable weekDays={['', ...WeekDays]}>
                <tr>
                    <th>
                        09:00<div>~</div>10:30
                    </th>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                </tr>
                <tr>
                    <th>
                        10:30<div>~</div>12:00
                    </th>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                </tr>
                <tr>
                    <th>
                        12:00<div>~</div>13:30
                    </th>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                </tr>
                <tr>
                    <th>
                        13:30<div>~</div>15:00
                    </th>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                </tr>
                <tr>
                    <th>
                        15:00<div>~</div>16:30
                    </th>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                </tr>
                <tr>
                    <th>
                        16:30<div>~</div>18:00
                    </th>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                </tr>
                <tr>
                    <th>
                        18:00<div>~</div>19:30
                    </th>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                </tr>
                <tr>
                    <th>
                        19:30<div>~</div>21:00
                    </th>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                </tr>
                <tr>
                    <th>
                        21:00<div>~</div>22:30
                    </th>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                    <td className="p-3 p-sm-4"></td>
                </tr>
            </CalendarTable>
        );
    });
});
