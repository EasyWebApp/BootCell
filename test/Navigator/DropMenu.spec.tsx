import '../polyfill';
import { createCell, Fragment } from 'web-cell';
import { assertLooksLike } from 'snabbdom-looks-like';

import { DropMenu, DropMenuProps } from '../../source/Navigator/DropMenu';

const { renderButton, renderItem, renderList, render } = DropMenu.prototype;

function InlineDropMenu({
    buttonKind,
    buttonSize,
    open,
    href,
    title,
    target,
    alignType = 'left',
    alignSize = '',
    direction = 'down',
    list
}: DropMenuProps) {
    return render.call(
        {
            renderButton: renderButton.bind({
                UID: 'test',
                props: { buttonKind, buttonSize, open, href, title, target }
            }),
            renderList: renderList.bind({
                renderItem,
                alignType,
                alignSize,
                open,
                UID: 'test',
                list
            })
        },
        { href, direction }
    );
}

describe('Drop Menu', () => {
    it('should render a Single Button menu with Variants of Menu Items defaultly', () => {
        assertLooksLike(
            <InlineDropMenu
                title="Demo"
                list={[
                    { title: 'Test', href: 'test', active: true },
                    { title: 'Example', href: 'example', disabled: true },
                    {},
                    { title: 'Sample' }
                ]}
            />,
            <Fragment>
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
                    <a
                        className="dropdown-item active"
                        href="test"
                        aria-disabled="false"
                    >
                        Test
                    </a>
                    <a
                        className="dropdown-item disabled"
                        href="example"
                        tabIndex={-1}
                        aria-disabled="true"
                    >
                        Example
                    </a>
                    <div className="dropdown-divider" />
                    <span className="dropdown-item-text">Sample</span>
                </div>
            </Fragment>
        );
    });

    it('should render a Responsive Right-align Menu', () => {
        assertLooksLike(
            <InlineDropMenu
                title="Demo"
                alignType="right"
                alignSize="md"
                list={[]}
            />,
            <Fragment>
                <button
                    className="btn btn-primary dropdown-toggle"
                    type="button"
                    id="test"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    Demo
                </button>
                <div
                    className="dropdown-menu dropdown-menu-md-right"
                    aria-labelledby="test"
                />
            </Fragment>
        );
    });

    it('should render a Responsive Left-align Menu', () => {
        assertLooksLike(
            <InlineDropMenu
                title="Demo"
                alignType="left"
                alignSize="md"
                list={[]}
            />,
            <Fragment>
                <button
                    className="btn btn-primary dropdown-toggle"
                    type="button"
                    id="test"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    Demo
                </button>
                <div
                    className="dropdown-menu dropdown-menu-right dropdown-menu-md-left"
                    aria-labelledby="test"
                />
            </Fragment>
        );
    });

    it('should render a Split Button menu with URL', () => {
        assertLooksLike(
            <InlineDropMenu title="Demo" href="example" list={[]} />,
            <Fragment>
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
                    className="btn btn-primary dropdown-toggle dropdown-toggle-split"
                    id="test"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    <span className="sr-only">Toggle Dropdown</span>
                </button>
                <div className="dropdown-menu" aria-labelledby="test" />
            </Fragment>
        );
    });

    it('should render a Single-layer Button group with Single Left direction', () => {
        assertLooksLike(
            <InlineDropMenu title="Demo" direction="left" list={[]} />,
            <Fragment>
                <button
                    className="btn btn-primary dropdown-toggle"
                    type="button"
                    id="test"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    Demo
                </button>
                <div className="dropdown-menu" aria-labelledby="test" />
            </Fragment>
        );
    });

    it('should render a Double-layer Button group with Split Left direction', () => {
        assertLooksLike(
            <InlineDropMenu
                title="Demo"
                href="example"
                direction="left"
                list={[]}
            />,
            <Fragment>
                <div className="dropdown-menu" aria-labelledby="test" />
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
                        className="btn btn-primary dropdown-toggle dropdown-toggle-split"
                        id="test"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        <span className="sr-only">Toggle Dropdown</span>
                    </button>
                </div>
            </Fragment>
        );
    });
});
