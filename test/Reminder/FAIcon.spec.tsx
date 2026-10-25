import { describe, it } from 'node:test';
import { assertLooksLike } from '../render';

import { FAIcon, FABGIcon } from '../../source/Reminder/FAIcon';

describe('FontAwesome Icon', () => {
    it('should render a Solid-style Icon defaultly', () => {
        assertLooksLike(
            <FAIcon name="home" />,
            <span className="fas fa-home" aria-hidden="true" />
        );
    });

    it('should render a Bigger Icon with a Scale', () => {
        assertLooksLike(
            <FAIcon name="home" size="xs" />,
            <span className="fas fa-home fa-xs" aria-hidden="true" />
        );
        assertLooksLike(
            <FAIcon name="home" size={2} />,
            <span className="fas fa-home fa-2x" aria-hidden="true" />
        );
    });

    it('should use Bootstrap 6 foreground utilities for its color', () => {
        assertLooksLike(
            <FAIcon name="home" color="body" />,
            <span className="fas fa-home fg-body" aria-hidden="true" />
        );
    });

    it('should render an Icon with Padding wrapper for List items', () => {
        assertLooksLike(
            <ul className="fa-ul">
                <li>
                    <FAIcon name="home" listItem />
                    Home
                </li>
            </ul>,
            <ul className="fa-ul">
                <li>
                    <span className="fa-li">
                        <span className="fas fa-home" aria-hidden="true" />
                    </span>
                    Home
                </li>
            </ul>
        );
    });

    it('should render a Stacked Square Icon', () => {
        assertLooksLike(
            <FABGIcon type="square" name="github" size={2} color="body" />,
            <span className="fa-stack fa-2x fg-body">
                <FAIcon name="square" stack={2} />
                <FAIcon name="github" inverse stack={1} />
            </span>
        );
    });
});
