import '../DOM-polyfill';
import { createCell } from 'web-cell';
import { assertLooksLike } from 'snabbdom-looks-like';
import { NavBar } from '../../source';

describe('Navigator Bar', () => {
    it('should render Narrow Bar', () => {
        assertLooksLike(
            NavBar.prototype.render.call(
                { UID: 'test' },
                {
                    theme: 'dark',
                    background: 'dark',
                    expand: 'md',
                    fixed: 'top',
                    narrow: true,
                    title: 'Test',
                    menu: [
                        {
                            title: 'Example',
                            href: '/example',
                            active: true
                        }
                    ]
                }
            ),
            <header className="navbar navbar-dark bg-dark box-shadow navbar-expand-md fixed-top">
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
                    </div>
                </div>
            </header>
        );
    });
});
