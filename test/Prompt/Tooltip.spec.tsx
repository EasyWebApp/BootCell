import '../polyfill';
import { assertLooksLike } from 'snabbdom-looks-like';
import { createCell, Fragment } from 'web-cell';

import { TooltipBox } from '../../source/Prompt/Tooltip';
import { Button } from '../../source/Form/Button';

const { render } = TooltipBox.prototype;

describe('Tooltip', () => {
    it('should render a Horizontal Tooltip defaultly', () => {
        assertLooksLike(
            render({
                defaultSlot: [<Button>Test</Button>],
                text: 'notice',
                position: 'top'
            }),
            <Fragment>
                <Button>Test</Button>
                <div className="tooltip bs-tooltip-top fade" role="tooltip">
                    <div className="arrow" />
                    <div className="tooltip-inner">notice</div>
                </div>
            </Fragment>
        );
    });
});
