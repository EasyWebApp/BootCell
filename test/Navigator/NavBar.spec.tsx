import { createCell, Fragment } from 'web-cell';
import { assertLooksLike } from '@tech_query/snabbdom-looks-like';

import { NavBar, NavBarProps } from '../../source/Navigator/NavBar';
import { NavLink } from '../../source/Navigator/Nav';

const { render, renderContent } = NavBar.prototype;

function InlineNavBar({
    defaultSlot,
    narrow,
    expand = 'md',
    fixed = 'top',
    direction = 'left',
    offcanvas = false,
    theme = 'dark',
    background = 'dark',
    menuAlign = 'start',
    brand
}: NavBarProps) {
    return render.call(
        { renderContent: renderContent.bind({ UID: 'test' }) },
        {
            narrow,
            expand,
            fixed,
            direction,
            offcanvas,
            theme,
            background,
            menuAlign,
            brand,
            defaultSlot
        }
    );
}

describe('Navigator Bar', () => {
    it('should render a top-sticky dark Narrow Bar defaultly', () => {
        assertLooksLike(
            <InlineNavBar brand="Test">
                <NavLink href="/example" active>
                    Example
                </NavLink>
                <a />
            </InlineNavBar>,

            <Fragment>
                <a
                    target="_top"
                    href="."
                    className="navbar-brand d-flex align-items-center"
                >
                    Test
                </a>
                <button
                    type="button"
                    className="navbar-toggler"
                    aria-controls="test"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <collapse-box className="navbar-collapse" id="test">
                    <nav className="nav navbar-nav flex-grow-1 justify-content-start">
                        <a
                            className="nav-item nav-link text-nowrap active"
                            href="/example"
                            aria-disabled="false"
                        >
                            Example
                            <span className="sr-only">(current)</span>
                        </a>
                    </nav>
                    <div className="d-flex justify-content-end">
                        <a />
                    </div>
                </collapse-box>
            </Fragment>
        );
    });

    it('should render a reversed Narrow Bar wrapped by a container', () => {
        assertLooksLike(
            <InlineNavBar narrow direction="right" brand="Test">
                <NavLink href="/example" active>
                    Example
                </NavLink>
            </InlineNavBar>,
            <div className="container flex-row-reverse">
                <a
                    target="_top"
                    href="."
                    className="navbar-brand d-flex align-items-center"
                >
                    Test
                </a>
                <button
                    type="button"
                    className="navbar-toggler"
                    aria-controls="test"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <collapse-box className="navbar-collapse" id="test">
                    <nav className="nav navbar-nav flex-grow-1 justify-content-start">
                        <a
                            className="nav-item nav-link text-nowrap active"
                            href="/example"
                            aria-disabled="false"
                        >
                            Example
                            <span className="sr-only">(current)</span>
                        </a>
                    </nav>
                </collapse-box>
            </div>
        );
    });

    it('should render an open Offcanvas NavBar', () => {
        assertLooksLike(
            <InlineNavBar brand="Test">
                <NavLink href="/example" active>
                    Example
                </NavLink>
            </InlineNavBar>,

            <Fragment>
                <a
                    target="_top"
                    href="."
                    className="navbar-brand d-flex align-items-center"
                >
                    Test
                </a>
                <button
                    type="button"
                    className="navbar-toggler"
                    aria-controls="test"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div
                    className="d-md-flex w-100 offcanvas-collapse open"
                    id="test"
                >
                    <nav className="nav navbar-nav flex-grow-1 justify-content-start">
                        <a
                            className="nav-item nav-link text-nowrap active"
                            href="/example"
                            aria-disabled="false"
                        >
                            Example
                            <span className="sr-only">(current)</span>
                        </a>
                    </nav>
                    <div className="d-flex justify-content-end">
                        <a />
                    </div>
                </div>
            </Fragment>
        );
    });
});
