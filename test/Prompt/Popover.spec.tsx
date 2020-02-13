import '../polyfill';
import { assertLooksLike } from 'snabbdom-looks-like';
import { createCell, Fragment } from 'web-cell';

import { PopoverBox, PopoverProps } from '../../source/Prompt/Popover';
import { Button } from '../../source/Form/Button';

const { render } = PopoverBox.prototype;

function Popover({
    defaultSlot,
    header,
    body,
    position = 'top'
}: PopoverProps) {
    return render.call({ defaultSlot }, { header, body, position });
}

describe('Popover', () => {
    it('should render a Horizontal Popover defaultly', () => {
        assertLooksLike(
            <Popover header="Title" body="Content">
                <Button>Test</Button>
            </Popover>,
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
