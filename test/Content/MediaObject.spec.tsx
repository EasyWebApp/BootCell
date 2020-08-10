import { assertLooksLike } from '@tech_query/snabbdom-looks-like';
import { createCell } from 'web-cell';

import { MediaObject } from '../../source/Content/MediaObject';

describe('Media Item', () => {
    it('should render Left layout defaultly', () => {
        assertLooksLike(
            <MediaObject title="Test" image="test.png" />,
            <div className="media">
                <img
                    className="align-self-start mr-3"
                    style={{ width: '4rem' }}
                    src="test.png"
                    alt="Test"
                />
                <div className="media-body">
                    <h5 className="mt-0">Test</h5>
                </div>
            </div>
        );
    });

    it('should render Right layout based on Flex', () => {
        assertLooksLike(
            <MediaObject title="Test" image="test.png" imageColumn="right" />,
            <div className="media flex-row-reverse">
                <img
                    className="align-self-start ml-3"
                    style={{ width: '4rem' }}
                    src="test.png"
                    alt="Test"
                />
                <div className="media-body">
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
                imageColumn="right"
            >
                Example
            </MediaObject>,
            <div className="media flex-row-reverse">
                <img src="test.png" />
                <div className="media-body">
                    <h5 className="mt-0">Test</h5>
                    Example
                </div>
            </div>
        );
    });
});
