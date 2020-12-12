import { assertLooksLike } from '@tech_query/snabbdom-looks-like';
import { createCell } from 'web-cell';

import { Icon } from '../../source/Reminder/Icon';

describe('BootStrap Icon', () => {
    it('should render an Icon with CSS font', () => {
        assertLooksLike(
            <Icon name="heart-fill" />,
            <i className="bi-heart-fill" />
        );
    });

    it('should render a Font Icon with Color & Size controls', () => {
        assertLooksLike(
            <Icon name="heart-fill" color="dark" size={2} />,
            <i
                className="bi-heart-fill text-dark"
                style={{ fontSize: '2rem' }}
            />
        );
    });
});
