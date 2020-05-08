import { assertLooksLike } from 'snabbdom-looks-like';
import { createCell } from 'web-cell';

import { BreadCrumb } from '../../source/Navigator/BreadCrumb';

describe('Bread Crumb', () => {
    it('should render Link list', () => {
        assertLooksLike(
            <BreadCrumb
                path={[
                    {
                        title: 'Test',
                        href: 'test'
                    },
                    {
                        title: 'Example',
                        href: 'example'
                    }
                ]}
            />,
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <a href="test">Test</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Example
                    </li>
                </ol>
            </nav>
        );
    });
});
