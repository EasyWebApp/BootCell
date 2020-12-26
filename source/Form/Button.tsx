import { WebCellProps, VNodeChildElement, VNode, createCell } from 'web-cell';
import { HTMLHyperLinkProps } from 'web-utility/source/DOM-type';
import classNames from 'classnames';

import { CommonColors } from '../utility/constant';
import { IconProps, Icon } from '../Reminder/Icon';

export interface ButtonProps extends HTMLHyperLinkProps, WebCellProps {
    type?: 'button' | 'submit' | 'reset' | 'image';
    disabled?: boolean;
    color?: CommonColors | 'link';
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
    color,
    outline,
    size,
    block,
    defaultSlot,
    ...rest
}: ButtonProps) {
    const colorClass = color && `btn${outline ? '-outline' : ''}-${color}`;

    return href ? (
        <a
            {...rest}
            className={classNames(
                'btn',
                colorClass,
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
                colorClass,
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

export function isButton(node: VNodeChildElement): node is VNode {
    const { sel, data } = node as VNode;

    return /^(a|input|button)/.test(sel) && data?.class?.btn;
}

export type IconButtonProps = IconProps & ButtonProps;

export function IconButton({ className, name, ...button }: IconButtonProps) {
    return (
        <Button
            className={classNames('p-1', className)}
            style={{ lineHeight: '0.8' }}
            {...button}
        >
            <Icon name={name} />
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
