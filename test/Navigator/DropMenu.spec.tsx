import { createCell } from 'web-cell';
import { assertLooksLike } from '@tech_query/snabbdom-looks-like';

import { DropMenu, DropMenuProps } from '../../source/Navigator/DropMenu';
import { Button } from '../../source/Form/Button';

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
    return (
        <div>
            {render.call(
                {
                    renderButton: renderButton.bind({
                        UID: 'test',
                        props: {
                            buttonKind,
                            buttonSize,
                            open,
                            href,
                            title,
                            target
                        }
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
            )}
        </div>
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
            <div>
                <Button
                    className="dropdown-toggle"
                    id="test"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    Demo
                </Button>
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
            </div>
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
            <div>
                <Button
                    className="dropdown-toggle"
                    id="test"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    Demo
                </Button>
                <div
                    className="dropdown-menu dropdown-menu-md-right"
                    aria-labelledby="test"
                />
            </div>
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
            <div>
                <Button
                    className="dropdown-toggle"
                    id="test"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    Demo
                </Button>
                <div
                    className="dropdown-menu dropdown-menu-right dropdown-menu-md-left"
                    aria-labelledby="test"
                />
            </div>
        );
    });

    it('should render a Split Button menu with URL', () => {
        assertLooksLike(
            <InlineDropMenu title="Demo" href="example" list={[]} />,
            <div>
                <Button href="example">Demo</Button>
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
            </div>
        );
    });

    it('should render a Single-layer Button group with Single Left direction', () => {
        assertLooksLike(
            <InlineDropMenu title="Demo" direction="left" list={[]} />,
            <div>
                <Button
                    className="dropdown-toggle"
                    id="test"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    Demo
                </Button>
                <div className="dropdown-menu" aria-labelledby="test" />
            </div>
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
            <div>
                <div className="dropdown-menu" aria-labelledby="test" />
                <div className="btn-group">
                    <Button href="example">Demo</Button>
                    <Button
                        className="dropdown-toggle dropdown-toggle-split"
                        id="test"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        <span className="sr-only">Toggle Dropdown</span>
                    </Button>
                </div>
            </div>
        );
    });
});
