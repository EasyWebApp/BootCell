import { expect } from 'expect';
import { describe, it } from 'node:test';

import { ProgressBar } from '../../source/Reminder/Progress';
import { render } from '../render';

describe('ProgressBar', () => {
    it('should render default bounds and primary styling', () => {
        const root = render(<ProgressBar />);
        const bar = root.querySelector('[role="progressbar"]');

        expect(bar.getAttribute('aria-valuemin')).toBe('0');
        expect(bar.getAttribute('aria-valuemax')).toBe('100');
        expect(bar.getAttribute('aria-valuenow')).toBe('0');
        expect(
            root.querySelector<HTMLElement>('.progress-bar').style.width
        ).toBe('0%');
        expect(root.querySelector('.progress-bar').className).toBe(
            'progress-bar theme-primary'
        );
    });

    it('should support default and custom labels', () => {
        expect(render(<ProgressBar now={64} label />).textContent).toBe('64%');
        expect(
            render(<ProgressBar now={64} label={now => `${now} percent`} />)
                .textContent
        ).toBe('64 percent');
    });

    it('should render bounds, striped and animated variants', () => {
        const root = render(
            <ProgressBar
                min={10}
                max={80}
                now={64}
                striped
                animated
                variant="info"
            />
        );
        expect(
            root
                .querySelector('[role="progressbar"]')
                .getAttribute('aria-valuemin')
        ).toBe('10');
        expect(
            root
                .querySelector('[role="progressbar"]')
                .getAttribute('aria-valuemax')
        ).toBe('80');
        expect(root.querySelector('.progress-bar').className).toBe(
            'progress-bar theme-info progress-bar-striped progress-bar-animated'
        );
        expect(
            root.querySelector<HTMLElement>('.progress-bar').style.width
        ).toBe('64%');
    });

    it('should stack child progress bars without adding an extra bar', () => {
        const root = render(
            <ProgressBar>
                <ProgressBar now={20} />
                <ProgressBar now={10} striped />
            </ProgressBar>
        );
        expect(
            root.firstElementChild.classList.contains('progress-stacked')
        ).toBe(true);
        expect(root.querySelectorAll('[role="progressbar"]')).toHaveLength(2);
        expect(root.querySelectorAll('.progress-bar')).toHaveLength(2);
    });
});
