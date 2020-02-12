import '../polyfill';
import { assertLooksLike } from 'snabbdom-looks-like';
import { createCell, Fragment } from 'web-cell';

import { TooltipBox, TooltipProps } from '../../source/Prompt/Tooltip';
import { Button } from '../../source/Form/Button';

const { render } = TooltipBox.prototype;

function Tooltip({ defaultSlot, text, position = 'top' }: TooltipProps) {
    return render.call({ defaultSlot }, { text, position });
}

describe('Tooltip', () => {
    it('should render a Horizontal Tooltip defaultly', () => {
        assertLooksLike(
            <Tooltip text="notice">
                <Button>Test</Button>
            </Tooltip>,
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
