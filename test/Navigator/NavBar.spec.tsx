import { createCell, Fragment } from 'web-cell';
import { assertLooksLike } from '@tech_query/snabbdom-looks-like';
import {
    BannerNavBar,
    BannerNavBarProps,
    NavBar,
    NavBarProps,
    NavBarToggler
} from '../../source/Navigator/NavBar';
import { NavLink } from '../../source/Navigator/Nav';
import { CollapseBox } from '../../source/Content/Collapse';

const { render: renderBanner } = BannerNavBar.prototype;

function InlineBanner({
    defaultSlot,
    narrow,
    expand = 'md',
    fixed = 'top',
    direction = 'left',
    theme = 'dark',
    background = 'dark',
    brand,
    open = false
}: BannerNavBarProps) {
    return renderBanner.call(
        { UID: 'test' },
        {
            narrow,
            expand,
            fixed,
            direction,
            theme,
            background,
            brand,
            open,
            defaultSlot
        }
    );
}

const { render, renderContent } = NavBar.prototype;

function InlineNavBar({
    defaultSlot,
    narrow,
    expand = 'md',
    fixed = 'top',
    direction = 'left',
    drawer = false,
    theme = 'dark',
    background = 'dark',
    menuAlign = 'start',
    brand,
    open = false
}: NavBarProps) {
    return render.call(
        { renderContent: renderContent.bind({ UID: 'test' }) },
        {
            narrow,
            expand,
            fixed,
            direction,
            drawer,
            theme,
            background,
            menuAlign,
            brand,
            open,
            defaultSlot
        }
    );
}

describe('Navigator Bar', () => {
    it('should render a Toggle Button with ARIA properties', () => {
        assertLooksLike(
            <NavBarToggler aria-controls="test" aria-expanded="true" />,
            <button
                type="button"
                className="navbar-toggler"
                aria-controls="test"
                aria-expanded="true"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon" />
            </button>
        );
    });

    it('should render a simple NavBar with extra content on the top', () => {
        assertLooksLike(
            <InlineBanner brand="Test">text</InlineBanner>,
            <>
                <CollapseBox id="test" open={false}>
                    test
                </CollapseBox>
                <div className="navbar" data-bs-theme="dark">
                    <div className="container-fluid">
                        <a className="navbar-brand" href=".">
                            Test
                        </a>
                        <NavBarToggler
                            aria-controls="test"
                            aria-expanded="false"
                        />
                    </div>
                </div>
            </>
        );
    });

    it('should render a narrow NavBar with extra content on the top', () => {
        assertLooksLike(
            <InlineBanner narrow brand="Test">
                text
            </InlineBanner>,
            <>
                <CollapseBox id="test" open={false}>
                    <div className="container">test</div>
                </CollapseBox>
                <div className="navbar" data-bs-theme="dark">
                    <div className="container">
                        <a className="navbar-brand" href=".">
                            Test
                        </a>
                        <NavBarToggler
                            aria-controls="test"
                            aria-expanded="false"
                        />
                    </div>
                </div>
            </>
        );
    });

    it('should render a top-sticky dark Narrow Bar defaultly', () => {
        assertLooksLike(
            <InlineNavBar brand="Test">
                <NavLink href="/example" active>
                    Example
                </NavLink>
                <a />
            </InlineNavBar>,

            <div className="container-fluid">
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
                <CollapseBox className="drawer drawer-end" id="test">
                    <nav className="nav navbar-nav flex-grow-1 justify-content-start">
                        <a
                            className="nav-item nav-link text-nowrap active"
                            href="/example"
                            aria-disabled="false"
                        >
                            Example
                            <span className="visually-hidden">(current)</span>
                        </a>
                    </nav>
                    <div className="md:d-flex justify-content-end align-items-center">
                        <a />
                    </div>
                </CollapseBox>
            </div>
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
                <CollapseBox className="drawer drawer-end" id="test">
                    <nav className="nav navbar-nav flex-grow-1 justify-content-start">
                        <a
                            className="nav-item nav-link text-nowrap active"
                            href="/example"
                            aria-disabled="false"
                        >
                            Example
                            <span className="visually-hidden">(current)</span>
                        </a>
                    </nav>
                </CollapseBox>
            </div>
        );
    });

    it('should render an open Drawer NavBar', () => {
        assertLooksLike(
            <InlineNavBar brand="Test" drawer open>
                <NavLink href="/example" active>
                    Example
                </NavLink>
            </InlineNavBar>,

            <div className="container-fluid">
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
                    aria-expanded="true"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="md:d-flex w-100 drawer open" id="test">
                    <nav className="nav navbar-nav flex-grow-1 justify-content-start">
                        <a
                            className="nav-item nav-link text-nowrap active"
                            href="/example"
                            aria-disabled="false"
                        >
                            Example
                            <span className="visually-hidden">(current)</span>
                        </a>
                    </nav>
                </div>
            </div>
        );
    });
});
