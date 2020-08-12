import { createCell } from 'web-cell';
import { assertLooksLike } from '@tech_query/snabbdom-looks-like';

import { Button, IconButton } from '../../source/Form/Button';
import { Icon } from '../../source/Reminder/Icon';

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

    it('should render a Button with an Icon', () => {
        assertLooksLike(
            <IconButton
                className="m-1"
                name="bootstrap"
                href="https://getbootstrap.com"
            />,
            <a
                className="btn btn-primary p-1 m-1"
                href="https://getbootstrap.com"
                role="button"
                aria-disabled="false"
            >
                <Icon name="bootstrap" />
            </a>
        );
    });
});
