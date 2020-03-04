import { WebCellProps, createCell } from 'web-cell';
import { HTMLProps } from 'web-utility/source/DOM-type';
import { transitOut } from 'web-utility/source/animation';
import classNames from 'classnames';

import { Status, Theme } from '../utility/constant';

export interface AlertProps extends WebCellProps, HTMLProps {
    type?: keyof typeof Status | keyof typeof Theme;
    title?: string;
    closable?: boolean;
}

export function Alert({
    className,
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
                'show',
                className
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
