import { expect } from 'expect';
import { describe, it } from 'node:test';

import { Tooltip, TooltipBox } from '../../source/Prompt/Tooltip';
import { render } from '../render';

describe('Tooltip', () => {
    it('should render tooltip content and an arrow', () => {
        const root = render(<Tooltip>Notice</Tooltip>);

        expect(
            root.querySelector('[role="tooltip"]').classList.contains('show')
        ).toBe(true);
        expect(root.querySelector('.tooltip-arrow')).not.toBeNull();
        expect(root.querySelector('.tooltip-inner').textContent).toBe('Notice');
    });

    it('should toggle projected content on hover and remove listeners on disconnect', async () => {
        const tooltip = new TooltipBox();
        tooltip.content = 'Notice';
        await tooltip.connectedCallback();

        expect(tooltip.show).toBe(false);
        expect(
            render(tooltip.render()).querySelector('[role="tooltip"]')
        ).toBeNull();

        tooltip.dispatchEvent(new MouseEvent('mouseenter'));
        expect(tooltip.show).toBe(true);
        expect(
            render(tooltip.render()).querySelector('.tooltip-inner').textContent
        ).toBe('Notice');

        tooltip.dispatchEvent(new MouseEvent('mouseleave'));
        expect(tooltip.show).toBe(false);

        tooltip.disconnectedCallback();
        tooltip.dispatchEvent(new MouseEvent('mouseenter'));
        expect(tooltip.show).toBe(false);
    });
});
