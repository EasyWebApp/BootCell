import './polyfill';
import { createCell } from 'web-cell';
import { assertLooksLike } from 'snabbdom-looks-like';

import { CountDown } from '../source/CountDown';
import style from '../source/CountDown.less';

describe('CountDown', () => {
    it('should render Time sections', () => {
        assertLooksLike(
            CountDown.prototype.render.call({
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
