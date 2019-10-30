import './DOM-polyfill';
import { createCell } from 'web-cell';
import { assertLooksLike } from 'snabbdom-looks-like';

import { Nav } from '../source';

describe('Nav', () => {
    it('should render Nav Links with different states', () => {
        assertLooksLike(
            <Nav
                list={[
                    { title: 'Test', href: '#test' },
                    { title: 'Example', href: '#example', disabled: true }
                ]}
            />,
            <nav className="nav">
                <a
                    className="nav-item nav-link text-nowrap active"
                    href="#test"
                >
                    Test
                </a>
                <a
                    className="nav-item nav-link text-nowrap disabled"
                    href="#example"
                    tabIndex={-1}
                    aria-disabled="true"
                >
                    Example
                </a>
            </nav>
        );
    });
});
