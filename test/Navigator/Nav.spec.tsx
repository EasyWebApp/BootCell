import 'web-cell/source/utility/polyfill';
import { createCell } from 'web-cell';
import { assertLooksLike } from 'snabbdom-looks-like';

import { Nav } from '../../source/Navigator/Nav';
import { DropMenu } from '../../source/Navigator/DropMenu';

describe('Nav', () => {
    it('should render Nav Links with different states', () => {
        assertLooksLike(
            <Nav
                list={[
                    { title: 'Test', href: '#test' },
                    { title: 'Example', href: '#example', disabled: true },
                    {
                        title: 'Nested',
                        list: [{ title: 'Sample', href: '#sample' }]
                    }
                ]}
            />,
            <nav className="nav">
                <a
                    className="nav-item nav-link text-nowrap active"
                    href="#test"
                >
                    Test
                    <span className="sr-only">(current)</span>
                </a>
                <a
                    className="nav-item nav-link text-nowrap disabled"
                    href="#example"
                    tabIndex={-1}
                    aria-disabled="true"
                >
                    Example
                </a>
                <DropMenu
                    title="Nested"
                    list={[{ title: 'Sample', href: '#sample' }]}
                />
            </nav>
        );
    });
});
