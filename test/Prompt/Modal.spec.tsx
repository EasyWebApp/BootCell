import { expect } from 'expect';
import { fn } from 'jest-mock';
import { describe, it } from 'node:test';
import { assertLooksLike, render } from '../render';
import {
    Modal,
    ModalBody,
    ModalHeader,
    ModalTitle
} from '../../source/Prompt/Modal';

describe('Modal Dialog', () => {
    it('should render the native dialog structure used by Bootstrap 6', () => {
        assertLooksLike(
            <Modal size="sm">
                <ModalHeader closeButton>
                    <ModalTitle>Test</ModalTitle>
                </ModalHeader>
                <ModalBody>Content</ModalBody>
            </Modal>,
            <dialog
                className="dialog dialog-instant dialog-sm"
                tabIndex={-1}
                aria-hidden="true"
            >
                <div className="dialog-header">
                    <h1 className="dialog-title fs-lg">Test</h1>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="dialog"
                        aria-label="Close"
                    />
                </div>
                <div className="dialog-body">Content</div>
            </dialog>
        );
    });

    it('should open and close the native dialog through its ref', () => {
        const dialog = Object.assign(document.createElement('dialog'), {
            showModal: fn(),
            close: fn()
        });

        (<Modal show />).ref(dialog);
        expect(dialog.showModal).toHaveBeenCalledTimes(1);
        dialog.open = true;
        (<Modal />).ref(dialog);
        expect(dialog.close).toHaveBeenCalledTimes(1);
    });

    it('should emit hide from the close button and cancel event', () => {
        const root = render(
            <Modal>
                <ModalHeader closeButton>Test</ModalHeader>
            </Modal>
        );
        const dialog = root.querySelector('dialog');
        const onHide = fn();
        dialog.addEventListener('hide', onHide);

        dialog.querySelector('button').click();
        const cancel = new Event('cancel', { cancelable: true });
        dialog.dispatchEvent(cancel);
        expect(cancel.defaultPrevented).toBe(true);
        expect(onHide).toHaveBeenCalledTimes(2);
    });
});
