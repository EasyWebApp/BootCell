import { assertLooksLike } from '@tech_query/snabbdom-looks-like';
import { createCell } from 'web-cell';

import { Field } from '../../source/Form/Field';

describe('Field', () => {
    it('should render a Text Input defaultly', () => {
        assertLooksLike(
            <Field id="test" />,
            <input type="text" id="test" className="form-control" />
        );
    });

    it('should render a Custom Range Input', () => {
        assertLooksLike(
            <Field type="range" id="test" />,
            <input type="range" className="form-range" id="test" />
        );
    });

    it('should render a Text Output', () => {
        assertLooksLike(
            <Field is="output" id="test" defaultValue="Test" />,
            <output className="form-control form-control-plaintext" id="test">
                Test
            </output>
        );
    });

    it('should render a Custom Select with Multiple lines', () => {
        assertLooksLike(
            <Field is="select" id="test" multiple size={3}>
                <option>Example</option>
            </Field>,
            <select className="form-select" id="test" multiple size={3}>
                <option>Example</option>
            </select>
        );
    });

    it('should render Specific Sizes of Fields', () => {
        assertLooksLike(
            <Field size="sm" id="test" />,
            <input
                type="text"
                className="form-control form-control-sm"
                id="test"
            />
        );
        assertLooksLike(
            <Field is="select" id="test" size="lg" />,
            <select className="form-select form-select-lg" id="test" />
        );
    });
});
