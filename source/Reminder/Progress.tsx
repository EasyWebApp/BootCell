import { WebCellProps, VNodeChildElement, createCell } from 'web-cell';
import classNames from 'classnames';

import { Status } from '../utility/constant';

export interface ProgressBarProps {
    striped?: boolean;
    animated?: boolean;
    status?: keyof typeof Status;
    percent?: number;
    label?: true | ((percent: number) => VNodeChildElement);
}

export interface ProgressProps extends ProgressBarProps, WebCellProps {
    bars?: ProgressBarProps[];
}

export function Progress({
    className,
    striped,
    animated,
    status,
    percent,
    label,
    bars,
    defaultSlot,
    ...rest
}: ProgressProps) {
    bars = bars || [{ striped, animated, status, percent, label }];

    return (
        <div {...rest} className={classNames('progress', className)}>
            {bars.map(
                ({
                    striped,
                    animated,
                    status = 'primary',
                    percent = 0,
                    label
                }) => {
                    label = label === true ? percent => percent + '%' : label;

                    return (
                        <div
                            className={classNames(
                                'progress-bar',
                                striped && 'progress-bar-striped',
                                animated && 'progress-bar-animated',
                                status !== 'primary' && 'bg-' + status
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
            )}
        </div>
    );
}
