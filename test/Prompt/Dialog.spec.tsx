import { createCell, renderToStaticMarkup } from 'web-cell';

import { openDialog, openModal } from '../../source/Prompt/Dialog';
import style from '../../source/Prompt/Dialog.less';

import { Field } from '../../source/Form/Field';
import { Button, CloseButton } from '../../source/Form/Button';

describe('Modal Dialog', () => {
    it('should render a pair of <dialog /> & <form /> in <body />', () => {
        openDialog(<Field name="test" id="test" />);

        expect(document.body.lastElementChild.outerHTML).toBe(
            renderToStaticMarkup(
                <dialog className={style.dialog}>
                    <form method="dialog">
                        <Field name="test" id="test" />
                    </form>
                </dialog>
            )
        );
    });

    it('should render a Modal Dialog form', () => {
        openModal({
            size: 'sm',
            title: 'Test',
            body: <Field name="test" id="test" />,
            cancelText: 'Cancel'
        });

        expect(document.body.lastElementChild.outerHTML).toBe(
            renderToStaticMarkup(
                <dialog className={style.dialog}>
                    <form method="dialog" className="modal-dialog modal-sm">
                        <div className="modal-content">
                            <header className="modal-header">
                                <h5 className="modal-title">Test</h5>
                                <CloseButton aria-label="Cancel" />
                            </header>
                            <div className="modal-body">
                                <Field name="test" id="test" />
                            </div>
                            <footer className="modal-footer">
                                <Button type="reset" kind="secondary">
                                    Cancel
                                </Button>
                                <Button type="submit" kind="primary">
                                    Confirm
                                </Button>
                            </footer>
                        </div>
                    </form>
                </dialog>
            )
        );
    });
});
