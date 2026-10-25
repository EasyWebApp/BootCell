import { createCell } from 'web-cell';
import { assertLooksLike } from '@tech_query/snabbdom-looks-like';

import { Button, IconButton } from '../../source/Form/Button';
import { Icon } from '../../source/Reminder/Icon';

describe('Button', () => {
    it('should render an outline Button', () => {
        assertLooksLike(
            <Button variant="outline-primary">Test</Button>,
            <button className="btn btn-outline theme-primary">Test</button>
        );
    });

    it('should render a solid Button', () => {
        assertLooksLike(
            <Button variant="primary" className="d-block w-100">
                Test
            </Button>,
            <button className="btn btn-solid theme-primary d-block w-100">
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
                className="btn disabled"
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
                className="btn p-1 m-1"
                style={{ lineHeight: '0.8' }}
                href="https://getbootstrap.com"
                role="button"
                aria-disabled="false"
            >
                <Icon name="bootstrap" />
            </a>
        );
    });
});
