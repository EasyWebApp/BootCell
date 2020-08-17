import { assertLooksLike } from '@tech_query/snabbdom-looks-like';
import { createCell } from 'web-cell';

import { Progress, ProgressBar } from '../../source/Reminder/Progress';

describe('Progress', () => {
    it('should render a Progress Bar with Primary status defaultly', () => {
        assertLooksLike(
            <Progress />,

            <div className="progress">
                <div
                    className="progress-bar"
                    role="progressbar"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-valuenow="0"
                    style={{ width: '0%' }}
                />
            </div>
        );
    });

    it('should render a Progress Bar with a default Label', () => {
        assertLooksLike(
            <Progress label />,

            <div className="progress">
                <div
                    className="progress-bar"
                    role="progressbar"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-valuenow="0"
                    style={{ width: '0%' }}
                >
                    0%
                </div>
            </div>
        );
    });

    it('should render a Progress Bar with a custom Label', () => {
        assertLooksLike(
            <Progress label={percent => `${percent} percent`} />,

            <div className="progress">
                <div
                    className="progress-bar"
                    role="progressbar"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-valuenow="0"
                    style={{ width: '0%' }}
                >
                    0 percent
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
                />
            </div>
        );
    });

    it('should render a Progress with multiple Bars', () => {
        assertLooksLike(
            <Progress>
                <ProgressBar />
                <ProgressBar percent={10} striped />
            </Progress>,
            <div className="progress">
                <div
                    className="progress-bar"
                    role="progressbar"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-valuenow="0"
                    style={{ width: '0%' }}
                />
                <div
                    className="progress-bar progress-bar-striped"
                    role="progressbar"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-valuenow="10"
                    style={{ width: '10%' }}
                />
            </div>
        );
    });
});
