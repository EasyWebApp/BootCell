import '../DOM-polyfill';
import { assertLooksLike } from 'snabbdom-looks-like';
import { createCell } from 'web-cell';

import { ModalDialog, Button } from '../../source';
import style from '../../source/Prompt/ModalDialog.less';

describe('Modal Dialog', () => {
    it('should render a Modal within <dialog /> & <form />', () => {
        assertLooksLike(
            ModalDialog.prototype.render.call(
                {
                    defaultSlot: 'test'
                },
                {
                    title: 'Test',
                    closeSlot: 'Close',
                    confirmSlot: 'Confirm'
                }
            ),
            <dialog className={`${style.dialog} modal-dialog`}>
                <form className="modal-content" method="dialog">
                    <header className="modal-header">
                        <h5 className="modal-title">Test</h5>
                        <button
                            type="reset"
                            className="close"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </header>
                    <div className="modal-body">test</div>
                    <footer className="modal-footer">
                        <Button type="reset" kind="secondary">
                            Close
                        </Button>
                        <Button type="submit" kind="primary">
                            Confirm
                        </Button>
                    </footer>
                </form>
            </dialog>
        );
    });
});
