import { assertLooksLike } from '@tech_query/snabbdom-looks-like';
import { createCell } from 'web-cell';

import { MediaObject } from '../../source/Content/MediaObject';

describe('Media Item', () => {
    it('should render Left layout defaultly', () => {
        assertLooksLike(
            <MediaObject title="Test" image="test.png" />,
            <div className="d-flex">
                <div className="flex-shrink-0">
                    <img
                        className="align-self-start"
                        style={{ width: '4rem' }}
                        src="test.png"
                        alt="Test"
                    />
                </div>
                <div className="flex-grow-1 ms-3">
                    <h5 className="mt-0">Test</h5>
                </div>
            </div>
        );
    });

    it('should render End layout based on Flex', () => {
        assertLooksLike(
            <MediaObject title="Test" image="test.png" imageColumn="end" />,
            <div className="d-flex flex-row-reverse">
                <div className="flex-shrink-0">
                    <img
                        className="align-self-start"
                        style={{ width: '4rem' }}
                        src="test.png"
                        alt="Test"
                    />
                </div>
                <div className="flex-grow-1 me-3">
                    <h5 className="mt-0">Test</h5>
                </div>
            </div>
        );
    });

    it('should be able to slot Custom Image & Text', () => {
        assertLooksLike(
            <MediaObject
                title="Test"
                image={<img src="test.png" />}
                imageColumn="end"
            >
                Example
            </MediaObject>,
            <div className="d-flex flex-row-reverse">
                <div className="flex-shrink-0">
                    <img src="test.png" />
                </div>
                <div className="flex-grow-1 me-3">
                    <h5 className="mt-0">Test</h5>
                    Example
                </div>
            </div>
        );
    });
});
