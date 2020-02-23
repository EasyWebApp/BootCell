import '../polyfill';
import { createCell } from 'web-cell';
import { assertLooksLike } from 'snabbdom-looks-like';

import { Alert } from '../../source/Prompt/Alert';

describe('Alert', () => {
    it('should render a Simple Alert defaultly', () => {
        assertLooksLike(
            <Alert>Example</Alert>,
            <aside className="alert alert-primary show" role="alert">
                Example
            </aside>
        );
    });

    it('should render a Dismissible Alert while "closable" property equals True', () => {
        assertLooksLike(
            <Alert title="Test" closable>
                Example
            </Alert>,
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
