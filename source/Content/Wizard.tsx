import { observable } from 'mobx';
import { WebCellProps, attribute, component } from 'web-cell';

import { Step, Stepper } from '../Navigator/Stepper';
import { TabsBase, TabsProps } from './Tabs';
import { WizardModel } from './WizardModel';

export interface WizardProps extends TabsProps {
    linear?: boolean;
    /** Also emits a bubbling `complete` CustomEvent<TabSelectionDetail>. */
    onComplete?: (event?: Event) => void;
}

@component({ tagName: 'wizard-box', mode: 'open' })
export class Wizard extends TabsBase {
    static observedAttributes: string[] = [];
    declare props: WizardProps & WebCellProps;
    declare readonly model: WizardModel;
    @attribute @observable accessor linear = true;
    onComplete?: WizardProps['onComplete'];

    // DOM-renderer's lowercased JSX callback is not a native event handler.
    get oncomplete(): null {
        return null;
    }
    set oncomplete(value: WizardProps['onComplete'] | null) {
        this.onComplete = value ?? undefined;
    }

    protected createModel() {
        return new WizardModel(this);
    }

    private handleSubmit = (event: Event) => {
        if (!this.model.tabs[this.model.index]?.contains(event.target as Node))
            return;
        event.preventDefault();
        event.stopPropagation();
        this.model.next(event);
    };

    private handleReset = (event: Event) => {
        if (!this.model.tabs[this.model.index]?.contains(event.target as Node))
            return;
        event.stopPropagation();
        this.model.previous(event);
    };

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('submit', this.handleSubmit);
        this.addEventListener('reset', this.handleReset);
    }

    disconnectedCallback() {
        this.removeEventListener('submit', this.handleSubmit);
        this.removeEventListener('reset', this.handleReset);
        super.disconnectedCallback();
    }

    next(event?: Event) {
        return this.model.next(event);
    }

    previous(event?: Event) {
        return this.model.previous(event);
    }

    protected renderHeaders() {
        const { model } = this;
        return (
            <Stepper
                aria-orientation={model.vertical ? 'vertical' : 'horizontal'}
            >
                {model.tabs.map((tab, index) => (
                    <Step
                        icon={tab.icon ?? index + 1}
                        active={model.index === index}
                        disabled={model.isDisabled(index)}
                        triggerId={model.headerId(index)}
                        controls={tab.id}
                        data-tab-index={index}
                        tabIndex={model.index === index ? 0 : -1}
                    >
                        {tab.caption ?? tab.tabTitle ?? tab.title}
                    </Step>
                ))}
            </Stepper>
        );
    }

    renderContent() {
        return (
            <div
                className={`bs-stepper ${this.model.vertical ? 'vertical' : ''} ${this.linear ? 'linear' : ''}`}
            >
                <style>{`
                    .bs-stepper-header { display: flex; align-items: center; gap: 1rem }
                    .bs-stepper-content { flex: 1; min-width: 0; padding: 1rem }
                    .step-trigger { display: flex; align-items: center; gap: .5rem; border: 0; background: none; color: inherit; padding: .5rem }
                    .bs-stepper-circle { border-radius: 50%; background: var(--bs-secondary, gray); color: white; padding: .25rem .75rem }
                    .active .bs-stepper-circle { background: var(--bs-primary, blue) }
                    .step-trigger:disabled { opacity: .5 }
                    .line { flex: 1; border-block-start: 1px solid currentColor }
                    .vertical { display: flex }
                    .vertical .bs-stepper-header { flex-direction: column }
                `}</style>
                {this.renderHeaders()}
                <div className="bs-stepper-content">
                    <slot />
                </div>
            </div>
        );
    }
}
