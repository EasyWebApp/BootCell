import { assertLooksLike } from '@tech_query/snabbdom-looks-like';
import { createCell } from 'web-cell';

import { ToggleField } from '../../source/Form/ToggleField';

describe('Toggle Fields', () => {
    it('should render a disabled Radio input without label tag', () => {
        assertLooksLike(
            <ToggleField type="radio" disabled labelHidden>
                test
            </ToggleField>,
            <div>
                <input
                    className="form-check-input"
                    type="radio"
                    disabled
                    aria-label="test"
                />
            </div>
        );
    });

    it('should render a checked Radio input with label tag', () => {
        assertLooksLike(
            <ToggleField type="radio" checked id="test">
                test
            </ToggleField>,
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    checked
                    id="test"
                />
                <label className="form-check-label" htmlFor="test">
                    test
                </label>
            </div>
        );
    });

    it('should render an inline Radio input with label tag', () => {
        assertLooksLike(
            <ToggleField type="radio" inline id="test">
                test
            </ToggleField>,
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" id="test" />
                <label className="form-check-label" htmlFor="test">
                    test
                </label>
            </div>
        );
    });

    it('should render a Switch Checkbox', () => {
        assertLooksLike(
            <ToggleField mode="switch" id="test">
                Enable
            </ToggleField>,
            <div className="form-check form-switch">
                <input
                    type="checkbox"
                    className="form-check-input"
                    role="switch"
                    id="test"
                />
                <label className="form-check-label" htmlFor="test">
                    Enable
                </label>
            </div>
        );
    });

    it('should render a Radio Button with Button style', () => {
        assertLooksLike(
            <div>
                <ToggleField
                    type="radio"
                    mode="button"
                    color="primary"
                    id="test"
                >
                    test
                </ToggleField>
            </div>,
            <div>
                <input
                    className="btn-check"
                    type="radio"
                    autocomplete="off"
                    id="test"
                />
                <label className="btn btn-primary" htmlFor="test">
                    test
                </label>
            </div>
        );
    });
});
