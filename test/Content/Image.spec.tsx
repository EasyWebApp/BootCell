import { createCell } from 'web-cell';
import { assertLooksLike } from 'snabbdom-looks-like';

import { Image, Figure } from '../../source/Content/Image';

describe('Image components', () => {
    it('should render a thumbnail Image', () => {
        assertLooksLike(
            <Image thumbnail src="test.png" />,
            <img className="img-thumbnail" src="test.png" />
        );
    });

    it('should render a background Image', () => {
        assertLooksLike(
            <Image background src="test.png">
                Test
            </Image>,
            <div
                style={{
                    backgroundImage: `url(test.png)`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    height: '50vh'
                }}
            >
                Test
            </div>
        );
    });

    it('should render an Image in a figure box', () => {
        assertLooksLike(
            <Figure className="test" title="Test" alt="Test" src="test.png" />,
            <figure className="figure test">
                <img
                    className="img-fluid figure-img"
                    alt="Test"
                    src="test.png"
                />
                <figcaption className="figure-caption text-center">
                    Test
                </figcaption>
            </figure>
        );
    });
});
