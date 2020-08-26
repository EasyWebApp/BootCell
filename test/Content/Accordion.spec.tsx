import { createCell } from 'web-cell';
import { assertLooksLike } from '@tech_query/snabbdom-looks-like';

import { Accordion, AccordionPanel } from '../../source/Content/Accordion';

describe('Accordion', () => {
    it('should render Card list', () => {
        assertLooksLike(
            <Accordion>
                <AccordionPanel id="random_0" title="Test" active>
                    test
                </AccordionPanel>
                <AccordionPanel id="random_1" title="Example">
                    example
                </AccordionPanel>
            </Accordion>,
            <div className="accordion">
                <section className="card">
                    <header className="card-header" id="accordion_h_random_0">
                        <h2 className="mb-0">
                            <button
                                type="button"
                                className="btn btn-link"
                                aria-expanded="true"
                                aria-controls="accordion_b_random_0"
                            >
                                Test
                            </button>
                        </h2>
                    </header>
                    <collapse-box
                        id="accordion_b_random_0"
                        key="accordion_b_random_0"
                        aria-labelledby="accordion_h_random_0"
                        open
                    >
                        <div className="card-body">test</div>
                    </collapse-box>
                </section>
                <section className="card">
                    <header className="card-header" id="accordion_h_random_1">
                        <h2 className="mb-0">
                            <button
                                type="button"
                                className="btn btn-link collapsed"
                                aria-expanded="false"
                                aria-controls="accordion_b_random_1"
                            >
                                Example
                            </button>
                        </h2>
                    </header>
                    <collapse-box
                        id="accordion_b_random_1"
                        key="accordion_b_random_1"
                        aria-labelledby="accordion_h_random_1"
                    >
                        <div className="card-body">example</div>
                    </collapse-box>
                </section>
            </div>
        );
    });
});
