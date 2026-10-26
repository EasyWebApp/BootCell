import { WebCellProps } from 'web-cell';
import { JsxChildren, VNode } from 'dom-renderer';
import classNames from 'classnames';

export interface StepProps extends WebCellProps {
    icon?: JsxChildren;
    active?: boolean;
    disabled?: boolean;
    triggerId?: string;
    controls?: string;
}

export function Step({
    active,
    disabled,
    icon,
    triggerId,
    controls,
    tabIndex,
    className,
    children: defaultSlot,
    ...rest
}: StepProps) {
    return (
        <div {...rest} className={classNames('step', className, { active })}>
            <button
                type="button"
                className="step-trigger"
                disabled={disabled}
                role="tab"
                ariaSelected={!!active + ''}
                id={triggerId}
                aria-controls={controls}
                tabIndex={tabIndex}
            >
                <span className="bs-stepper-circle">{icon}</span>
                {defaultSlot != null &&
                    (!Array.isArray(defaultSlot) || defaultSlot.length > 0) && (
                        <span className="bs-stepper-label">{defaultSlot}</span>
                    )}
            </button>
        </div>
    );
}

export function isStep(node: JsxChildren): node is VNode {
    return !!(node as VNode)?.props?.className?.split(/\s+/).includes('step');
}

export interface StepperProps extends WebCellProps {}

export function Stepper({ className, children, ...rest }: StepperProps) {
    return (
        <nav
            role="tablist"
            {...rest}
            className={classNames('bs-stepper-header', className)}
        >
            {(
                [children]
                    .flat()
                    .filter(
                        node => node != null && node !== false
                    ) as JsxChildren[]
            ).map((node, index) => (
                <>
                    {!!index && <div className="line" aria-hidden="true" />}
                    {node}
                </>
            ))}
        </nav>
    );
}
