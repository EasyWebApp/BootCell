import '../polyfill';
import { createCell } from 'web-cell';
import { assertLooksLike } from 'snabbdom-looks-like';

import { NavBar, NavBarProps } from '../../source/Navigator/NavBar';

const { render, renderContent } = NavBar.prototype;

function InlineNavBar({
    defaultSlot,
    brand,
    menu,
    theme,
    background,
    expand,
    fixed,
    narrow
}: NavBarProps) {
    return render.call(
        { renderContent: renderContent.bind({ UID: 'test' }) },
        {
            brand,
            menu,
            theme,
            background,
            expand,
            fixed,
            narrow,
            defaultSlot
        }
    );
}

describe('Navigator Bar', () => {
    it('should render Narrow Bar', () => {
        assertLooksLike(
            <InlineNavBar
                brand="Test"
                theme="dark"
                background="dark"
                expand="xs"
                fixed="top"
                narrow={true}
                menu={[
                    {
                        title: 'Example',
                        href: '/example'
                    }
                ]}
            >
                <a />
            </InlineNavBar>,

            <div className="container">
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
                <div className="collapse navbar-collapse" id="test">
                    <nav className="nav navbar-nav">
                        <a
                            className="nav-item nav-link text-nowrap active"
                            href="/example"
                            aria-disabled="false"
                        >
                            Example
                            <span className="sr-only">(current)</span>
                        </a>
                    </nav>
                    <div className="flex-grow-1 d-flex justify-content-end">
                        <a />
                    </div>
                </div>
            </div>
        );
    });
});
