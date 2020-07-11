import { WebCellElement, WebCellProps, createCell, Fragment } from 'web-cell';
import { HTMLProps } from 'web-utility/source/DOM-type';
import { uniqueID } from 'web-utility/source/data';
import classNames from 'classnames';

export interface Step extends HTMLProps {
    title?: string;
    icon?: WebCellElement;
    disabled?: boolean;
}

export interface StepperProps extends WebCellProps {
    path: Step[];
    activeIndex?: number;
}

export function Stepper({
    id = 'BSH-' + uniqueID(),
    className,
    path,
    activeIndex = 0,
    defaultSlot,
    ...rest
}: StepperProps) {
    return (
        <nav
            {...rest}
            id={id}
            className={classNames('bs-stepper-header', className)}
            role="tablist"
        >
            {path.map(({ icon, title, ...rest }, index) => {
                const active = activeIndex === index;

                return (
                    <Fragment>
                        {index ? <div className="line" /> : null}

                        <div className={classNames('step', active && 'active')}>
                            <button
                                {...rest}
                                type="button"
                                className="step-trigger"
                                id={`${id}-${index}`}
                                role="tab"
                                aria-selected={active + ''}
                                data-index={index + ''}
                            >
                                <span className="bs-stepper-circle">
                                    {icon || index + 1}
                                </span>
                                {title && (
                                    <span className="bs-stepper-label">
                                        {title}
                                    </span>
                                )}
                            </button>
                        </div>
                    </Fragment>
                );
            })}
        </nav>
    );
}
