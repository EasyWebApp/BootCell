import { VNodeChildElement, createCell } from 'web-cell';
import classNames from 'classnames';
import { BaseFieldProps, uniqueID } from '../utility';

export interface ToggleFieldProps extends BaseFieldProps {
    type: 'radio' | 'checkbox';
    switch?: boolean;
    inline?: boolean;
    defaultSlot?: VNodeChildElement[];
}

export function ToggleField({
    type,
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
                inline && 'custom-control-inline'
            )}
        >
            <input
                {...rest}
                type={type}
                className="custom-control-input"
                id={id}
            />
            {defaultSlot[0] && (
                <label className="custom-control-label" htmlFor={id}>
                    {defaultSlot}
                </label>
            )}
        </div>
    );
}
