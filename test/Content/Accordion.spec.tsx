import '../polyfill';
import { createCell, Fragment } from 'web-cell';
import { assertLooksLike } from 'snabbdom-looks-like';

import { AccordionList } from '../../source/Content/Accordion';

describe('Accordion', () => {
    it('should render Card list', () => {
        assertLooksLike(
            AccordionList.prototype.render.call(
                { UID: 'random' },
                {
                    list: [
                        { title: 'Test', content: 'test', active: true },
                        { title: 'Example', content: 'example' }
                    ]
                }
            ),
            <Fragment>
                <section className="card">
                    <header className="card-header" id="random_h_0">
                        <h2 className="mb-0">
                            <button
                                type="button"
                                className="btn btn-link"
                                data-index="0"
                                aria-expanded="true"
                                aria-controls="random_b_0"
                            >
                                Test
                            </button>
                        </h2>
                    </header>
                    <div
                        id="random_b_0"
                        className="collapse show"
                        aria-labelledby={'random_h_0'}
                    >
                        <div className="card-body">test</div>
                    </div>
                </section>
                <section className="card">
                    <header className="card-header" id="random_h_1">
                        <h2 className="mb-0">
                            <button
                                type="button"
                                className="btn btn-link collapsed"
                                data-index="1"
                                aria-expanded="false"
                                aria-controls="random_b_1"
                            >
                                Example
                            </button>
                        </h2>
                    </header>
                    <div
                        id="random_b_1"
                        className="collapse"
                        aria-labelledby={'random_h_1'}
                    >
                        <div className="card-body">example</div>
                    </div>
                </section>
            </Fragment>
        );
    });
});
