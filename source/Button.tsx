import classNames from 'classnames';
import { JsxChildren, VNode } from 'dom-renderer';
import { FC, WebCellProps } from 'web-cell';

import { FormControlProps } from './Form';
import { Icon, IconProps } from './Icon';
import { Color } from './type';

export interface ButtonProps
    extends WebCellProps<HTMLButtonElement>,
        Omit<WebCellProps<HTMLAnchorElement>, 'type'>,
        Pick<FormControlProps<'input'>, 'size'> {
    variant?: Color | `outline-${Color}` | 'link';
    active?: boolean;
}

export const Button: FC<ButtonProps> = ({
    className,
    href,
    variant,
    size,
    active,
    children,
    ...props
}) => {
    const { disabled, tabIndex } = props,
        Class = classNames(
            'btn',
            variant && `btn-${variant}`,
            size && `btn-${size}`,
            className
        );

    return href ? (
        <a
            role="button"
            className={classNames(Class, { disabled, active })}
            tabIndex={disabled ? -1 : tabIndex}
            ariaDisabled={disabled?.toString()}
            ariaPressed={active?.toString()}
            {...{ href, ...props }}
        >
            {children}
        </a>
    ) : (
        <button className={Class} {...props} ariaPressed={active?.toString()}>
            {children}
        </button>
    );
};

export function isButton(node: JsxChildren): node is VNode {
    const { selector, props } = node as VNode;

    return /^(a|input|button)/.test(selector) && props?.className?.btn;
}

export type IconButtonProps = IconProps & ButtonProps;

export const IconButton: FC<IconButtonProps> = ({
    className,
    name,
    ...button
}) => (
    <Button
        className={classNames('p-1', className)}
        style={{ lineHeight: '0.8' }}
        {...button}
    >
        <Icon name={name} />
    </Button>
);

export const CloseButton: FC<WebCellProps<HTMLButtonElement>> = ({
    className = '',
    ...props
}) => (
    <button
        className={`btn-close ${className}`}
        type="button"
        ariaLabel="Close"
        {...props}
    />
);
