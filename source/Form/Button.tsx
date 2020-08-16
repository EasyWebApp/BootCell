import { WebCellProps, createCell } from 'web-cell';
import { HTMLHyperLinkProps } from 'web-utility/source/DOM-type';
import classNames from 'classnames';

import { Status, Theme } from '../utility/constant';
import { IconProps, Icon } from '../Reminder/Icon';

export interface ButtonProps extends HTMLHyperLinkProps, WebCellProps {
    type?: 'button' | 'submit' | 'reset' | 'image';
    disabled?: boolean;
    kind?: keyof typeof Status | keyof typeof Theme | 'link';
    outline?: boolean;
    size?: 'sm' | 'lg';
    block?: boolean;
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
    defaultSlot,
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
            {defaultSlot}
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
            {defaultSlot}
        </button>
    );
}

export type IconButtonProps = IconProps & ButtonProps;

export function IconButton({
    className,
    type,
    disabled,
    href,
    target,
    kind,
    outline,
    size,
    block,
    onClick,
    ...icon
}: IconButtonProps) {
    return (
        <Button
            className={classNames('p-1', className)}
            {...{
                type,
                disabled,
                href,
                target,
                kind,
                outline,
                size,
                block,
                onClick
            }}
        >
            <Icon {...icon} />
        </Button>
    );
}

export function CloseButton({ className, defaultSlot, ...rest }: ButtonProps) {
    return (
        <button
            type="reset"
            aria-label="Close"
            className={classNames('close', className)}
            {...rest}
        >
            <span aria-hidden="true">&times;</span>
        </button>
    );
}
