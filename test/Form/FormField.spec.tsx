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
    });

    it('should render a floating label inferred from the placeholder', () => {
        const root = render(
            <FormField id="name" labelFloat placeholder="Name" />
        );
        expect(root.querySelector('.form-floating')).not.toBeNull();
        expect(
            Array.from(
                root.querySelector('.form-floating').children,
                node => node.tagName
            )
        ).toEqual(['INPUT', 'LABEL']);
        expect(root.querySelector('label').textContent).toBe('Name');
        expect(root.querySelector('label').htmlFor).toBe('name');
        expect(root.querySelector('input').placeholder).toBe('Name');
    });

    it('should preserve the default value of native text controls', () => {
        const input = render(
            <FormField label="Name" defaultValue="Ada" />
        ).querySelector('input');
        const textarea = render(
            <FormField as="textarea" label="Notes" defaultValue="Details" />
        ).querySelector('textarea');

        expect(input.value).toBe('Ada');
        expect(textarea.value).toBe('Details');
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
