import '../polyfill';
import { createCell, Fragment } from 'web-cell';
import { assertLooksLike } from 'snabbdom-looks-like';

import { TabList } from '../../source/Content/TabList';

const { render, renderHeader } = TabList.prototype;

describe('Tab List', () => {
    it('should render a Tab List with "tabs" style', () => {
        assertLooksLike(
            render.call({
                UID: 'sample',
                mode: 'tabs',
                direction: 'row',
                list: [
                    { title: 'Test', content: 'test' },
                    { title: 'Example', content: 'example', disabled: true }
                ],
                activeIndex: 0,
                renderHeader
            }),
            <Fragment>
                <nav
                    className="nav flex-row nav-tabs"
                    aria-orientation="horizontal"
                >
                    <a
                        className="nav-item nav-link text-nowrap active"
                        id="sample_h_0"
                        href="#sample_b_0"
                        aria-disabled="false"
                        role="tab"
                        aria-controls="sample_b_0"
                        aria-selected="true"
                        data-index="0"
                    >
                        Test
                    </a>
                    <a
                        className="nav-item nav-link text-nowrap disabled"
                        id="sample_h_1"
                        href="#sample_b_1"
                        tabIndex={-1}
                        aria-disabled="true"
                        role="tab"
                        aria-controls="sample_b_1"
                        aria-selected="false"
                        data-index="1"
                    >
                        Example
                    </a>
                </nav>
                <div className="tab-content bg-white mt-2">
                    <section
                        className="fade show"
                        id="sample_b_0"
                        role="tabpanel"
                        aria-labelledby="sample_h_0"
                    >
                        test
                    </section>
                </div>
            </Fragment>
        );
    });

    it('should render a Tab List with horizontal "list" style', () => {
        assertLooksLike(
            render.call({
                UID: 'sample',
                mode: 'list',
                direction: 'row',
                list: [
                    { title: 'Test', content: 'test', disabled: true },
                    { title: 'Example', content: 'example' }
                ],
                activeIndex: 1,
                renderHeader
            }),
            <Fragment>
                <div
                    className="list-group list-group-horizontal"
                    role="tablist"
                >
                    <a
                        className="list-group-item list-group-item-action text-nowrap disabled"
                        id="sample_h_0"
                        href="#sample_b_0"
                        tabIndex={-1}
                        aria-disabled="true"
                        role="tab"
                        aria-controls="sample_b_0"
                        aria-selected="false"
                        data-index="0"
                    >
                        Test
                    </a>
                    <a
                        className="list-group-item list-group-item-action text-nowrap active"
                        id="sample_h_1"
                        href="#sample_b_1"
                        aria-disabled="false"
                        role="tab"
                        aria-controls="sample_b_1"
                        aria-selected="true"
                        data-index="1"
                    >
                        Example
                    </a>
                </div>
                <div className="tab-content bg-white mt-2">
                    <section
                        className="fade show"
                        id="sample_b_1"
                        role="tabpanel"
                        aria-labelledby="sample_h_1"
                    >
                        example
                    </section>
                </div>
            </Fragment>
        );
    });
});
