import { createCell } from 'web-cell';
import classNames from 'classnames';
import { Status, Theme, Size } from '../constant';

interface ButtonProps {
    type?: 'button' | 'submit' | 'reset' | 'image';
    href?: string | URL;
    disabled?: boolean;
    tabIndex?: number;
    kind?: (keyof typeof Status) | (keyof typeof Theme) | 'link';
    outline?: boolean;
    size?: keyof typeof Size;
    children?: any[];
}

export function Button({
    type = 'button',
    href,
    disabled,
    tabIndex,
    kind = 'primary',
    outline,
    size,
    children
}: ButtonProps) {
    const Class = `btn${outline ? '-outline' : ''}-${kind}`;

    return href ? (
        <a
            className={classNames(
                'btn',
                Class,
                size && `btn-${size}`,
                disabled && 'disabled'
            )}
            href={href}
            tabIndex={disabled ? -1 : tabIndex}
            role="button"
            aria-disabled={Boolean(disabled) + ''}
        >
            {children}
        </a>
    ) : (
        <button
            type={type}
            className={classNames('btn', Class, size && `btn-${size}`)}
            disabled
            tabIndex={tabIndex}
        >
            {children}
        </button>
    );
}
