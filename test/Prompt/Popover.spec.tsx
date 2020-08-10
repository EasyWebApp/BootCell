import { assertLooksLike } from '@tech_query/snabbdom-looks-like';
import { createCell } from 'web-cell';

import { PopoverBox } from '../../source/Prompt/Popover';
import { Button } from '../../source/Form/Button';

const { render } = PopoverBox.prototype;

describe('Popover', () => {
    it('should render a Horizontal Popover defaultly', () => {
        assertLooksLike(
            <div>
                {render({
                    defaultSlot: [<Button>Test</Button>],
                    header: 'Title',
                    body: 'Content',
                    position: 'top'
                })}
            </div>,
            <div>
                <Button>Test</Button>
                <div className="popover bs-popover-top fade" role="tooltip">
                    <div className="arrow" />
                    <h3 className="popover-header text-nowrap">Title</h3>
                    <div className="popover-body">Content</div>
                </div>
            </div>
        );
    });
});
