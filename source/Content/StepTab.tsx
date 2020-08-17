import {
    WebCellProps,
    component,
    mixin,
    attribute,
    watch,
    on,
    createCell,
    Fragment
} from 'web-cell';
import { uniqueID } from 'web-utility/source/data';
import { watchMotion } from 'web-utility/source/animation';

import { StepProps, Step, Stepper } from '../Navigator/Stepper';

export interface StepTabProps extends WebCellProps {
    direction?: 'horizontal' | 'vertical';
    linear?: boolean;
    path: StepProps[];
    activeIndex?: number;
}

@component({
    tagName: 'step-tab',
    renderTarget: 'children'
})
export class StepTab extends mixin<StepTabProps>() {
    @attribute
    @watch
    direction: StepTabProps['direction'] = 'horizontal';

    @attribute
    @watch
    linear = false;

    @watch
    path: StepTabProps['path'] = [];

    @attribute
    @watch
    set activeIndex(activeIndex: number) {
        this.setProps({ activeIndex }).then(() => this.turnTo());
    }

    connectedCallback() {
        this.id = this.id || 'BST' + uniqueID();

        super.connectedCallback();

        this.activeIndex = 0;
    }

    updatedCallback() {
        this.classList.add('bs-stepper');
        this.classList.toggle('vertical', this.direction === 'vertical');
        this.classList.toggle('linear', this.linear);
    }

    @on('submit', '.bs-stepper-pane form')
    handleSubmit(event: Event, form: HTMLFormElement) {
        this.activeIndex++;
    }

    @on('reset', '.bs-stepper-pane form')
    handleReset(event: Event, form: HTMLFormElement) {
        this.activeIndex--;
    }

    async turnTo(index = this.activeIndex) {
        const previous = this.querySelector<HTMLDivElement>(
                '.bs-stepper-pane.active'
            ),
            next = this.querySelectorAll<HTMLDivElement>('.bs-stepper-pane')[
                index
            ];

        if (previous) {
            const end = watchMotion('transition', previous);
            previous.classList.remove('active');
            await end;
            if (this.direction !== 'vertical')
                previous.classList.remove('fade');
        }
        if (next) {
            next.classList.add('fade');
            const end = watchMotion('transition', next);
            next.classList.add('active');
            await end;
        }
    }

    render({ path, linear, activeIndex }: StepTabProps) {
        return (
            <Fragment>
                <Stepper>
                    {path.map(({ icon, title }, index) => (
                        <Step
                            id={`${this.id}-H-${index}`}
                            icon={icon || index + 1}
                            active={index === activeIndex}
                            disabled={linear}
                            aria-controls={`${this.id}-${index}`}
                            onClick={() => (this.activeIndex = index)}
                            onFocusIn={() => (this.activeIndex = index)}
                        >
                            {title}
                        </Step>
                    ))}
                </Stepper>
                <div className="bs-stepper-content">
                    {path.map(({ content }, index) => (
                        <div
                            id={`${this.id}-${index}`}
                            className="bs-stepper-pane"
                            role="tabpanel"
                            aria-labelledby={`${this.id}-H-${index}`}
                        >
                            {content}
                        </div>
                    ))}
                </div>
            </Fragment>
        );
    }
}
