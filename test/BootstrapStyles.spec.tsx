import { describe, it } from 'node:test';
import { assertLooksLike } from 'dom-renderer/assert';

import { BootstrapStyles } from '../source/BootstrapStyles';

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
