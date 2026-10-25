import { expect } from 'expect';
import { describe, it } from 'node:test';
import {
    Form,
    FormControl,
    FormField,
    Feedback,
    FormGroup,
    FormLabel,
    FormText,
    FormSelect
} from '../../source/Form/Form';
import { render } from '../render';

const CustomInput = (props: JSX.IntrinsicElements['input']) => (
    <input {...props} data-control="custom" />
);

describe('Form migration', () => {
    it('should declare native validation mode and block invalid submissions', () => {
        const root = render(
            <Form validate>
                <input required />
            </Form>
        );
        const form = root.querySelector('form');
        const event = new Event('submit', { bubbles: true, cancelable: true });
        let submitCount = 0;
        form.addEventListener('submit', () => submitCount++);

        form.dispatchEvent(event);

        expect(form.noValidate).toBe(true);
        expect(form.hasAttribute('data-bs-validate')).toBe(true);
        expect(form.className).toBe('');
        expect(event.defaultPrevented).toBe(true);
        expect(submitCount).toBe(1);
    });

    it('should map validated and inline aliases to current form attributes', () => {
        const form = render(
            <Form validated className="custom-form">
                <button type="submit">Save</button>
            </Form>
        ).querySelector('form');

        expect(form.className).toBe('custom-form');
        expect(form.hasAttribute('data-bs-validate')).toBe(true);
        expect(form.noValidate).toBe(false);
        const inlineForm = render(<Form inline />).querySelector('form');
        expect(inlineForm.className).toBe(
            'd-flex flex-wrap align-items-center gap-2'
        );

        const group = render(
            <FormGroup controlId="account">
                <FormLabel>Account</FormLabel>
                <FormControl />
            </FormGroup>
        );
        expect(group.querySelector('label').htmlFor).toBe('account');
        expect(group.querySelector('input').id).toBe('account');
    });

    it('should associate labels, tips and feedback accessibly', () => {
        const root = render(
            <FormField
                id="email"
                label="Email"
                type="email"
                tips="Use your work address"
                invalidMessage="Enter a valid address"
                isInvalid
            />
        );
        const input = root.querySelector('input');

        expect(root.querySelector('label').htmlFor).toBe('email');
        expect(input.className).toContain('is-invalid');
        expect(input.getAttribute('aria-describedby')).toBe(
            'email-tips email-message'
        );
        expect(root.querySelector('#email-tips').className).toBe('fg-2');
        expect(root.querySelector('#email-message').className).toBe(
            'invalid-feedback'
        );
    });

    it('should render floating and horizontal labels', () => {
        const floating = render(
            <FormField labelFloat id="name" placeholder="Name" />
        );
        expect(floating.querySelector('.form-floating')).not.toBeNull();
        expect(floating.querySelector('label').textContent).toBe('Name');

        const horizontal = render(
            <FormField label="Name" labelColumn={3} id="name" />
        );
        expect(horizontal.querySelector('.row')).not.toBeNull();
        expect(horizontal.querySelector('label').className).toContain(
            'col-sm-3'
        );
    });

    it('should preserve legacy default slots and numeric control sizes', () => {
        const select = render(
            <FormField
                is="select"
                defaultSlot={<option>Legacy option</option>}
            />
        ).querySelector('select');
        const input = render(<FormField size={8} />).querySelector('input');

        expect(select.options[0].textContent).toBe('Legacy option');
        expect(input.size).toBe(8);
    });

    it('should decorate custom controls supplied through legacy slots', () => {
        const root = render(
            <FormField
                label="Custom"
                tips="Extra help"
                invalidMessage="Invalid"
                isInvalid
            >
                <input className="custom-control" />
            </FormField>
        );
        const input = root.querySelector('input');

        expect(input.className).toBe('custom-control is-invalid');
        expect(input.id).not.toBe('');
        expect(input.getAttribute('aria-describedby')).toContain('-tips');
        expect(input.getAttribute('aria-invalid')).toBe('true');
    });

    it('should handle output, select and file field variants', () => {
        const output = render(
            <FormField
                is="output"
                id="total"
                defaultValue="42"
                tips="Displayed total"
            />
        ).querySelector('output');
        const select = render(
            <FormField is="select" id="choice">
                <option>One</option>
            </FormField>
        );
        const range = render(
            <FormField type="range" id="volume" min={0} max={10} />
        ).querySelector('input');
        let fileChanges = 0;
        const file = render(
            <FormField
                type="file"
                id="upload"
                label="Upload"
                onChange={() => fileChanges++}
            />
        );

        expect(output.textContent).toBe('42');
        expect(output.className).toContain('form-control-plaintext');
        expect(output.getAttribute('aria-describedby')).toBe('total-tips');
        expect(select.querySelector('select').className).toBe('form-control');
        expect(range.type).toBe('range');
        expect(range.className).toBe('form-range');
        expect(file.querySelector('input').type).toBe('file');
        expect(file.querySelector('input').className).toBe('form-control');
        expect(file.querySelector('input').parentElement.className).toBe(
            'form-field'
        );
        file.querySelector('input').dispatchEvent(
            new Event('change', { bubbles: true })
        );
        expect(fileChanges).toBe(1);
    });

    it('should expose React-Bootstrap-compatible text, feedback and select props', () => {
        const root = render(
            <div>
                <FormText muted>Help</FormText>
                <Feedback type="invalid" tooltip>
                    Incorrect
                </Feedback>
                <FormSelect size="sm" isValid />
            </div>
        );

        expect(root.querySelector('small').className).toBe('fg-2');
        expect(root.querySelector('.invalid-tooltip').textContent).toBe(
            'Incorrect'
        );
        expect(root.querySelector('select').className).toBe(
            'form-control form-control-sm is-valid'
        );
    });

    it('should support polymorphic custom controls', () => {
        const input = render(
            <FormControl as={CustomInput} id="custom" isInvalid />
        ).querySelector('input');

        expect(input.dataset.control).toBe('custom');
        expect(input.className).toContain('is-invalid');
    });
});
