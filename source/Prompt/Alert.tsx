import { createCell, transitOut } from 'web-cell';
import classNames from 'classnames';

import { WebCellProps, Status, Theme } from '../utility';

export interface AlertProps extends WebCellProps {
    type?: keyof typeof Status | keyof typeof Theme;
    title?: string;
    closable?: boolean;
}

export function Alert({
    type = 'primary',
    title,
    defaultSlot,
    closable
}: AlertProps) {
    return (
        <aside
            className={classNames(
                'alert',
                `alert-${type}`,
                closable && 'alert-dismissible fade',
                'show'
            )}
            role="alert"
        >
            {title && <h4 className="alert-heading">{title}</h4>}

            {defaultSlot}

            {!closable ? null : (
                <button
                    type="button"
                    className="close"
                    aria-label="Close"
                    onClick={({ currentTarget }) =>
                        transitOut(
                            (currentTarget as HTMLElement).parentElement,
                            'show',
                            true
                        )
                    }
                >
                    <span aria-hidden="true">&times;</span>
                </button>
            )}
        </aside>
    );
}
