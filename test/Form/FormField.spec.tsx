import '../polyfill';
import { assertLooksLike } from 'snabbdom-looks-like';
import { createCell } from 'web-cell';

import { FormField } from '../../source/Form/FormField';
import style from '../../source/Form/FormField.less';

describe('Form Fields', () => {
    it('should render a Text Input with Form Group wrapped defaultly', () => {
        assertLooksLike(
            <FormField id="test" />,
            <div className="form-group">
                <input type="text" className="form-control" id="test" />
            </div>
        );
    });

    it('should render an Input with Tips text', () => {
        assertLooksLike(
            <FormField id="test" tips="Example" />,
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    id="test"
                    aria-describedby="test-tips"
                />
                <small id="test-tips" className="form-text text-muted">
                    Example
                </small>
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
            <FormField is="select" id="test" name="test" label="test" multiple>
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

    it('should render a Form Field with a Floating Label', () => {
        assertLooksLike(
            <FormField id="test" labelFloat placeholder="Test" />,
            <div className={style['form-label-group']}>
                <input
                    type="text"
                    className="form-control"
                    id="test"
                    placeholder="Test"
                />
                <label htmlFor="test">Test</label>
            </div>
        );
    });

    it('should render a Form Field with Column layout', () => {
        assertLooksLike(
            <FormField id="test" labelColumn={2} label="Test" />,
            <div className="form-group row">
                <label
                    htmlFor="test"
                    className="col-sm-2 col-form-label text-nowrap"
                >
                    Test
                </label>
                <div className="col-sm-10">
                    <input type="text" id="test" />
                </div>
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
