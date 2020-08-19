import { assertLooksLike } from '@tech_query/snabbdom-looks-like';
import { createCell } from 'web-cell';

import { FormField } from '../../source/Form/FormField';
import { Field } from '../../source/Form/Field';

describe('Form Fields', () => {
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

    it('should render a Custom File Field', () => {
        assertLooksLike(
            <Field type="file" id="test" label="Image" />,
            <div className="custom-file">
                <input type="file" className="custom-file-input" id="test" />
                <label
                    className="custom-file-label"
                    for="test"
                    data-file="Image"
                    data-browse="Browse"
                />
            </div>
        );
    });

    it('should render a Form Field with a Floating Label', () => {
        assertLooksLike(
            <FormField id="test" labelFloat placeholder="Test" />,
            <div className="form-label-group">
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
