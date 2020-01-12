import '../polyfill';
import { assertLooksLike } from 'snabbdom-looks-like';
import { createCell } from 'web-cell';

import { MediaItem } from '../../source/Content/MediaItem';

describe('Media Item', () => {
    it('should render Left layout defaultly', () => {
        assertLooksLike(
            <MediaItem title="Test" image="test.png" />,
            <section className="media">
                <img
                    src="test.png"
                    className="align-self-start mr-3"
                    alt="Test"
                />
                <div className="media-body">
                    <h5 className="mt-0">Test</h5>
                </div>
            </section>
        );
    });

    it('should render Right layout based on Flex', () => {
        assertLooksLike(
            <MediaItem title="Test" image="test.png" imageColumn="right" />,
            <section className="media flex-row-reverse">
                <img
                    src="test.png"
                    className="align-self-start ml-3"
                    alt="Test"
                />
                <div className="media-body">
                    <h5 className="mt-0">Test</h5>
                </div>
            </section>
        );
    });

    it('should be able to slot Custom Image & Text', () => {
        assertLooksLike(
            <MediaItem
                title="Test"
                image={<img src="test.png" />}
                imageColumn="right"
            >
                Example
            </MediaItem>,
            <section className="media flex-row-reverse">
                <img src="test.png" />
                <div className="media-body">
                    <h5 className="mt-0">Test</h5>
                    Example
                </div>
            </section>
        );
    });
});
