import { createCell } from 'web-cell';
import { assertLooksLike } from '@tech_query/snabbdom-looks-like';

import { Image } from '../../source/Media/Image';

describe('Image components', () => {
    it('should render a thumbnail Image', () => {
        assertLooksLike(
            <Image thumbnail src="test.png" />,
            <img
                className="img-thumbnail"
                src="test.png"
                lazyLoad="1"
                loading="lazy"
            />
        );
    });

    it('should render a background Image', () => {
        assertLooksLike(
            <Image background src="test.png">
                Test
            </Image>,
            <div
                className="back-image"
                style={{ backgroundImage: `url(test.png)` }}
            >
                Test
            </div>
        );
    });

    it('should render an Image in a figure box', () => {
        assertLooksLike(
            <Image className="test" caption="Test" alt="Test" src="test.png" />,
            <figure className="figure test">
                <img
                    className="img-fluid figure-img"
                    alt="Test"
                    src="test.png"
                    lazyLoad="1"
                    loading="lazy"
                />
                <figcaption className="figure-caption text-center">
                    Test
                </figcaption>
            </figure>
        );
    });
});
