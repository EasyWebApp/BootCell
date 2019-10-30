import { createCell } from 'web-cell';
import classNames from 'classnames';

import { HTMLHyperLinkProps, Status, Theme, Size } from '../utility';

interface ButtonProps extends HTMLHyperLinkProps {
    type?: 'button' | 'submit' | 'reset' | 'image';
    disabled?: boolean;
    kind?: (keyof typeof Status) | (keyof typeof Theme) | 'link';
    outline?: boolean;
    size?: 'sm' | 'lg';
    block?: boolean;
    children?: any[];
}

export function Button({
    className,
    type = 'button',
    disabled,
    href,
    target,
    tabIndex,
    kind = 'primary',
    outline,
    size,
    block,
    children,
    ...rest
}: ButtonProps) {
    const Class = `btn${outline ? '-outline' : ''}-${kind}`;

    return href ? (
        <a
            {...rest}
            className={classNames(
                'btn',
                Class,
                size && `btn-${size}`,
                block && 'btn-block',
                disabled && 'disabled',
                className
            )}
            href={href}
            target={target}
            tabIndex={disabled ? -1 : tabIndex}
            role="button"
            aria-disabled={Boolean(disabled) + ''}
        >
            {children}
        </a>
    ) : (
        <button
            {...rest}
            type={type}
            className={classNames(
                'btn',
                Class,
                size && `btn-${size}`,
                block && 'btn-block',
                className
            )}
            disabled={disabled}
            tabIndex={tabIndex}
        >
            {children}
        </button>
    );
}
