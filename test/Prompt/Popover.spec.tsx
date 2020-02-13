import '../polyfill';
import { assertLooksLike } from 'snabbdom-looks-like';
import { createCell, Fragment } from 'web-cell';

import { PopoverBox } from '../../source/Prompt/Popover';
import { Button } from '../../source/Form/Button';

const { render } = PopoverBox.prototype;

describe('Popover', () => {
    it('should render a Horizontal Popover defaultly', () => {
        assertLooksLike(
            render({
                defaultSlot: [<Button>Test</Button>],
                header: 'Title',
                body: 'Content',
                position: 'top'
            }),
            <Fragment>
                <Button>Test</Button>
                <div className="popover bs-popover-top fade" role="tooltip">
                    <div className="arrow" />
                    <h3 className="popover-header">Title</h3>
                    <div className="popover-body">Content</div>
                </div>
            </Fragment>
        );
    });
});
