import { createCell } from 'web-cell';
import { assertLooksLike } from '@tech_query/snabbdom-looks-like';

import { CountDown } from '../../source/Calendar/CountDown';
import style from '../../source/Calendar/CountDown/index.less';

const { render } = CountDown.prototype;

describe('CountDown', () => {
    it('should render Time sections', () => {
        assertLooksLike(
            render.call({
                timeSections: [
                    { value: 1, label: 'D' },
                    { value: 1, label: 'h' },
                    { value: 1, label: 'm' },
                    { value: 1, label: 's' }
                ]
            }),
            <ol className="list-inline text-white">
                <li
                    className={`list-inline-item display-4 bg-primary ${style.section}`}
                >
                    <small>
                        01
                        <sub>D</sub>
                    </small>
                </li>
                <li
                    className={`list-inline-item display-4 bg-secondary ${style.section}`}
                >
                    <small>
                        01
                        <sub>h</sub>
                    </small>
                </li>
                <li
                    className={`list-inline-item display-4 bg-success ${style.section}`}
                >
                    <small>
                        01
                        <sub>m</sub>
                    </small>
                </li>
                <li
                    className={`list-inline-item display-4 bg-danger ${style.section}`}
                >
                    <small>
                        01
                        <sub>s</sub>
                    </small>
                </li>
            </ol>
        );
    });
});
