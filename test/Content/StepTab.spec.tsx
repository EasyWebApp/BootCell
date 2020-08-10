import { assertLooksLike } from '@tech_query/snabbdom-looks-like';
import { createCell, Fragment } from 'web-cell';

import { StepTab } from '../../source/Content/StepTab';

const { render } = StepTab.prototype;

describe('Step tab', () => {
    it('should render a Step Tab with clickable headers defaultly', () => {
        assertLooksLike(
            render.call({ id: 'test' }, { path: [{ content: 'A' }] }),
            <Fragment>
                <nav className="bs-stepper-header" role="tablist">
                    <div className="step active">
                        <button
                            type="button"
                            className="step-trigger"
                            id="test-H-0"
                            role="tab"
                            aria-controls="test-0"
                            aria-selected="true"
                            data-index="0"
                        >
                            <span className="bs-stepper-circle">{1}</span>
                        </button>
                    </div>
                </nav>
                <div className="bs-stepper-content">
                    <div
                        id="test-0"
                        className="bs-stepper-pane"
                        role="tabpanel"
                        aria-labelledby="test-H-0"
                    >
                        A
                    </div>
                </div>
            </Fragment>
        );
    });

    it('should render a Step Tab with linear headers', () => {
        assertLooksLike(
            render.call(
                { id: 'test' },
                {
                    linear: true,
                    path: [{ content: 'A' }, { content: 'B' }],
                    activeIndex: 1
                }
            ),
            <Fragment>
                <nav className="bs-stepper-header" role="tablist">
                    <div className="step">
                        <button
                            type="button"
                            className="step-trigger"
                            id="test-H-0"
                            role="tab"
                            aria-controls="test-0"
                            aria-selected="false"
                            disabled
                            data-index="0"
                        >
                            <span className="bs-stepper-circle">{1}</span>
                        </button>
                    </div>
                    <div className="step active">
                        <button
                            type="button"
                            className="step-trigger"
                            id="bs-stepper-head-1"
                            role="tab"
                            aria-controls="test-1"
                            aria-selected="true"
                            disabled
                            data-index="1"
                        >
                            <span className="bs-stepper-circle">{2}</span>
                        </button>
                    </div>
                </nav>
                <div className="bs-stepper-content">
                    <div
                        id="test-0"
                        className="bs-stepper-pane"
                        role="tabpanel"
                        aria-labelledby="bs-stepper-head-0"
                    >
                        A
                    </div>
                    <div
                        id="test-1"
                        className="bs-stepper-pane"
                        role="tabpanel"
                        aria-labelledby="bs-stepper-head-1"
                    >
                        B
                    </div>
                </div>
            </Fragment>
        );
    });
});
