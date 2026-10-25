import { describe, it } from 'node:test';

import { BootstrapStyles } from '../source/BootstrapStyles';
import { assertLooksLike } from './render';

describe('Bootstrap styles', () => {
    it('should provide Bootstrap and Bootstrap Icons stylesheets', () => {
        assertLooksLike(
            <BootstrapStyles />,
            <>
                <link
                    rel="stylesheet"
                    href="https://unpkg.com/bootstrap@6.0.0-alpha.1/dist/css/bootstrap.min.css"
                />
                <link
                    rel="stylesheet"
                    href="https://unpkg.com/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css"
                />
            </>
        );
    });
});
