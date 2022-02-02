import { assertLooksLike } from '@tech_query/snabbdom-looks-like';
import { createCell } from 'web-cell';

import { ToastBox, ToastProps } from '../../source/Prompt/Toast';
import { CloseButton } from '../../source/Form/Button';

const { render } = ToastBox.prototype;

function Toast({ icon, title, time, defaultSlot }: ToastProps) {
    return (
        <div>
            {render.call(
                { close: () => {} },
                { icon, title, time, defaultSlot }
            )}
        </div>
    );
}

describe('Toast', () => {
    it('should render a Toast dialog', () => {
        assertLooksLike(
            <Toast icon="test.png" title="Test" time="just now">
                example
            </Toast>,
            <div>
                <div className="toast-header">
                    <img className="rounded me-2" alt="Icon" src="test.png" />

                    <strong className="me-auto">Test</strong>
                    <small className="text-muted">just now</small>
                    <CloseButton className="ms-2 mb-1" />
                </div>
                <div className="toast-body">example</div>
            </div>
        );
    });
});
