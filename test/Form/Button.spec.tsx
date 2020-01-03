import '../polyfill';
import { createCell } from 'web-cell';
import { assertLooksLike } from 'snabbdom-looks-like';

import { Button } from '../../source/Form/Button';

describe('Button', () => {
    it('should render a Button with outline', () => {
        assertLooksLike(
            <Button outline>Test</Button>,
            <button type="button" className="btn btn-outline-primary">
                Test
            </button>
        );
    });

    it('should render a disabled Anchor', () => {
        assertLooksLike(
            <Button href="/test" disabled>
                Test
            </Button>,
            <a
                className="btn btn-primary disabled"
                href="/test"
                tabIndex={-1}
                role="button"
                aria-disabled="true"
            >
                Test
            </a>
        );
    });
});
