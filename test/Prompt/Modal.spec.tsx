import { expect } from 'expect';
import { fn } from 'jest-mock';
import { DOMRenderer } from 'dom-renderer';
import { describe, it } from 'node:test';
import { setTimeout } from 'node:timers/promises';

import { render } from '../render';
import {
    Modal,
    ModalBody,
    ModalHeader,
    ModalTitle
} from '../../source/Prompt/Modal';

describe('Modal Dialog', () => {
    it('should render a Bootstrap modal and project its children', async () => {
        const root = render(
            <Modal size="sm">
                <ModalHeader closeButton>
                    <ModalTitle>Test</ModalTitle>
                </ModalHeader>
                <ModalBody>Content</ModalBody>
            </Modal>
        );
        document.body.append(root);
        await setTimeout(0);

        const modal = root.querySelector('modal-box') as Modal,
            { dialog } = modal;

        expect(dialog).not.toBeNull();
        expect(dialog.classList.contains('dialog')).toBe(true);
        expect(dialog.classList.contains('dialog-sm')).toBe(true);
        expect(modal.shadowRoot.querySelector('slot')).not.toBeNull();
        expect(modal.querySelector('.dialog-title').textContent).toBe('Test');
        expect(modal.querySelector('.dialog-body').textContent).toBe('Content');
        expect(modal.querySelector('[data-bs-dismiss="modal"]')).not.toBeNull();
        root.remove();
    });

    it('should emit hide from close-button clicks and Escape', async () => {
        const onHide = fn();
        const root = render(
            <Modal onHide={onHide}>
                <ModalHeader closeButton>Test</ModalHeader>
            </Modal>
        );
        document.body.append(root);
        await setTimeout(0);

        const modal = root.querySelector('modal-box') as Modal,
            { dialog } = modal;
        const outsideListener = fn();
        root.addEventListener('hide', outsideListener);

        modal
            .querySelector<HTMLButtonElement>('[data-bs-dismiss="modal"]')
            .click();
        expect(onHide).toHaveBeenCalledTimes(1);
        expect(outsideListener).toHaveBeenCalledTimes(1);

        dialog.click();
        expect(onHide).toHaveBeenCalledTimes(2);
        modal.backdrop = 'static';
        await setTimeout(0);
        dialog.click();
        expect(onHide).toHaveBeenCalledTimes(2);

        const cancel = new Event('cancel', { cancelable: true });
        dialog.dispatchEvent(cancel);
        expect(cancel.defaultPrevented).toBe(false);
        expect(onHide).toHaveBeenCalledTimes(3);
        root.remove();
    });

    it('should synchronize visibility and modality without replacing the dialog', async () => {
        const root = document.createElement('div');
        const renderer = new DOMRenderer();
        const ref = fn();
        const view = (show: boolean, backdrop: boolean | 'static' = true) => (
            <Modal show={show} backdrop={backdrop} ref={ref}>
                <ModalBody>Content</ModalBody>
            </Modal>
        );
        document.body.append(root);
        renderer.render(view(false), root);
        await setTimeout(0);

        const modal = root.querySelector('modal-box') as Modal,
            { dialog } = modal;
        const show = fn(() => (dialog.open = true));
        const showModal = fn(() => (dialog.open = true));
        const close = fn(() => (dialog.open = false));
        Object.assign(dialog, { show, showModal, close });

        expect(ref).toHaveBeenCalledWith(modal);
        renderer.render(view(true), root);
        await setTimeout(0);
        expect(modal.dialog).toBe(dialog);
        expect(modal.querySelector('.dialog-body').textContent).toBe('Content');
        expect(showModal).toHaveBeenCalledTimes(1);
        expect(dialog.getAttribute('aria-hidden')).toBe('false');
        expect(ref).toHaveBeenCalledTimes(1);

        renderer.render(view(true, false), root);
        await setTimeout(0);
        expect(close).toHaveBeenCalledTimes(1);
        expect(show).toHaveBeenCalledTimes(1);
        renderer.render(view(true, 'static'), root);
        await setTimeout(0);
        expect(close).toHaveBeenCalledTimes(2);
        expect(showModal).toHaveBeenCalledTimes(2);
        renderer.render(view(false), root);
        await setTimeout(0);
        expect(dialog.open).toBe(false);
        expect(dialog.getAttribute('aria-hidden')).toBe('true');
        expect(dialog.dataset.bsOpen).toBe('false');
        expect(close).toHaveBeenCalledTimes(3);
        renderer.render(<div />, root);
        expect(ref).toHaveBeenLastCalledWith();
        root.remove();
    });

    it('should keep a keyboard-disabled modal open on Escape', async () => {
        const onHide = fn();
        const root = render(<Modal keyboard={false} onHide={onHide} />);
        document.body.append(root);
        await setTimeout(0);

        const dialog = (root.querySelector('modal-box') as Modal).dialog;
        const cancel = new Event('cancel', { cancelable: true });
        dialog.dispatchEvent(cancel);
        expect(cancel.defaultPrevented).toBe(true);
        expect(onHide).not.toHaveBeenCalled();
        root.remove();
    });
});
