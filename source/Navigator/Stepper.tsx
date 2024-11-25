import { WebCellProps } from 'web-cell';
import { JsxChildren, VNode } from 'dom-renderer';
import classNames from 'classnames';

export interface StepProps extends WebCellProps {
    icon?: JsxChildren;
    active?: boolean;
    disabled?: boolean;
}

export function Step({
    active,
    disabled,
    icon,
    children: defaultSlot,
    ...rest
}: StepProps) {
    return (
        <div className={classNames('step', { active })} {...rest}>
            <button
                type="button"
                className="step-trigger"
                disabled={disabled}
                role="tab"
                ariaSelected={!!active + ''}
            >
                <span className="bs-stepper-circle">{icon}</span>
                {defaultSlot[0] && (
                    <span className="bs-stepper-label">{defaultSlot}</span>
                )}
            </button>
        </div>
    );
}

export function isStep(node: JsxChildren): node is VNode {
    return (node as VNode).props?.className?.split(/\s+/).includes('step');
}

export interface StepperProps extends WebCellProps {}

export function Stepper({ className, children, ...rest }: StepperProps) {
    return (
        <nav {...rest} className={classNames('bs-stepper-header', className)}>
            {(children as JsxChildren[]).map((node, index) => (
                <>
                    {!!index && <div className="line" />}
                    {node}
                </>
            ))}
        </nav>
    );
}
