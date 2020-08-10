import { createCell } from 'web-cell';
import { assertLooksLike } from '@tech_query/snabbdom-looks-like';

import { Embed } from '../../source/Media/Embed';

describe('Embed media', () => {
    it('should render a responsive iframe', () => {
        assertLooksLike(
            <Embed is="iframe" src="test.html" />,
            <div className="embed-responsive embed-responsive-16by9">
                <iframe
                    className="embed-responsive-item"
                    lazyLoad="1"
                    loading="lazy"
                    src="test.html"
                />
            </div>
        );
    });

    it('should render a responsive video/audio', () => {
        assertLooksLike(
            <Embed is="video" ratio="4/3" src="test.mp4" />,
            <div className="embed-responsive embed-responsive-4by3">
                <video className="embed-responsive-item" src="test.mp4" />
            </div>
        );
    });
});
