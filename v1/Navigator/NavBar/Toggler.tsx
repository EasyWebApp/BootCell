import { WebCellProps, createCell } from 'web-cell';
import classNames from 'classnames';

import { ButtonProps } from '../../Form/Button';

export interface NavBarTogglerProps
    extends Pick<ButtonProps, 'type' | 'disabled'>,
        WebCellProps {}

export function NavBarToggler({
    className,
    defaultSlot,
    ...rest
}: NavBarTogglerProps) {
    return (
        <button
            type="button"
            className={classNames('navbar-toggler', className)}
            aria-label="Toggle navigation"
            {...rest}
        >
            <span className="navbar-toggler-icon" />
        </button>
    );
}
