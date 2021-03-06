import { createCell } from 'web-cell';
import { assertLooksLike } from '@tech_query/snabbdom-looks-like';

import { Alert } from '../../source/Prompt/Alert';
import { CloseButton } from '../../source/Form/Button';

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
                <CloseButton />
            </aside>
        );
    });
});
