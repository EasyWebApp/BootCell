import { assertLooksLike } from '@tech_query/snabbdom-looks-like';
import { createCell } from 'web-cell';

import { Form } from '../../source/Form/Form';
import { FormField } from '../../source/Form/FormField';

describe('Form', () => {
    it('should render a Form Container with Custom Validator', () => {
        assertLooksLike(
            <Form validate />,
            <form className="needs-validation" novalidate />
        );
    });

    it('should render a Validated Form container', () => {
        assertLooksLike(<Form validated />, <form className="was-validated" />);
    });

    it('should render an Inline Form', () => {
        assertLooksLike(
            <Form inline>
                <FormField id="test" />
            </Form>,
            <form className="form-inline">
                <FormField id="test" />
            </form>
        );
    });
});
