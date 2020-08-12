import { createCell } from 'web-cell';
import { assertLooksLike } from '@tech_query/snabbdom-looks-like';

import { Nav, NavLink } from '../../source/Navigator/Nav';
import { DropMenu } from '../../source/Navigator/DropMenu';

describe('Nav', () => {
    it('should render Nav Links with different states', () => {
        assertLooksLike(
            <Nav>
                <NavLink title="Test" href="#test" active />
                <NavLink title="Example" href="#example" disabled />
                <NavLink
                    title="Nested"
                    list={[{ title: 'Sample', href: '#sample' }]}
                />
            </Nav>,
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
                <NavLink title="Test" href="#test" active />
            </Nav>,
            <div className="nav-scroller bg-white shadow-sm">
                <nav className="nav nav-underline">
                    <a
                        className="nav-item nav-link text-nowrap active"
                        href="#test"
                    >
                        Test
                        <span className="sr-only">(current)</span>
                    </a>
                </nav>
            </div>
        );
    });
});
