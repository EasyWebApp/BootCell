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
    onClick,
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
            onClick={event => {
                if (disabled) {
                    event.preventDefault();
                    event.stopPropagation();
                } else onClick?.(event);
            }}
        >
            {children}
        </a>
    ) : (
        <button
            className={Class}
            {...props}
            onClick={onClick}
            ariaPressed={active?.toString()}
        >
            {children}
        </button>
    );
};

export function isButton(node: JsxChildren): node is VNode {
    return (
        node instanceof VNode &&
        /^(a|input|button)$/.test(node.tagName?.toLowerCase()) &&
        typeof node.props?.className === 'string' &&
        node.props.className.split(/\s+/).includes('btn')
    );
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
        Omit<WebCellProps<HTMLInputElement>, 'size'>,
        Pick<ButtonProps, 'variant' | 'theme'> {
    type: Exclude<FormCheckProps['type'], 'switch'>;
    size?: ButtonProps['size'];
    inputRef?: WebCellProps<HTMLInputElement>['ref'];
}

export const ToggleButton: FC<ToggleButtonProps> = ({
    className = '',
    id = uniqueID(),
    variant = 'solid',
    theme = 'primary',
    size,
    inputRef,
    children,
    ...props
}) => (
    <label
        className={classNames(
            'btn-check',
            `btn-${variant}`,
            `theme-${theme}`,
            size && `btn-${size}`,
            className
        )}
    >
        <input id={id} autocomplete="off" {...props} ref={inputRef} />
        {children}
    </label>
);
