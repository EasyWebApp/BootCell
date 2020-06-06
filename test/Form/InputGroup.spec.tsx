import { createCell, Fragment } from 'web-cell';
import { assertLooksLike } from 'snabbdom-looks-like';

import { InputGroup } from '../../source/Form/InputGroup';
import { Button } from '../../source/Form/Button';

describe('Input Group', () => {
    it('should render an Input Group with a prepend/append label', () => {
        assertLooksLike(
            <InputGroup id="test" prepend="Test" />,
            <div className="input-group">
                <div className="input-group-prepend">
                    <label
                        className="input-group-text"
                        id="test-label-0"
                        htmlFor="test"
                    >
                        Test
                    </label>
                </div>
                <input type="text" id="test" aria-describedby="test-label-0" />
            </div>
        );
    });

    it('should render an sized Input Group with "size" property', () => {
        assertLooksLike(
            <InputGroup id="test" size="lg" />,
            <div className="input-group input-group-lg">
                <input
                    type="text"
                    className="form-control"
                    id="test"
                    aria-describedby="test-label-0"
                />
            </div>
        );
    });

    it('should render a Sub DOM-tree as a label', () => {
        assertLooksLike(
            <InputGroup id="test" append={<input />} />,
            <div className="input-group">
                <input
                    type="text"
                    className="form-control"
                    id="test"
                    aria-describedby="test-label-0"
                />
                <div className="input-group-append">
                    <div className="input-group-text" id="test-label-0">
                        <input />
                    </div>
                </div>
            </div>
        );
    });

    it('should render an Input Group within a custom Input', () => {
        assertLooksLike(
            <InputGroup id="test">
                <input />
            </InputGroup>,
            <div className="input-group">
                <input />
            </div>
        );
    });

    it('should render multiple Labels with an array prepend/append property', () => {
        assertLooksLike(
            <InputGroup id="test" append={['1', <i>2</i>]} />,
            <div className="input-group">
                <input
                    type="text"
                    className="form-control"
                    id="test"
                    aria-describedby="test-label-0"
                />
                <div className="input-group-append">
                    <label
                        className="input-group-text"
                        id="test-label-0"
                        htmlFor="test"
                    >
                        1
                    </label>
                    <div className="input-group-text" id="test-label-1">
                        <i>2</i>
                    </div>
                </div>
            </div>
        );
    });

    it('should render an Input Group within Button labels', () => {
        assertLooksLike(
            <InputGroup
                id="test"
                append={
                    <Fragment>
                        <Button>1</Button>
                        <Button>2</Button>
                    </Fragment>
                }
            />,
            <div className="input-group">
                <input
                    type="text"
                    className="form-control"
                    id="test"
                    aria-describedby="test-label-0"
                />
                <div className="input-group-append">
                    <button className="btn btn-primary" id="test-label-0">
                        1
                    </button>
                    <button className="btn btn-primary" id="test-label-1">
                        2
                    </button>
                </div>
            </div>
        );
    });
});
