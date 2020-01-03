import '../polyfill';
import { assertLooksLike } from 'snabbdom-looks-like';
import { createCell } from 'web-cell';

import { FormField } from '../../source/Form/FormField';

describe('Form Fields', () => {
    it('should render a Text Input with Form Group wrapped defaultly', () => {
        assertLooksLike(
            <FormField id="test" />,
            <div className="form-group">
                <input type="text" className="form-control" id="test" />
            </div>
        );
    });

    it('should render a Custom Range Input with Label', () => {
        assertLooksLike(
            <FormField type="range" id="test" label="Number" min="0" />,
            <div className="form-group">
                <label htmlFor="test">Number</label>
                <input
                    type="range"
                    className="custom-range"
                    id="test"
                    min="0"
                />
            </div>
        );
    });

    it('should render a Custom Select with Label', () => {
        assertLooksLike(
            <FormField is="select" id="test" name="test" multiple>
                <option>Example</option>
            </FormField>,
            <div className="form-group">
                <label htmlFor="test">test</label>

                <select className="custom-select" id="test" multiple>
                    <option>Example</option>
                </select>
            </div>
        );
    });

    it('should render a Custom File Field', () => {
        assertLooksLike(
            <FormField type="file" id="test" label="Image" />,
            <div className="custom-file">
                <input type="file" className="custom-file-input" id="test" />
                <label
                    className="custom-file-label"
                    for="test"
                    data-browse="Browse"
                >
                    Image
                </label>
            </div>
        );
    });

    it('should render a Form Field with Slot', () => {
        assertLooksLike(
            <FormField label="Avatar" id="test">
                <input type="image" />
            </FormField>,
            <div className="form-group">
                <label htmlFor="test">Avatar</label>
                <input type="image" />
            </div>
        );
    });
});
