import { assertLooksLike } from '@tech_query/snabbdom-looks-like';
import { createCell } from 'web-cell';

import { Field } from '../../source/Form/Field';

describe('Field', () => {
    it('should render a Text Input defaultly', () => {
        assertLooksLike(
            <Field />,
            <input type="text" className="form-control" />
        );
    });

    it('should render a Custom Range Input', () => {
        assertLooksLike(
            <Field type="range" />,
            <input type="range" className="custom-range" defaultValue="0" />
        );
    });

    it('should render a Text Output', () => {
        assertLooksLike(
            <Field is="output" defaultValue="Test" />,
            <output className="form-control form-control-plaintext">
                Test
            </output>
        );
    });

    it('should render a Custom Select with Multiple lines', () => {
        assertLooksLike(
            <Field is="select" multiple size={3}>
                <option>Example</option>
            </Field>,
            <select className="custom-select" multiple size={3}>
                <option>Example</option>
            </select>
        );
    });

    it('should render Specific Sizes of Fields', () => {
        assertLooksLike(
            <Field size="sm" />,
            <input type="text" className="form-control form-control-sm" />
        );
        assertLooksLike(
            <Field is="select" size="lg" />,
            <select className="custom-select custom-select-lg" />
        );
    });
});
