import { assertLooksLike } from '@tech_query/snabbdom-looks-like';
import { createCell } from 'web-cell';

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
                className="dialog dialog-sm"
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
});
