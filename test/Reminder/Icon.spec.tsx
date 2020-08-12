import { assertLooksLike } from '@tech_query/snabbdom-looks-like';
import { createCell } from 'web-cell';

import { Icon } from '../../source/Reminder/Icon';

describe('BootStrap Icon', () => {
    it('should render a SVG sprite with 1rem size & Current color', () => {
        assertLooksLike(
            <Icon name="heart-fill" />,
            <svg fill="currentColor" width={16} height={16} viewBox="0 0 16 16">
                <use {...{ 'xlink:href': '#heart-fill' }} />
            </svg>
        );
    });
});
