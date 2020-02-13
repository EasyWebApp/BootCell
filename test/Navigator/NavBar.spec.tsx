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
                        href: '/example',
                        active: true
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
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="test">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link" href="/example">
                                Example
                                <span className="sr-only">(current)</span>
                            </a>
                        </li>
                    </ul>
                    <div className="flex-grow-1 d-flex justify-content-end">
                        <a />
                    </div>
                </div>
            </div>
        );
    });
});
