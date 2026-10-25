import { assertLooksLike } from '../render';
import { describe, it } from 'node:test';

import { Badge } from '../../source/Reminder/Badge';

describe('Badge', () => {
    it('should render a Simple Badge defaultly', () => {
        assertLooksLike(
            <Badge bg="secondary">1</Badge>,
            <span className="badge theme-secondary">1</span>
        );
    });

    it('should render a Link Badge with Pill style', () => {
        assertLooksLike(
            <Badge bg="secondary" pill href="#">
                2
            </Badge>,
            <a
                className="badge theme-secondary rounded-pill text-decoration-none"
                href="#"
            >
                2
            </a>
        );
    });
});
