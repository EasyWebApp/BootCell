import { expect } from 'expect';
import { describe, it } from 'node:test';

import {
    FormCheck,
    FormControl,
    InputGroup,
    InputGroupText
} from '../../source/Form/Form';
import { Button } from '../../source/Form/Button';
import { render } from '../render';

describe('InputGroup', () => {
    it('should compose prepend and append text with an input', () => {
        const root = render(
            <InputGroup id="test">
                <InputGroupText>@</InputGroupText>
                <FormControl id="sample" />
                <InputGroupText>.com</InputGroupText>
            </InputGroup>
        );
        expect(root.firstElementChild.id).toBe('test');
        expect(root.firstElementChild.className).toBe('input-group');
        expect(
            Array.from(
                root.querySelectorAll('.input-group-text'),
                node => node.textContent
            )
        ).toEqual(['@', '.com']);
        expect(root.querySelector('input').id).toBe('sample');
    });

    it('should size groups without changing control HTML sizes', () => {
        const root = render(
            <InputGroup size="lg">
                <FormControl />
            </InputGroup>
        );
        expect(root.firstElementChild.className).toBe(
            'input-group input-group-lg'
        );
        expect(root.querySelector('input').className).toBe('form-control');
    });

    it('should accept check controls and buttons as explicit addons', () => {
        const root = render(
            <InputGroup>
                <InputGroupText>
                    <FormCheck id="pick" type="radio" label="Pick" />
                </InputGroupText>
                <FormControl />
                <Button>Go</Button>
            </InputGroup>
        );
        expect(
            root.querySelector('.input-group-text input').getAttribute('type')
        ).toBe('radio');
        expect(root.querySelector('button').textContent).toBe('Go');
        expect(root.querySelectorAll('input')).toHaveLength(2);
    });
});
