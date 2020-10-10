import { assertLooksLike } from '@tech_query/snabbdom-looks-like';
import { createCell } from 'web-cell';

import { Range } from '../../source/Form/Range';
import style from '../../source/Form/Range.less';

describe('Range', () => {
    it('should render an Original Range Input defaultly', () => {
        assertLooksLike(
            <Range />,
            <input type="range" className="custom-range" defaultValue="0" />
        );
    });

    it('should render a Positive-Integer Range Input with icons', () => {
        assertLooksLike(
            <Range max={5} emptyIcon="☆" fullIcon="★" size="lg" />,

            <div className={`${style.range} ${style.large}`}>
                <input type="range" min={0} step={1} max={5} defaultValue="0" />
            </div>
        );
    });
});
