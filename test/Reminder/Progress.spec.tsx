import '../polyfill';
import { assertLooksLike } from 'snabbdom-looks-like';
import { createCell } from 'web-cell';

import { Progress } from '../../source/Reminder/Progress';

describe('Progress', () => {
    it('should render a Progress Bar with Primary status defaultly', () => {
        assertLooksLike(
            <Progress>pending</Progress>,

            <div className="progress">
                <div
                    className="progress-bar"
                    role="progressbar"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-valuenow="0"
                    style={{ width: '0%' }}
                >
                    pending
                </div>
            </div>
        );
    });

    it('should render a Progress Bar with styles', () => {
        assertLooksLike(
            <Progress striped animated status="info" percent={64} />,

            <div className="progress">
                <div
                    className="progress-bar progress-bar-striped progress-bar-animated bg-info"
                    role="progressbar"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-valuenow="64"
                    style={{ width: '64%' }}
                >
                    64%
                </div>
            </div>
        );
    });
});
