import '../polyfill';
import { assertLooksLike } from 'snabbdom-looks-like';
import { createCell, Fragment } from 'web-cell';

import { ToastBox } from '../../source/Prompt/Toast';

describe('Toast', () => {
    it('should render a Toast dialog', () => {
        assertLooksLike(
            ToastBox.prototype.render({
                icon: 'test.png',
                title: 'Test',
                time: 'just now',
                defaultSlot: ['example']
            }),
            <Fragment>
                <div className="toast-header">
                    <img className="rounded mr-2" alt="Icon" src="test.png" />

                    <strong className="mr-auto">Test</strong>
                    <small className="text-muted">just now</small>
                    <button
                        type="button"
                        className="ml-2 mb-1 close"
                        aria-label="Close"
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="toast-body">example</div>
            </Fragment>
        );
    });
});
