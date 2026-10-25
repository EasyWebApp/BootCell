import { expect } from 'expect';
import { fn } from 'jest-mock';
import { describe, it } from 'node:test';
import { assertLooksLike, render } from '../render';

import { Alert } from '../../source/Prompt/Alert';
import { CloseButton } from '../../source/Form/Button';

describe('Alert', () => {
    it('should render a Simple Alert defaultly', () => {
        assertLooksLike(
            <Alert>Example</Alert>,
            <aside className="alert theme-primary show" role="alert">
                Example
            </aside>
        );
    });

    it('should render a Dismissible Alert while "closable" property equals True', () => {
        assertLooksLike(
            <Alert title="Test" dismissible>
                Example
            </Alert>,
            <aside
                className="alert theme-primary alert-dismissible fade show"
                role="alert"
            >
                <h4 className="alert-heading">Test</h4>
                Example
                <CloseButton />
            </aside>
        );
    });

    it('should forward close events and allow hiding the alert', () => {
        const onClose = fn();
        const root = render(
            <Alert dismissible show={false} onClose={onClose}>
                Content
            </Alert>
        );
        expect(root.querySelector('aside').classList.contains('show')).toBe(
            false
        );
        root.querySelector('button').click();
        expect(onClose).toHaveBeenCalledTimes(1);
        expect(onClose.mock.calls[0][0]).toBeInstanceOf(MouseEvent);
    });
});
