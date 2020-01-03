import '../polyfill';
import { createCell } from 'web-cell';
import { assertLooksLike } from 'snabbdom-looks-like';

import { Spinner } from '../../source/Prompt/Spinner';
import { Button } from '../../source/Form/Button';

describe('Spinner', () => {
    it('should render a single Border Spinner by default', () => {
        assertLooksLike(
            <Spinner />,
            <div className="spinner-border" role="status" aria-hidden="false">
                <span className="sr-only">Loading...</span>
            </div>
        );
    });

    it('should render an Embeded Spinner', () => {
        assertLooksLike(
            <Button disabled>
                <Spinner embed>Pending...</Spinner>
            </Button>,
            <button class="btn btn-primary" type="button" disabled>
                <div
                    className="spinner-border"
                    role="status"
                    aria-hidden="true"
                />
                Pending...
            </button>
        );
    });
});
