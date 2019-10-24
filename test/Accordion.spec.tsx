import './DOM-polyfill';
import { createCell } from 'web-cell';
import { assertLooksLike } from 'snabbdom-looks-like';

import { AccordionList } from '../source/Content';

describe('Accordion', () => {
    it('should render Card list', () => {
        assertLooksLike(
            AccordionList.prototype.render.call({
                UID: 'random',
                list: [
                    { title: 'Test', content: 'test', active: true },
                    { title: 'Example', content: 'example' }
                ]
            }),
            <main>
                <section className="card">
                    <header class="card-header" id="random_h_0">
                        <h2 class="mb-0">
                            <button
                                type="button"
                                class="btn btn-link"
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
                        class="collapse show"
                        aria-labelledby={'random_h_0'}
                    >
                        <div class="card-body">test</div>
                    </div>
                </section>
                <section className="card">
                    <header class="card-header" id="random_h_1">
                        <h2 class="mb-0">
                            <button
                                type="button"
                                class="btn btn-link collapsed"
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
                        class="collapse"
                        aria-labelledby={'random_h_1'}
                    >
                        <div class="card-body">example</div>
                    </div>
                </section>
            </main>
        );
    });
});
