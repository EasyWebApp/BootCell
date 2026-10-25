import { describe, it } from 'node:test';
import { expect } from 'expect';
import { assertLooksLike, render } from '../render';

import { Stepper, Step } from '../../source/Navigator/Stepper';

describe('Stepper', () => {
    it('links step triggers to panels and supports missing children', () => {
        const root = render(
            <Stepper>
                <Step
                    triggerId="step-1"
                    controls="pane-1"
                    tabIndex={0}
                    active
                />
            </Stepper>
        );
        expect(root.querySelector('nav')?.getAttribute('role')).toBe('tablist');
        expect(root.querySelector('button')?.id).toBe('step-1');
        expect(
            root.querySelector('button')?.getAttribute('aria-controls')
        ).toBe('pane-1');
        expect(root.querySelector('button')?.tabIndex).toBe(0);
        expect(() => render(<Stepper />)).not.toThrow();
    });
    it('should render steps with different states', () => {
        assertLooksLike(
            <Stepper>
                <Step icon={1} active />
                <Step icon={2} />
                <Step icon={3} disabled />
            </Stepper>,
            <nav className="bs-stepper-header">
                <div className="step active">
                    <button
                        type="button"
                        className="step-trigger"
                        role="tab"
                        aria-selected="true"
                    >
                        <span className="bs-stepper-circle">{1}</span>
                    </button>
                </div>
                <div className="line" />

                <div className="step">
                    <button
                        type="button"
                        className="step-trigger"
                        role="tab"
                        aria-selected="false"
                    >
                        <span className="bs-stepper-circle">{2}</span>
                    </button>
                </div>
                <div className="line" />

                <div className="step">
                    <button
                        type="button"
                        className="step-trigger"
                        role="tab"
                        aria-selected="false"
                        disabled
                    >
                        <span className="bs-stepper-circle">{3}</span>
                    </button>
                </div>
            </nav>
        );
    });

    it('should render steps with custom icons & titles', () => {
        assertLooksLike(
            <Stepper>
                <Step icon="A" active>
                    A
                </Step>
            </Stepper>,
            <nav className="bs-stepper-header">
                <div className="step active">
                    <button
                        type="button"
                        className="step-trigger"
                        role="tab"
                        aria-selected="true"
                    >
                        <span className="bs-stepper-circle">A</span>
                        <span className="bs-stepper-label">A</span>
                    </button>
                </div>
            </nav>
        );
    });
});
