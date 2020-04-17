import '../polyfill';
import { assertLooksLike } from 'snabbdom-looks-like';
import { createCell } from 'web-cell';

import { Form } from '../../source/Form/Form';
import { FormField } from '../../source/Form/FormField';

describe('Form', () => {
    it('should render a Form Container defaultly', () => {
        assertLooksLike(<Form />, <form className="was-validated" />);
    });

    it('should render an Inline Form', () => {
        assertLooksLike(
            <Form inline>
                <FormField id="test" />
            </Form>,
            <form className="form-inline was-validated">
                <div className="form-group">
                    <input type="text" className="form-control" id="test" />
                </div>
            </form>
        );
    });

    it('should render a Form Container with Custom Validator', () => {
        assertLooksLike(
            <Form validate />,
            <form className="was-validated needs-validation" novalidate />
        );
    });
});
