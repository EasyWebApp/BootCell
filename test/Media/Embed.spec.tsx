import { createCell } from 'web-cell';
import { assertLooksLike } from '@tech_query/snabbdom-looks-like';

import { Embed } from '../../source/Media/Embed';

describe('Embed media', () => {
    it('should render a responsive iframe', () => {
        assertLooksLike(
            <Embed is="iframe" src="test.html" />,
            <div className="ratio ratio-16x9">
                <iframe
                    // @ts-ignore
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
            <div className="ratio ratio-4x3">
                <video src="test.mp4" />
            </div>
        );
    });
});
