import '../polyfill';
import { assertLooksLike } from 'snabbdom-looks-like';
import { createCell } from 'web-cell';

import { Jumbotron } from '../../source/Content/Jumbotron';

describe('Jumbotron', () => {
    it('should render a Simple Jumbotron defaultly', () => {
        assertLooksLike(
            <Jumbotron title="Test" description="test">
                <p>Example</p>
            </Jumbotron>,
            <header className="jumbotron">
                <h1 className="display-4">Test</h1>
                <p className="lead">test</p>
                <hr className="my-4" />
                <p>Example</p>
            </header>
        );
    });

    it('should render a Fluid Jumbotron with an Inner Container', () => {
        assertLooksLike(
            <Jumbotron title="Test" description="test" fluid />,
            <header className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-4">Test</h1>
                    <p className="lead">test</p>
                </div>
            </header>
        );
    });
});
