import { WebCellProps, createCell } from 'web-cell';
import { BaseFieldProps } from 'web-utility/source/DOM-type';
import { uniqueID } from 'web-utility/source/data';
import classNames from 'classnames';

import { FieldProps } from './FormField';
import { ButtonProps } from './Button';

export interface ToggleFieldProps extends BaseFieldProps, WebCellProps {
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
        </div>
    );
}

export interface ToggleGroupProps extends FieldProps {
    type: ToggleFieldProps['type'];
    kind?: ButtonProps['kind'];
    list: (BaseFieldProps & { checked?: boolean })[];
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
    list,
    type,
    name,
    kind = 'primary'
}: ToggleGroupProps) {
    return (
        <div className={classNames('btn-group', 'btn-group-toggle', className)}>
            {list.map(({ checked, title, ...rest }) => (
                <label
                    className={classNames(
                        'btn',
                        `btn-${kind}`,
                        checked && 'active'
                    )}
                >
                    <input
                        {...rest}
                        type={type}
                        name={name}
                        checked={checked}
                        onClick={toggleActive}
                    />
                    {title}
                </label>
            ))}
        </div>
    );
}
