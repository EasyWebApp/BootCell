import { assertLooksLike } from 'snabbdom-looks-like';
import { createCell } from 'web-cell';

import { Stepper } from '../../source/Navigator/Stepper';

describe('Stepper', () => {
    it('should render steps with different states', () => {
        assertLooksLike(
            <Stepper id="test" path={[{}, {}, { disabled: true }]} />,

            <nav className="bs-stepper-header" role="tablist" id="test">
                <div className="step active">
                    <button
                        type="button"
                        className="step-trigger"
                        id="test-0"
                        role="tab"
                        aria-selected="true"
                        data-index="0"
                    >
                        <span className="bs-stepper-circle">{1}</span>
                    </button>
                </div>
                <div className="line" />

                <div className="step">
                    <button
                        type="button"
                        className="step-trigger"
                        id="test-1"
                        role="tab"
                        aria-selected="false"
                        data-index="1"
                    >
                        <span className="bs-stepper-circle">{2}</span>
                    </button>
                </div>
                <div className="line" />

                <div className="step">
                    <button
                        type="button"
                        className="step-trigger"
                        id="test-2"
                        role="tab"
                        aria-selected="false"
                        disabled
                        data-index="2"
                    >
                        <span className="bs-stepper-circle">{3}</span>
                    </button>
                </div>
            </nav>
        );
    });

    it('should render steps with custom icons & titles', () => {
        assertLooksLike(
            <Stepper id="test" path={[{ icon: 'A', title: 'A' }]} />,

            <nav className="bs-stepper-header" role="tablist" id="test">
                <div className="step active">
                    <button
                        type="button"
                        className="step-trigger"
                        id="test-0"
                        role="tab"
                        aria-selected="true"
                        data-index="0"
                    >
                        <span className="bs-stepper-circle">A</span>
                        <span className="bs-stepper-label">A</span>
                    </button>
                </div>
            </nav>
        );
    });
});
