import { assertLooksLike } from '@tech_query/snabbdom-looks-like';
import { createCell } from 'web-cell';

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
