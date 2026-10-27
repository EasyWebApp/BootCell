import { describe, it } from 'node:test';
import { assertLooksLike } from 'dom-renderer/assert';

import { BGIcon, Icon } from '../../source/Reminder/Icon';

describe('BootStrap Icon', () => {
    it('should render an Icon with CSS font', () => {
        assertLooksLike(
            <Icon name="heart-fill" />,
            <i className="bi-heart-fill" />
        );
    });

    it('should render a Font Icon with Color & Size controls', () => {
        assertLooksLike(
            <Icon name="heart-fill" color="body" size={2} />,
            <i className="bi-heart-fill fg-body" style={{ fontSize: '2rem' }} />
        );
    });

    it('should set background and foreground colors independently', () => {
        assertLooksLike(
            <BGIcon name="heart-fill" bg="subtle-accent" color="accent" />,
            <span className="d-inline-block p-5 bg-subtle-accent rounded">
                <Icon name="heart-fill" color="accent" />
            </span>
        );
        assertLooksLike(
            <BGIcon name="heart-fill" />,
            <span className="d-inline-block p-5 bg-primary rounded">
                <Icon name="heart-fill" color="contrast-primary" />
            </span>
        );
    });
});
