import classNames from 'classnames';
import { JsxChildren, VNode } from 'dom-renderer';
import { FC, WebCellProps } from 'web-cell';
import { uniqueID } from 'web-utility';

import { FormCheckProps, FormControlProps } from './Form';
import { Icon, IconProps } from '../Reminder';
import { ThemeColor } from '../type';

export interface ButtonProps
    extends
        WebCellProps<HTMLButtonElement>,
        Omit<WebCellProps<HTMLAnchorElement>, 'type'>,
        Pick<FormControlProps<'input'>, 'size'> {
    variant?: 'solid' | 'outline' | 'subtle' | 'text' | 'link';
    theme?: ThemeColor;
    active?: boolean;
}

export const Button: FC<ButtonProps> = ({
    className,
    href,
    variant,
    theme,
    size,
    active,
    children,
    ...props
}) => {
    const { disabled, tabIndex } = props,
        Class = classNames(
            'btn',
            variant && `btn-${variant}`,
            theme && `theme-${theme}`,
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

export type IconButtonProps = IconProps & Omit<ButtonProps, 'size'>;

export const IconButton: FC<IconButtonProps> = ({
    className,
    name,
    color,
    size,
    ...button
}) => (
    <Button
        className={classNames('p-1', className)}
        style={{ lineHeight: '0.8' }}
        {...button}
    >
        <Icon {...{ name, color, size }} />
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

export interface ToggleButtonProps
    extends
        WebCellProps<HTMLInputElement>,
        Pick<ButtonProps, 'variant' | 'theme'> {
    type: Exclude<FormCheckProps['type'], 'switch'>;
}

export const ToggleButton: FC<ToggleButtonProps> = ({
    className = '',
    id = uniqueID(),
    variant = 'solid',
    theme = 'primary',
    children,
    ...props
}) => (
    <label
        className={classNames(
            'btn-check',
            `btn-${variant}`,
            `theme-${theme}`,
            className
        )}
    >
        <input id={id} autocomplete="off" {...props} />
        {children}
    </label>
);
