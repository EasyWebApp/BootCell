import './DOM-polyfill';
import { createCell } from 'web-cell';
import { assertLooksLike } from 'snabbdom-looks-like';

import { TabList } from '../source';

describe('Tab List', () => {
    it('should render a list of Tabs', () => {
        assertLooksLike(
            TabList.prototype.render.call({
                UID: 'sample',
                mode: 'tabs',
                list: [
                    { title: 'Test', content: 'test', active: true },
                    { title: 'Example', content: 'example', disabled: true }
                ]
            }),
            <main>
                <nav className="nav nav-tabs">
                    <a
                        className="nav-item nav-link active"
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
                        className="nav-item nav-link disabled"
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
                <div className="tab-content">
                    <section
                        className="tab-pane fade active show"
                        id="sample_b_0"
                        role="tabpanel"
                        aria-labelledby="sample_h_0"
                    >
                        test
                    </section>
                    <section
                        className="tab-pane fade"
                        id="sample_b_1"
                        role="tabpanel"
                        aria-labelledby="sample_h_1"
                    >
                        example
                    </section>
                </div>
            </main>
        );
    });
});
