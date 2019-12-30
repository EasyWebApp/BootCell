import '../DOM-polyfill';
import { assertLooksLike } from 'snabbdom-looks-like';
import { createCell } from 'web-cell';

import { ToggleField } from '../../source';

describe('', () => {
    it('should render an Inline Switch Checkbox', () => {
        assertLooksLike(
            <ToggleField type="checkbox" switch inline id="test">
                Enable
            </ToggleField>,
            <div className="custom-control custom-switch custom-control-inline">
                <input
                    type="checkbox"
                    className="custom-control-input"
                    id="test"
                />
                <label className="custom-control-label" htmlFor="test">
                    Enable
                </label>
            </div>
        );
    });
});
