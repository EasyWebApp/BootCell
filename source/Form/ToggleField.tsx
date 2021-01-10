import { WebCellProps, createCell } from 'web-cell';
import type { BaseFieldProps } from 'web-utility';
import { uniqueID } from 'web-utility/source/data';
import classNames from 'classnames';

import { FormFieldProps } from './FormField';
import { ButtonProps } from './Button';
import { ValidableFieldProps, ValidMessage } from './Form';

export interface ToggleFieldProps
    extends WebCellProps,
        BaseFieldProps,
        ValidableFieldProps {
    type: 'radio' | 'checkbox';
    checked?: boolean;
    indeterminate?: boolean;
    switch?: boolean;
    inline?: boolean;
}

export function ToggleField({
    className,
    type,
    checked,
    indeterminate,
    switch: Switch,
    inline,
    id = uniqueID(),
    defaultSlot,
    validMode,
    validMessage,
    invalidMessage,
    ...rest
}: ToggleFieldProps) {
    return (
        <div
            className={classNames(
                'custom-control',
                `custom-${Switch ? 'switch' : type}`,
                inline && 'custom-control-inline',
                className
            )}
        >
            <input
                {...rest}
                className="custom-control-input"
                type={type}
                id={id}
                checked={checked}
                indeterminate={indeterminate}
            />
            {defaultSlot[0] && (
                <label className="custom-control-label" htmlFor={id}>
                    {defaultSlot}
                </label>
            )}
            <ValidMessage {...{ validMode, validMessage, invalidMessage }} />
        </div>
    );
}

export interface ToggleOption {
    title: string;
    value?: string;
    color?: ButtonProps['color'];
}

export interface ToggleGroupProps extends FormFieldProps {
    type: ToggleFieldProps['type'];
    options: ToggleOption[];
    value?: string;
    color?: ButtonProps['color'];
}

function toggleActive(event: MouseEvent) {
    const {
        parentElement: { classList },
        checked
    } = event.target as HTMLInputElement;

    classList.toggle('active', checked);
}

export function ToggleGroup({
    className,
    options,
    value,
    color = 'primary',
    type,
    name,
    defaultSlot,
    ...rest
}: ToggleGroupProps) {
    return (
        <div
            className={classNames('btn-group', 'btn-group-toggle', className)}
            {...rest}
        >
            {options.map(({ title, ...option }) => {
                option.value = option.value || title;
                const checked = option.value === value;

                return (
                    <label
                        className={classNames(
                            'btn',
                            `btn-${option.color || color}`,
                            checked && 'active'
                        )}
                    >
                        <input
                            type={type}
                            name={name}
                            value={option.value}
                            checked={checked}
                            onClick={toggleActive}
                        />
                        {title}
                    </label>
                );
            })}
        </div>
    );
}
