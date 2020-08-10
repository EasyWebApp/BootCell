import { assertLooksLike } from '@tech_query/snabbdom-looks-like';
import { createCell } from 'web-cell';

import { Pagination } from '../../source/Navigator/Pagination';

const { render } = Pagination.prototype;

describe('Pagination', () => {
    it('should render 1 Page Button & 2 disabled Direction Buttons defaultly', () => {
        assertLooksLike(
            render({ current: 1, total: 1 }),
            <ul className="pagination justify-content-center user-select-none">
                <li className="page-item disabled">
                    <a className="page-link" aria-disabled="true">
                        &lt;
                    </a>
                </li>
                <li className="page-item active" aria-current="page">
                    <a className="page-link">
                        1 <span className="sr-only">(current)</span>
                    </a>
                </li>
                <li className="page-item disabled">
                    <a className="page-link" aria-disabled="true">
                        &gt;
                    </a>
                </li>
            </ul>
        );
    });

    it('should render 3 Page Buttons & 2 Direction Buttons', () => {
        assertLooksLike(
            render({ current: 2, total: 3 }),
            <ul className="pagination justify-content-center user-select-none">
                <li className="page-item">
                    <a className="page-link" aria-disabled="false">
                        &lt;
                    </a>
                </li>
                <li className="page-item">
                    <a className="page-link" aria-disabled="false">
                        {1}
                    </a>
                </li>
                <li className="page-item active" aria-current="page">
                    <a className="page-link">
                        2 <span className="sr-only">(current)</span>
                    </a>
                </li>
                <li className="page-item">
                    <a className="page-link" aria-disabled="false">
                        {3}
                    </a>
                </li>
                <li className="page-item">
                    <a className="page-link" aria-disabled="false">
                        &gt;
                    </a>
                </li>
            </ul>
        );
    });

    it('should render 3 Page Buttons & 2 Direction Buttons & 2 Ellipsis Buttons', () => {
        assertLooksLike(
            render({ current: 3, total: 5 }),
            <ul className="pagination justify-content-center user-select-none">
                <li className="page-item">
                    <a className="page-link" aria-disabled="false">
                        &lt;
                    </a>
                </li>
                <li className="page-item">
                    <a className="page-link" aria-disabled="false">
                        {1}
                    </a>
                </li>
                <li className="page-item disabled">
                    <a className="page-link" aria-disabled="true">
                        ...
                    </a>
                </li>
                <li className="page-item active" aria-current="page">
                    <a className="page-link">
                        3 <span className="sr-only">(current)</span>
                    </a>
                </li>
                <li className="page-item disabled">
                    <a className="page-link" aria-disabled="true">
                        ...
                    </a>
                </li>
                <li className="page-item">
                    <a className="page-link" aria-disabled="false">
                        {5}
                    </a>
                </li>
                <li className="page-item">
                    <a className="page-link" aria-disabled="false">
                        &gt;
                    </a>
                </li>
            </ul>
        );
    });
});
