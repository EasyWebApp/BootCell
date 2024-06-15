import classNames from 'classnames';
import { FC, WebCellProps } from 'web-cell';

import { TextColor } from '../type';

export interface SpinnerProps extends WebCellProps<HTMLDivElement> {
    variant?: TextColor;
    size?: 'sm';
    animation?: 'border' | 'grow';
}

export const Spinner: FC<SpinnerProps> = ({
    className,
    variant,
    size,
    animation = 'border',
    children = 'Loading...',
    ...props
}) => (
    <div
        className={classNames(
            `spinner-${animation}`,
            size && `spinner-${animation}-${size}`,
            variant && `text-${variant}`,
            className
        )}
        role="status"
        {...props}
    >
        <span className="visually-hidden">{children}</span>
    </div>
);

export interface SpinnerBoxProps extends SpinnerProps {
    cover?: boolean;
}

export const SpinnerBox: FC<SpinnerBoxProps> = ({
    className = '',
    cover,
    variant,
    size,
    animation,
    role,
    children,
    ...props
}) => (
    <div className={`position-relative ${className}`} {...props}>
        {children}

        {cover && (
            <div className="modal-backdrop show d-flex justify-content-center align-items-center">
                <Spinner
                    {...{ variant, size, animation, role, ariaHidden: 'true' }}
                />
            </div>
        )}
    </div>
);
