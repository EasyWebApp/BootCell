import { assertLooksLike } from '@tech_query/snabbdom-looks-like';
import { createCell } from 'web-cell';

import { BreadCrumb, BreadcrumbItem } from '../../source/Navigator/BreadCrumb';

describe('Bread Crumb', () => {
    it('should render v6 breadcrumb links and divider', () => {
        assertLooksLike(
            <BreadCrumb aria-label="breadcrumb">
                <BreadcrumbItem href="test">Test</BreadcrumbItem>
                <BreadcrumbItem href="example" active>
                    Example
                </BreadcrumbItem>
            </BreadCrumb>,
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <a className="breadcrumb-link" href="test">
                            Test
                        </a>
                    </li>
                    <li className="breadcrumb-divider" aria-hidden="true" />
                    <li className="breadcrumb-item">
                        <a
                            className="breadcrumb-link active"
                            href="example"
                            aria-current="page"
                        >
                            Example
                        </a>
                    </li>
                </ol>
            </nav>
        );
    });
});
