import { assertLooksLike } from 'dom-renderer/assert';
import { describe, it } from 'node:test';
import { expect } from 'expect';
import { Status } from '../../source/type';

import { Badge } from '../../source/Reminder/Badge';

describe('Badge', () => {
    it('should render a Simple Badge defaultly', () => {
        assertLooksLike(
            <Badge bg="secondary">1</Badge>,
            <span className="badge theme-secondary bg-secondary">1</span>
        );
    });

    it('should render a Link Badge with Pill style', () => {
        assertLooksLike(
            <Badge bg="secondary" pill href="#">
                2
            </Badge>,
            <a
                className="badge theme-secondary bg-secondary rounded-pill text-decoration-none"
                href="#"
            >
                2
            </a>
        );
    });

    it('should apply contrast themes only to semantic backgrounds and preserve explicit text colors', () => {
        for (const bg of Object.keys(Status) as (keyof typeof Status)[])
            expect(Badge({ bg }).props.className).toBe(
                `badge theme-${bg} bg-${bg}`
            );
        assertLooksLike(
            <Badge bg="1" text="primary">
                Test
            </Badge>,
            <span className="badge bg-1 fg-primary">Test</span>
        );
    });
});
