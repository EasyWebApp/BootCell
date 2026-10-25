import { describe, it } from 'node:test';
import { expect } from 'expect';
import { assertLooksLike, render } from '../render';
import { FormCheck } from '../../source/Form/Form';
import { ToggleButton } from '../../source/Form/Button';

describe('Form controls', () => {
    it('should render a Bootstrap 6 radio field', () => {
        assertLooksLike(
            <FormCheck type="radio" id="test" label="Choose" />,
            <div className="form-field">
                <input className="radio" type="radio" id="test" />
                <label htmlFor="test">Choose</label>
            </div>
        );
    });

    it('should render a Bootstrap 6 switch field', () => {
        assertLooksLike(
            <FormCheck type="switch" id="test" label="Enable" />,
            <div className="form-field">
                <input
                    className="switch"
                    type="checkbox"
                    role="switch"
                    id="test"
                />
                <label htmlFor="test">Enable</label>
            </div>
        );
    });

    it('should render a toggle button with its input inside the label', () => {
        assertLooksLike(
            <ToggleButton type="radio" id="test">
                Choose
            </ToggleButton>,
            <label className="btn-check btn-solid theme-primary">
                <input id="test" autocomplete="off" type="radio" />
                Choose
            </label>
        );
    });

    it('should compose a native outline variant and theme', () => {
        assertLooksLike(
            <ToggleButton
                type="radio"
                id="test"
                variant="outline"
                theme="accent"
            >
                Choose
            </ToggleButton>,
            <label className="btn-check btn-outline theme-accent">
                <input id="test" autocomplete="off" type="radio" />
                Choose
            </label>
        );
    });

    it('supports inputRef and button sizing without leaking sizing to the input', () => {
        let input: Node;
        const root = render(
            <ToggleButton
                type="checkbox"
                id="sized"
                size="sm"
                disabled
                inputRef={node => {
                    input = node;
                }}
            >
                Choice
            </ToggleButton>
        );
        expect(root.querySelector('label').classList.contains('btn-sm')).toBe(
            true
        );
        expect(input).toBe(root.querySelector('input'));
        expect(root.querySelector('input').disabled).toBe(true);
        expect(root.querySelector('input').hasAttribute('size')).toBe(false);
    });
});
