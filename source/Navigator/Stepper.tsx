import {
    WebCellProps,
    WebCellElement,
    VNode,
    createCell,
    Fragment
} from 'web-cell';
import classNames from 'classnames';

export interface StepProps extends WebCellProps {
    icon?: WebCellElement;
    active?: boolean;
    disabled?: boolean;
}

export function Step({
    active,
    disabled,
    icon,
    defaultSlot,
    ...rest
}: StepProps) {
    return (
        <div className={classNames('step', active && 'active')} {...rest}>
            <button
                type="button"
                className="step-trigger"
                disabled={disabled}
                role="tab"
                aria-selected={!!active + ''}
            >
                <span className="bs-stepper-circle">{icon}</span>
                {defaultSlot[0] && (
                    <span className="bs-stepper-label">{defaultSlot}</span>
                )}
            </button>
        </div>
    );
}

export interface StepperProps extends WebCellProps {}

export function Stepper({ className, defaultSlot, ...rest }: StepperProps) {
    return (
        <nav
            {...rest}
            className={classNames('bs-stepper-header', className)}
            role="tablist"
        >
            {(defaultSlot as VNode[]).map((node, index) => (
                <Fragment>
                    {index ? <div className="line" /> : null}
                    {node}
                </Fragment>
            ))}
        </nav>
    );
}
