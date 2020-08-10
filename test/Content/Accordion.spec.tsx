import { createCell } from 'web-cell';
import { assertLooksLike } from '@tech_query/snabbdom-looks-like';

import { AccordionList } from '../../source/Content/Accordion';

const { render } = AccordionList.prototype;

describe('Accordion', () => {
    it('should render Card list', () => {
        assertLooksLike(
            <div>
                {render.call(
                    { UID: 'random' },
                    {
                        list: [
                            { title: 'Test', content: 'test', active: true },
                            { title: 'Example', content: 'example' }
                        ]
                    }
                )}
            </div>,
            <div>
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
                    <collapse-box
                        id="random_b_0"
                        key="random_b_0"
                        aria-labelledby="random_h_0"
                        open
                    >
                        <div className="card-body">test</div>
                    </collapse-box>
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
                    <collapse-box
                        id="random_b_1"
                        key="random_b_1"
                        aria-labelledby="random_h_1"
                    >
                        <div className="card-body">example</div>
                    </collapse-box>
                </section>
            </div>
        );
    });
});
