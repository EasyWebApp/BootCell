import { assertLooksLike } from '@tech_query/snabbdom-looks-like';
import { createCell } from 'web-cell';

import { Jumbotron } from '../../source/Content/Jumbotron';

describe('Jumbotron', () => {
    it('should render a Simple Jumbotron defaultly', () => {
        assertLooksLike(
            <Jumbotron title="Test" description="test">
                <p>Example</p>
            </Jumbotron>,
            <header className="bg-light mb-4 py-5 px-5 rounded-3">
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
            <header className="bg-light mb-4 py-5 rounded-0">
                <div className="container">
                    <h1 className="display-4">Test</h1>
                    <p className="lead">test</p>
                </div>
            </header>
        );
    });
});
