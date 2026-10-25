import { DOMRenderer } from 'dom-renderer';
import { describe, it } from 'node:test';
import { expect } from 'expect';
import { assertLooksLike, render } from '../render';
import { FormCheck } from '../../source/Form/Form';

describe('FormCheck', () => {
    it('should render a Bootstrap 6 check control', () => {
        assertLooksLike(
            <FormCheck id="updates" type="checkbox" label="Get updates" />,
            <div className="form-field">
                <input className="check" type="checkbox" id="updates" />
                <label htmlFor="updates">Get updates</label>
            </div>
        );
    });

    it('should place a reversed switch after its label', () => {
        assertLooksLike(
            <FormCheck
                type="switch"
                id="updates"
                label="Get updates"
                reverse
            />,
            <div
                className="form-field"
                style={{ gridTemplateColumns: '1fr auto' }}
            >
                <label
                    htmlFor="updates"
                    style={{ gridColumn: '1', gridRow: '1' }}
                >
                    Get updates
                </label>
                <input
                    className="switch"
                    type="checkbox"
                    role="switch"
                    id="updates"
                    style={{ gridColumn: '2' }}
                />
            </div>
        );
    });

    it('should migrate legacy button and switch modes', () => {
        let buttonInput: Node | undefined;
        const button = render(
            <FormCheck
                mode="button"
                type="radio"
                id="choice"
                label="Choose"
                color="accent"
                outline
                invalidMessage="Choose one"
                isInvalid
                ref={node => (buttonInput = node)}
            />
        );
        const switchField = render(
            <FormCheck mode="switch" id="updates" label="Get updates" />
        );

        expect(button.querySelector('input').type).toBe('radio');
        expect(button.querySelector('input').id).toBe('choice');
        expect(buttonInput).toBe(button.querySelector('input'));
        expect(
            button.querySelector('input').getAttribute('aria-describedby')
        ).toBe('choice-message');
        expect(button.querySelector('input').getAttribute('aria-invalid')).toBe(
            'true'
        );
        expect(button.querySelector('#choice-message').textContent).toBe(
            'Choose one'
        );
        expect(button.querySelector('label').className).toContain(
            'btn-outline'
        );
        expect(button.querySelector('label').className).toContain(
            'theme-accent'
        );
        expect(switchField.querySelector('input').type).toBe('checkbox');
        expect(switchField.querySelector('input').getAttribute('role')).toBe(
            'switch'
        );
        expect(switchField.querySelector('input').className).toBe('switch');
    });

    it('should forward input refs, events, accessibility props and indeterminate state', () => {
        let referenced: Node | undefined;
        let changeCount = 0;
        const root = render(
            <FormCheck
                id="partial"
                type="checkbox"
                indeterminate
                aria-describedby="partial-help"
                ref={node => (referenced = node)}
                onChange={() => changeCount++}
            />
        );
        const input = root.querySelector('input');

        expect(referenced).toBe(input);
        expect(input.indeterminate).toBe(true);
        expect(input.getAttribute('aria-describedby')).toBe('partial-help');
        input.dispatchEvent(new Event('change', { bubbles: true }));
        expect(changeCount).toBe(1);
    });

    it('should update indeterminate through the same renderer', () => {
        const root = document.createElement('div');
        const renderer = new DOMRenderer();

        renderer.render(
            <FormCheck id="partial" type="checkbox" indeterminate />,
            root
        );
        const input = root.querySelector('input');

        expect(input.indeterminate).toBe(true);
        renderer.render(
            <FormCheck id="partial" type="checkbox" indeterminate={false} />,
            root
        );

        expect(root.querySelector('input').indeterminate).toBe(false);
    });

    it('should map legacy default-slot labels and validation feedback', () => {
        const root = render(
            <FormCheck
                id="terms"
                mode="normal"
                defaultSlot="Accept terms"
                invalidMessage="This is required"
                validMode="tooltip"
            />
        );

        expect(root.querySelector('label').textContent).toBe('Accept terms');
        expect(
            root.querySelector('input').getAttribute('aria-describedby')
        ).toBe('terms-message');
        expect(root.querySelector('#terms-message').className).toBe(
            'invalid-tooltip'
        );
    });

    it('should associate React-style feedback with its input', () => {
        const root = render(
            <FormCheck
                id="terms"
                label="Accept terms"
                feedback="Required"
                feedbackType="invalid"
                isInvalid
                aria-describedby="terms-help"
            />
        );

        expect(
            root.querySelector('input').getAttribute('aria-describedby')
        ).toBe('terms-help terms-feedback');
        expect(root.querySelector('#terms-feedback').textContent).toBe(
            'Required'
        );
    });
});
