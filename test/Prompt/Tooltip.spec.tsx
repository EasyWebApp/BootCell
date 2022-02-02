import { assertLooksLike } from '@tech_query/snabbdom-looks-like';
import { createCell } from 'web-cell';

import { TooltipBox } from '../../source/Prompt/Tooltip';
import { Button } from '../../source/Form/Button';

const { render } = TooltipBox.prototype;

describe('Tooltip', () => {
    it('should render a Horizontal Tooltip defaultly', () => {
        assertLooksLike(
            <div>
                {render({
                    defaultSlot: [<Button>Test</Button>],
                    text: 'notice',
                    position: 'top'
                })}
            </div>,
            <div>
                <Button>Test</Button>
                <div className="tooltip bs-tooltip-top fade" role="tooltip">
                    <div className="tooltip-arrow" />
                    <div className="tooltip-inner">notice</div>
                </div>
            </div>
        );
    });
});
