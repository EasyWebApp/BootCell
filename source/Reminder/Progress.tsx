import { FC, WebCellProps } from 'web-cell';
import { JsxChildren } from 'dom-renderer';
import { isEmpty } from 'web-utility';
import classNames from 'classnames';

import { Status } from '../type';

export interface ProgressBarProps
    extends WebCellProps<HTMLDivElement>,
        Partial<Record<'min' | 'max' | 'now', number>> {
    striped?: boolean;
    animated?: boolean;
    variant?: keyof typeof Status;
    label?: boolean | ((now: number) => JsxChildren);
}

export const ProgressBar: FC<ProgressBarProps> = ({
    className = '',
    striped,
    animated,
    variant = 'primary',
    min = 0,
    max = 100,
    now = min,
    label,
    children
}) =>
    isEmpty(children) ? (
        <div
            className={`progress ${className}`}
            role="progressbar"
            ariaValueMin={min + ''}
            ariaValueMax={max + ''}
            ariaValueNow={now + ''}
        >
            <div
                className={classNames(
                    'progress-bar',
                    `text-bg-${variant}`,
                    striped && 'progress-bar-striped',
                    animated && `progress-bar-animated`
                )}
                style={{ width: now + '%' }}
            >
                {typeof label === 'function' ? label(now) : label && `${now}%`}
            </div>
        </div>
    ) : (
        <div className={`progress-stacked ${className}`}>{children}</div>
    );
