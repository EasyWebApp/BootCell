import { createCell } from 'web-cell';
import { assertLooksLike } from '@tech_query/snabbdom-looks-like';

import { Card } from '../../source/Content/Card';

describe('Card', () => {
    it('should render Vertical layout by default', () => {
        assertLooksLike(
            <Card title="Test" image="test.png" />,
            <div className="card">
                <img className="card-img-top" src="test.png" />
                <div className="card-body">
                    <h5 className="card-title">Test</h5>
                </div>
            </div>
        );
    });

    it('should render Horizontal layout as "direction" set', () => {
        assertLooksLike(
            <Card title="Test" image="test.png" direction="horizontal" />,
            <div className="card justify-content-center">
                <div className="row no-gutters align-items-center">
                    <div className="col-sm-4">
                        <img className="card-img-top" src="test.png" />
                    </div>
                    <div className="col-sm-8">
                        <div className="card-body">
                            <h5 className="card-title">Test</h5>
                        </div>
                    </div>
                </div>
            </div>
        );
    });

    it('should render Image-overlay layout as "overlay" enabled', () => {
        assertLooksLike(
            <Card
                className="bg-dark text-white"
                title="Test"
                text="example"
                image="test.png"
                overlay
            >
                <time>Last updated 3 mins ago</time>
            </Card>,
            <div className="card bg-dark text-white">
                <img className="card-img" src="test.png" />
                <div className="card-img-overlay">
                    <h5 className="card-title">Test</h5>
                    <p className="card-text">example</p>
                    <time>Last updated 3 mins ago</time>
                </div>
            </div>
        );
    });
});
