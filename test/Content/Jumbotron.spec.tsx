import { assertLooksLike } from '@tech_query/snabbdom-looks-like';
import { createCell } from 'web-cell';

import { Jumbotron } from '../../source/Content/Jumbotron';

describe('Jumbotron', () => {
    it('should render a Simple Jumbotron defaultly', () => {
        assertLooksLike(
            <Jumbotron title="Test" description="test">
                <p>Example</p>
            </Jumbotron>,
            <header className="bg-1 rounded-5 py-12 px-12">
                <div className="container ">
                    <h1 className="fs-5xl fw-light">Test</h1>
                    <p className="fs-lg fw-light">test</p>
                    <hr className="my-7" />
                    <p>Example</p>
                </div>
            </header>
        );
    });

    it('should render a Fluid Jumbotron with an Inner Container', () => {
        assertLooksLike(
            <Jumbotron title="Test" description="test" fluid />,
            <header className="bg-1 rounded-0 py-12">
                <div className="container-fluid ">
                    <h1 className="fs-5xl fw-light">Test</h1>
                    <p className="fs-lg fw-light">test</p>
                </div>
            </header>
        );
    });
});
