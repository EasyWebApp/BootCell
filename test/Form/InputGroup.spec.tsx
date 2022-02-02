import { createCell, Fragment } from 'web-cell';
import { assertLooksLike } from '@tech_query/snabbdom-looks-like';

import { InputGroup } from '../../source/Form/InputGroup';
import { Field } from '../../source/Form/Field';
import { Button } from '../../source/Form/Button';

describe('Input Group', () => {
    it('should render an Input Group with a prepend/append label', () => {
        assertLooksLike(
            <InputGroup id="test">
                Test
                <Field id="sample" />
            </InputGroup>,
            <div className="input-group" id="test">
                <div className="input-group-prepend">
                    <label
                        className="input-group-text"
                        id="test-label-prepend-0"
                        htmlFor="sample"
                    >
                        Test
                    </label>
                </div>
                <input
                    type="text"
                    className="form-control rounded-end"
                    id="sample"
                    aria-describedby="test-label-prepend-0"
                />
            </div>
        );
    });

    it('should render an sized Input Group with "size" property', () => {
        assertLooksLike(
            <InputGroup id="test" size="lg">
                <Field id="sample" />
            </InputGroup>,
            <div className="input-group input-group-lg" id="test">
                <input
                    type="text"
                    className="form-control rounded-end"
                    id="sample"
                    aria-describedby="test-label-append-0"
                />
            </div>
        );
    });

    it('should render a Sub DOM-tree as a label', () => {
        assertLooksLike(
            <InputGroup id="test">
                <Field id="sample" />
                <input />
            </InputGroup>,
            <div className="input-group" id="test">
                <input
                    type="text"
                    className="form-control"
                    id="sample"
                    aria-describedby="test-label-append-0"
                />
                <div className="input-group-append rounded-end">
                    <div className="input-group-text" id="test-label-append-0">
                        <input />
                    </div>
                </div>
            </div>
        );
    });

    it('should render Multiple Labels', () => {
        assertLooksLike(
            <InputGroup id="test">
                <Field id="sample" />1<i>2</i>
            </InputGroup>,
            <div className="input-group" id="test">
                <input
                    type="text"
                    className="form-control"
                    id="sample"
                    aria-describedby="test-label-append-0"
                />
                <div className="input-group-append">
                    <label
                        className="input-group-text"
                        id="test-label-append-0"
                        htmlFor="sample"
                    >
                        1
                    </label>
                    <div className="input-group-text" id="test-label-append-1">
                        <i>2</i>
                    </div>
                </div>
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
                <input
                    type="text"
                    className="form-control"
                    id="sample"
                    aria-describedby="test-label-append-0"
                />
                <div className="input-group-append">
                    <button className="btn" id="test-label-append-0">
                        1
                    </button>
                    <button className="btn" id="test-label-append-1">
                        2
                    </button>
                </div>
            </div>
        );
    });
});
