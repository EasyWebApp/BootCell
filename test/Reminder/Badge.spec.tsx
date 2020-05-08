import { assertLooksLike } from 'snabbdom-looks-like';
import { createCell } from 'web-cell';

import { Badge } from '../../source/Reminder/Badge';

describe('Badge', () => {
    it('should render a Simple Badge defaultly', () => {
        assertLooksLike(
            <Badge>1</Badge>,
            <span className="badge badge-secondary">1</span>
        );
    });

    it('should render a Link Badge with Pill style', () => {
        assertLooksLike(
            <Badge pill href="#">
                2
            </Badge>,
            <a className="badge badge-secondary badge-pill" href="#">
                2
            </a>
        );
    });
});
