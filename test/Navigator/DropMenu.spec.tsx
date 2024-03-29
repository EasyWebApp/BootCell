import { createCell } from 'web-cell';
import { assertLooksLike } from '@tech_query/snabbdom-looks-like';
import {
    DropMenu,
    DropMenuProps,
    DropMenuItem
} from '../../source/Navigator/DropMenu';
import { Button } from '../../source/Form/Button';

const { renderButton, render } = DropMenu.prototype;

function InlineDropMenu({
    buttonColor,
    buttonSize,
    open,
    href,
    caption,
    target,
    alignType = 'start',
    alignSize = '',
    direction = 'down',
    defaultSlot
}: DropMenuProps) {
    const UID = 'test';

    return (
        <div>
            {render.call(
                {
                    UID,
                    renderButton: renderButton.bind({
                        UID,
                        props: {
                            buttonColor,
                            buttonSize,
                            open,
                            href,
                            caption,
                            target
                        }
                    })
                },
                { alignType, alignSize, open, defaultSlot, href, direction }
            )}
        </div>
    );
}

describe('Drop Menu', () => {
    it('should render a Single Button menu with Variants of Menu Items defaultly', () => {
        assertLooksLike(
            <InlineDropMenu caption="Demo">
                <DropMenuItem href="test" active>
                    Test
                </DropMenuItem>
                <DropMenuItem href="example" disabled>
                    Example
                </DropMenuItem>
                <DropMenuItem />
                <DropMenuItem>Sample</DropMenuItem>
            </InlineDropMenu>,
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

    it('should render a Responsive End-align Menu', () => {
        assertLooksLike(
            <InlineDropMenu caption="Demo" alignType="end" alignSize="md" />,
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
                    className="dropdown-menu dropdown-menu-md-end"
                    aria-labelledby="test"
                />
            </div>
        );
    });

    it('should render a Responsive Start-align Menu', () => {
        assertLooksLike(
            <InlineDropMenu caption="Demo" alignType="start" alignSize="md" />,
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
                    className="dropdown-menu dropdown-menu-end dropdown-menu-md-start"
                    aria-labelledby="test"
                />
            </div>
        );
    });

    it('should render a Split Button menu with URL', () => {
        assertLooksLike(
            <InlineDropMenu caption="Demo" href="example" />,
            <div>
                <Button href="example">Demo</Button>
                <button
                    type="button"
                    className="btn dropdown-toggle dropdown-toggle-split"
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

    it('should render a Single-layer Button group with Single Start direction', () => {
        assertLooksLike(
            <InlineDropMenu caption="Demo" direction="start" />,
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

    it('should render a Double-layer Button group with Split Start direction', () => {
        assertLooksLike(
            <InlineDropMenu caption="Demo" href="example" direction="start" />,
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
