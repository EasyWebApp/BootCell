import { describe, it } from 'node:test';
import { assertLooksLike } from '../render';
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
                <div className="switch">
                    <input type="checkbox" role="switch" switch id="test" />
                </div>
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
});
