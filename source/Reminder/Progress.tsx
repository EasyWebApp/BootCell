import { createCell } from 'web-cell';
import classNames from 'classnames';

import { HTMLProps, WebCellProps, Status } from '../utility';

export interface ProgressProps extends HTMLProps, WebCellProps {
    striped?: boolean;
    animated?: boolean;
    status?: keyof typeof Status;
    percent?: number;
}

export function Progress({
    striped,
    animated,
    status = 'primary',
    percent = 0,
    defaultSlot,
    ...rest
}: ProgressProps) {
    return (
        <div {...rest} className="progress">
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
                {defaultSlot[0] ? defaultSlot : percent + '%'}
            </div>
        </div>
    );
}
