import { assertLooksLike } from '@tech_query/snabbdom-looks-like';
import { createCell } from 'web-cell';

import { ToggleField, ToggleGroup } from '../../source/Form/ToggleField';

describe('Toggle Fields', () => {
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

    it('should render a Radio Group with Button style', () => {
        assertLooksLike(
            <ToggleGroup
                type="radio"
                name="test"
                value="A"
                options={[
                    { title: 'A' },
                    { title: 'B', value: 'b', color: 'danger' }
                ]}
            />,
            <div className="btn-group btn-group-toggle">
                <label className="btn btn-primary active">
                    <input type="radio" name="test" value="A" checked />A
                </label>
                <label className="btn btn-danger">
                    <input type="radio" name="test" value="b" />B
                </label>
            </div>
        );
    });
});
