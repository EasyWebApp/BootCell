import { createCell } from 'web-cell';
import { assertLooksLike } from '@tech_query/snabbdom-looks-like';

import { InputGroup } from '../../source/Form/InputGroup';
import { Field } from '../../source/Form/Field';
import { ToggleField } from '../../source/Form/ToggleField';
import { Button } from '../../source/Form/Button';

describe('Input Group', () => {
    it('should render an Input Group with a prepend/append label', () => {
        assertLooksLike(
            <InputGroup id="test">
                Test
                <Field id="sample" />
            </InputGroup>,
            <div className="input-group" id="test">
                <label className="input-group-text" htmlFor="sample">
                    Test
                </label>
                <input type="text" className="form-control" id="sample" />
            </div>
        );
    });

    it('should render an sized Input Group with "size" property', () => {
        assertLooksLike(
            <InputGroup id="test" size="lg">
                <Field id="sample" />
            </InputGroup>,
            <div className="input-group input-group-lg" id="test">
                <input type="text" className="form-control" id="sample" />
            </div>
        );
    });

    it('should render a Radio/Checkbox as a label', () => {
        assertLooksLike(
            <InputGroup id="test">
                <ToggleField type="radio" labelHidden>
                    test
                </ToggleField>
                <Field id="sample" />
            </InputGroup>,
            <div className="input-group" id="test">
                <div className="input-group-text">
                    <input
                        className="form-check-input"
                        type="radio"
                        aria-label="test"
                    />
                </div>
                <input type="text" className="form-control" id="sample" />
            </div>
        );
    });

    it('should render Multiple Labels', () => {
        assertLooksLike(
            <InputGroup id="test">
                1
                <Field id="sample" />
                <i>2</i>
            </InputGroup>,
            <div className="input-group" id="test">
                <label className="input-group-text" htmlFor="sample">
                    1
                </label>
                <input type="text" className="form-control" id="sample" />
                <label className="input-group-text">
                    <i>2</i>
                </label>
            </div>
        );
    });

    it('should render an Input Group within Button labels', () => {
        assertLooksLike(
            <InputGroup id="test">
                <Field id="sample" />
                <Button>1</Button>
                <Button>2</Button>
            </InputGroup>,
            <div className="input-group">
                <input type="text" className="form-control" id="sample" />
                <button className="btn">1</button>
                <button className="btn">2</button>
            </div>
        );
    });
});
