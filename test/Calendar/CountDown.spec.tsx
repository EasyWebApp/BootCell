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
            <ol className="list-inline fg-white">
                <li
                    className={`list-inline-item fs-5xl theme-primary d-inline-flex align-items-center justify-content-center rounded-6 ${style.section}`}
                >
                    <small>
                        01
                        <sub>D</sub>
                    </small>
                </li>
                <li
                    className={`list-inline-item fs-5xl theme-secondary d-inline-flex align-items-center justify-content-center rounded-6 ${style.section}`}
                >
                    <small>
                        01
                        <sub>h</sub>
                    </small>
                </li>
                <li
                    className={`list-inline-item fs-5xl theme-success d-inline-flex align-items-center justify-content-center rounded-6 ${style.section}`}
                >
                    <small>
                        01
                        <sub>m</sub>
                    </small>
                </li>
                <li
                    className={`list-inline-item fs-5xl theme-danger d-inline-flex align-items-center justify-content-center rounded-6 ${style.section}`}
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
