import { expect } from 'expect';
import { describe, it } from 'node:test';

import { FormControl } from '../../source/Form/Form';
import { render } from '../render';

describe('FormControl', () => {
    it('should render an input and forward native properties', () => {
        const input = render(
            <FormControl id="test" required placeholder="Name" />
        ).querySelector('input');

        expect(input.id).toBe('test');
        expect(input.className).toBe('form-control');
        expect(input.required).toBe(true);
        expect(input.placeholder).toBe('Name');
    });

    it('should render multiline selects with independent HTML and visual sizes', () => {
        const select = render(
            <FormControl as="select" multiple htmlSize={3} size="lg">
                <option>Example</option>
            </FormControl>
        ).querySelector('select');

        expect(select.size).toBe(3);
        expect(select.multiple).toBe(true);
        expect(select.className).toBe('form-control form-control-lg');
        expect(select.options[0].textContent).toBe('Example');
    });

    it('should support textareas, small controls and readonly plaintext', () => {
        const textarea = render(
            <FormControl as="textarea" size="sm" />
        ).querySelector('textarea');
        const input = render(
            <FormControl readOnly plaintext value="Test" />
        ).querySelector('input');

        expect(textarea.className).toBe('form-control form-control-sm');
        expect(input.className).toBe('form-control form-control-plaintext');
        expect(input.readOnly).toBe(true);
        expect(input.value).toBe('Test');
    });

    it('should style color inputs', () => {
        expect(
            render(<FormControl type="color" />).firstElementChild.className
        ).toBe('form-control form-control-color');
    });
});
