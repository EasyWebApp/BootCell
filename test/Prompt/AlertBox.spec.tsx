import '../polyfill';
import { createCell } from 'web-cell';
import { assertLooksLike } from 'snabbdom-looks-like';

import { AlertBox } from '../../source/Prompt/AlertBox';

describe('Alert Box', () => {
    it('should render a Dismissible Alert while "closable" property equals True', () => {
        assertLooksLike(
            AlertBox.prototype.render.call({
                type: 'primary',
                title: 'Test',
                closable: true,
                defaultSlot: 'Example'
            }),
            <aside
                className="alert alert-primary alert-dismissible fade show"
                role="alert"
            >
                <h4 className="alert-heading">Test</h4>
                Example
                <button type="button" className="close" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </aside>
        );
    });
});
