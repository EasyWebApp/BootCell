import { expect } from 'expect';
import { describe, it } from 'node:test';

import { FormField } from '../../source/Form/Form';
import { render } from '../render';

describe('FormField', () => {
    it('should compose a label and a control inside the supplied group', () => {
        const root = render(
            <FormField className="mb-4" id="name" label="Name" required />
        );
        expect(root.firstElementChild.className).toBe('form-field mb-4');
        expect(root.querySelector('label').textContent).toBe('Name');
        expect(root.querySelector('input').id).toBe('name');
        expect(root.querySelector('input').required).toBe(true);
        expect(root.querySelector('label').htmlFor).toBe('name');
    });

    it('should render a floating label inferred from the placeholder', () => {
        const root = render(
            <FormField id="name" labelFloat placeholder="Name" />
        );
        expect(root.firstElementChild.className.trim()).toBe('form-floating');
        expect(
            Array.from(root.firstElementChild.children, node => node.tagName)
        ).toEqual(['INPUT', 'LABEL']);
        expect(root.querySelector('label').textContent).toBe('Name');
        expect(root.querySelector('input').placeholder).toBe('Name');
        expect(root.querySelector('label').htmlFor).toBe('name');
    });

    it('should generate distinct label associations and omit empty labels', () => {
        const root = render(
            <div>
                <FormField label="First" />
                <FormField label="Second" labelFloat />
            </div>
        );
        const inputs = [...root.querySelectorAll('input')];
        const labels = [...root.querySelectorAll('label')];
        expect(inputs[0].id).not.toBe('');
        expect(inputs[0].id).not.toBe(inputs[1].id);
        expect(labels.map(label => label.htmlFor)).toEqual(
            inputs.map(input => input.id)
        );
        expect(render(<FormField />).querySelector('label')).toBeNull();
    });

    it('should prefer an explicit label over title and placeholder', () => {
        const root = render(
            <FormField
                label="Explicit"
                title="Title"
                placeholder="Placeholder"
            />
        );
        expect(root.querySelector('label').textContent).toBe('Explicit');
        expect(
            render(
                <FormField title="Title" placeholder="Placeholder" />
            ).querySelector('label').textContent
        ).toBe('Title');
    });
});
