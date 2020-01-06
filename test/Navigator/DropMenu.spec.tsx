import '../polyfill';
import { createCell } from 'web-cell';
import { assertLooksLike } from 'snabbdom-looks-like';

import { DropMenu, DropMenuProps } from '../../source/Navigator/DropMenu';

const { renderButton, render } = DropMenu.prototype;

function InlineDropMenu({
    buttonKind,
    buttonSize,
    open,
    href,
    title,
    target,
    direction = 'down',
    list
}: DropMenuProps) {
    return render.call(
        {
            UID: 'test',
            renderButton: renderButton.bind({
                UID: 'test',
                props: { buttonKind, buttonSize, open, href, title, target }
            })
        },
        { href, direction, open, list }
    );
}

describe('Drop Menu', () => {
    it('should render a Single Button menu defaultly', () => {
        assertLooksLike(
            <InlineDropMenu
                title="Demo"
                list={[{ title: 'Test', href: 'test' }]}
            />,
            <div className="dropdown">
                <button
                    className="btn btn-primary dropdown-toggle"
                    type="button"
                    id="test"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    Demo
                </button>
                <div className="dropdown-menu" aria-labelledby="test">
                    <a className="dropdown-item" href="test">
                        Test
                    </a>
                </div>
            </div>
        );
    });

    it('should render a Split Button menu with URL', () => {
        assertLooksLike(
            <InlineDropMenu
                title="Demo"
                href="example"
                list={[{ title: 'Test', href: 'test' }]}
            />,
            <div className="btn-group">
                <a
                    className="btn btn-primary"
                    href="example"
                    role="button"
                    aria-disabled="false"
                >
                    Demo
                </a>
                <button
                    type="button"
                    class="btn btn-primary dropdown-toggle dropdown-toggle-split"
                    id="test"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    <span class="sr-only">Toggle Dropdown</span>
                </button>
                <div className="dropdown-menu" aria-labelledby="test">
                    <a className="dropdown-item" href="test">
                        Test
                    </a>
                </div>
            </div>
        );
    });

    it('should render a Single-layer Button group with Single Left direction', () => {
        assertLooksLike(
            <InlineDropMenu
                title="Demo"
                direction="left"
                list={[{ title: 'Test', href: 'test' }]}
            />,
            <div className="btn-group dropleft">
                <button
                    className="btn btn-primary dropdown-toggle"
                    type="button"
                    id="test"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    Demo
                </button>
                <div className="dropdown-menu" aria-labelledby="test">
                    <a className="dropdown-item" href="test">
                        Test
                    </a>
                </div>
            </div>
        );
    });

    it('should render a Double-layer Button group with Split Left direction', () => {
        assertLooksLike(
            <InlineDropMenu
                title="Demo"
                href="example"
                direction="left"
                list={[{ title: 'Test', href: 'test' }]}
            />,
            <div className="btn-group">
                <div className="dropdown-menu" aria-labelledby="test">
                    <a className="dropdown-item" href="test">
                        Test
                    </a>
                </div>
                <div className="btn-group">
                    <a
                        className="btn btn-primary"
                        href="example"
                        role="button"
                        aria-disabled="false"
                    >
                        Demo
                    </a>
                    <button
                        type="button"
                        class="btn btn-primary dropdown-toggle dropdown-toggle-split"
                        id="test"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        <span class="sr-only">Toggle Dropdown</span>
                    </button>
                </div>
            </div>
        );
    });
});
