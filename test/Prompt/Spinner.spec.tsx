import { expect } from 'expect';
import { describe, it } from 'node:test';

import { Spinner, SpinnerBox } from '../../source/Prompt/Spinner';
import { Button } from '../../source/Form/Button';
import { render } from '../render';

describe('Spinner', () => {
    it('should render a border spinner with accessible loading text', () => {
        const root = render(Spinner({}));

        expect(root.firstElementChild.className).toBe('spinner-border');
        expect(root.firstElementChild.getAttribute('role')).toBe('status');
        expect(root.querySelector('.visually-hidden').textContent).toBe(
            'Loading...'
        );
    });

    it('should compose small colored growing spinners in a button', () => {
        const root = render(
            <Button disabled>
                <Spinner size="sm" variant="primary" animation="grow">
                    Pending...
                </Spinner>
            </Button>
        );
        expect(root.querySelector('button').disabled).toBe(true);
        expect(root.querySelector('[role="status"]').className).toBe(
            'spinner-grow spinner-sm fg-primary'
        );
        expect(root.querySelector('.visually-hidden').textContent).toBe(
            'Pending...'
        );
    });

    it('should set alpha.1 small-size variables for both animations and retain style overrides', () => {
        for (const animation of ['border', 'grow'] as const) {
            const spinner = render(
                <Spinner animation={animation} size="sm" />
            ).querySelector<HTMLElement>('[role="status"]');
            expect(spinner.classList.contains('spinner-sm')).toBe(true);
            expect(spinner.style.getPropertyValue('--bs-spinner-width')).toBe(
                '.75em'
            );
            expect(spinner.style.getPropertyValue('--bs-spinner-height')).toBe(
                '.75em'
            );
        }
        expect(
            Spinner({ size: 'sm', style: { '--bs-spinner-width': '1rem' } })
                .style['--bs-spinner-width']
        ).toBe('1rem');
        expect(Spinner({}).style['--bs-spinner-width']).toBeUndefined();
    });

    it('should render projected content with an optional cover', () => {
        const root = render(
            <SpinnerBox className="test" cover>
                Content
            </SpinnerBox>
        );
        expect(root.firstElementChild.className).toBe('position-relative test');
        expect(root.firstElementChild.firstChild.textContent).toBe('Content');
        expect(
            root.querySelector('.position-absolute').getAttribute('style')
        ).toContain('background-color: rgba(0, 0, 0, 0.5)');
        expect(
            root.querySelector('.spinner-border').getAttribute('aria-hidden')
        ).toBe('true');
        expect(
            render(<SpinnerBox>Content</SpinnerBox>).querySelector(
                '.spinner-border'
            )
        ).toBeNull();
    });
});
