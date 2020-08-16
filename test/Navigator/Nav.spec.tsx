import { createCell } from 'web-cell';
import { assertLooksLike } from '@tech_query/snabbdom-looks-like';

import { Nav, NavLink } from '../../source/Navigator/Nav';
import { DropMenu, DropMenuItem } from '../../source/Navigator/DropMenu';

describe('Nav', () => {
    it('should render Nav Links with different states', () => {
        assertLooksLike(
            <Nav>
                <NavLink href="#test" active>
                    Test
                </NavLink>
                <NavLink href="#example" disabled>
                    Example
                </NavLink>
                <NavLink list={[{ title: 'Sample', href: '#sample' }]}>
                    Nested
                </NavLink>
            </Nav>,
            <nav className="nav">
                <a
                    className="nav-item nav-link text-nowrap active"
                    href="#test"
                    aria-disabled="false"
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
                <DropMenu caption="Nested" aria-disabled="false" />
            </nav>
        );
    });

    it('should render a Nav within multiple style items', () => {
        assertLooksLike(
            <Nav itemMode="tabs" />,
            <nav className="nav nav-tabs" />
        );
        assertLooksLike(
            <Nav itemMode="pills" />,
            <nav className="nav nav-pills" />
        );
        assertLooksLike(
            <Nav itemMode="masthead" />,
            <nav className="nav nav-masthead" />
        );
    });

    it('should render a Nav wrapped by a Scroller', () => {
        assertLooksLike(
            <Nav scrollable>
                <NavLink href="#test" active>
                    Test
                </NavLink>
            </Nav>,
            <div className="nav-scroller bg-white shadow-sm">
                <nav className="nav nav-underline">
                    <a
                        className="nav-item nav-link text-nowrap active"
                        href="#test"
                        aria-disabled="false"
                    >
                        Test
                        <span className="sr-only">(current)</span>
                    </a>
                </nav>
            </div>
        );
    });
});
