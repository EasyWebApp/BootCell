import { WebCellProps, VNodeChildElement, createCell } from 'web-cell';
import classNames from 'classnames';

import { Status } from '../utility/constant';

export interface ProgressBarProps extends WebCellProps {
    striped?: boolean;
    animated?: boolean;
    status?: keyof typeof Status;
    percent?: number;
    label?: true | ((percent: number) => VNodeChildElement);
}

export function ProgressBar({
    className,
    striped,
    animated,
    status = 'primary',
    percent = 0,
    label
}: ProgressBarProps) {
    label = label === true ? percent => percent + '%' : label;

    return (
        <div
            className={classNames(
                'progress-bar',
                striped && 'progress-bar-striped',
                animated && 'progress-bar-animated',
                status !== 'primary' && `bg-${status}`,
                className
            )}
            role="progressbar"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow={percent + ''}
            style={{ width: percent + '%' }}
        >
            {label?.(percent)}
        </div>
    );
}

export interface ProgressProps extends ProgressBarProps, WebCellProps {}

export function Progress({
    className,
    striped,
    animated,
    status,
    percent,
    label,
    defaultSlot,
    ...rest
}: ProgressProps) {
    return (
        <div {...rest} className={classNames('progress', className)}>
            {defaultSlot[0] ? (
                defaultSlot
            ) : (
                <ProgressBar
                    {...{ striped, animated, status, percent, label }}
                />
            )}
        </div>
    );
}
