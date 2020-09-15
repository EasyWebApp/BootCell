import { WebCellProps, createCell } from 'web-cell';
import { transitOut } from 'web-utility/source/animation';
import classNames from 'classnames';

import { CommonColors } from '../utility/constant';
import { CloseButton } from '../Form/Button';

export interface AlertProps extends WebCellProps {
    color?: CommonColors;
    title?: string;
    closable?: boolean;
}

export function Alert({
    className,
    color = 'primary',
    title,
    defaultSlot,
    closable
}: AlertProps) {
    return (
        <aside
            className={classNames(
                'alert',
                `alert-${color}`,
                closable && 'alert-dismissible fade',
                'show',
                className
            )}
            role="alert"
        >
            {title && <h4 className="alert-heading">{title}</h4>}

            {defaultSlot}

            {!closable ? null : (
                <CloseButton
                    onClick={({ currentTarget }) =>
                        transitOut(
                            (currentTarget as HTMLElement).parentElement,
                            'show'
                        )
                    }
                />
            )}
        </aside>
    );
}
