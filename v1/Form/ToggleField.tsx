import {
    VNode,
    VNodeChildElement,
    WebCellProps,
    createCell,
    Fragment
} from 'web-cell';
import { HTMLFieldProps, uniqueID } from 'web-utility';
import classNames from 'classnames';

import { ButtonProps } from './Button';
import { ValidableFieldProps, ValidMessage } from './Form';

export interface ToggleFieldProps
    extends WebCellProps,
        HTMLFieldProps,
        Pick<ButtonProps, 'color' | 'outline'>,
        ValidableFieldProps {
    type?: 'radio' | 'checkbox';
    checked?: boolean;
    indeterminate?: boolean;
    mode?: 'normal' | 'button' | 'switch';
    labelHidden?: boolean;
    inline?: boolean;
}

export function ToggleField({
    className,
    type,
    checked,
    name,
    value,
    disabled,
    indeterminate,
    mode = 'normal',
    labelHidden,
    inline,
    color,
    outline,
    id = uniqueID(),
    defaultSlot,
    validMode,
    validMessage,
    invalidMessage,
    ...rest
}: ToggleFieldProps) {
    const isSwitch = mode === 'switch',
        props = { id, type, name, value, disabled, indeterminate, checked };

    return mode !== 'button' ? (
        <div
            className={classNames(
                !labelHidden && 'form-check',
                inline && 'form-check-inline',
                isSwitch && 'form-switch',
                className
            )}
            {...rest}
        >
            <input
                className="form-check-input"
                {...props}
                type={isSwitch ? 'checkbox' : type}
                role={isSwitch ? mode : undefined}
                aria-label={defaultSlot}
            />
            {!labelHidden && (
                <label className="form-check-label" htmlFor={id}>
                    {defaultSlot}
                </label>
            )}
            <ValidMessage {...{ validMode, validMessage, invalidMessage }} />
        </div>
    ) : (
        <>
            <input className="btn-check" {...props} autocomplete="off" />
            <label
                className={classNames(
                    'btn',
                    `btn${outline ? '-outline' : ''}-${color}`,
                    className
                )}
                {...rest}
                htmlFor={id}
            >
                {defaultSlot}
            </label>
        </>
    );
}

export function isToggleField(
    node: VNodeChildElement | VNodeChildElement[]
): node is VNode | VNode[] {
    if (
        node instanceof Array &&
        node.some(
            item =>
                item &&
                typeof item === 'object' &&
                item.data.class?.['btn-check']
        )
    )
        return true;

    if (typeof node !== 'object') return false;

    const { children } = node as VNode;

    return !!(children[0] as VNode)?.data?.class?.['form-check-input'];
}
