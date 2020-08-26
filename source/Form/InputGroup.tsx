import {
    WebCellProps,
    VNodeChildElement,
    VNode,
    WebCellElement,
    createCell
} from 'web-cell';
import { uniqueID } from 'web-utility/source/data';
import classNames from 'classnames';

import { isButton } from './Button';
import { DropMenu } from '../Navigator';
import { FieldProps, Field } from './Field';
import { ValidMessage, ValidableFieldProps } from './Form';

export interface GroupLabelProps extends WebCellProps {
    htmlFor?: string;
    type: 'prepend' | 'append';
    list: VNodeChildElement[];
}

export function GroupLabel({
    type,
    list,
    id = uniqueID(),
    htmlFor
}: GroupLabelProps) {
    return (
        <div className={`input-group-${type}`}>
            {list.map((item, index) => {
                const ID = `${id}-${index}`;

                if (isButton(item as VNode) || DropMenu.is(item as VNode)) {
                    (item as VNode).data.props.id = ID;

                    return item;
                }

                return typeof item !== 'object' ? (
                    <label
                        className="input-group-text"
                        id={ID}
                        htmlFor={htmlFor}
                    >
                        {item}
                    </label>
                ) : (
                    <div className="input-group-text" id={ID}>
                        {item}
                    </div>
                );
            })}
        </div>
    );
}

export interface InputGroupProps
    extends WebCellProps,
        FieldProps,
        ValidableFieldProps {
    size?: 'sm' | 'lg';
    prepend?: WebCellElement;
    append?: WebCellElement;
}

export function InputGroup({
    className,
    id = uniqueID(),
    size,
    prepend,
    append,
    defaultSlot,
    validMode,
    validMessage,
    invalidMessage,
    ...rest
}: InputGroupProps) {
    prepend = !prepend || prepend instanceof Array ? prepend : [prepend];
    append = !append || append instanceof Array ? append : [append];

    return (
        <div
            className={classNames(
                'input-group',
                size && `input-group-${size}`,
                className
            )}
        >
            {prepend && (
                <GroupLabel
                    type="prepend"
                    id={`${id}-label`}
                    htmlFor={id}
                    list={prepend as VNodeChildElement[]}
                />
            )}
            {defaultSlot[0] && rest.is !== 'select' ? (
                defaultSlot
            ) : (
                <Field
                    {...rest}
                    className={classNames(!append && 'rounded-right')}
                    id={id}
                    aria-describedby={`${id}-label-0`}
                >
                    {defaultSlot}
                </Field>
            )}
            {append && (
                <GroupLabel
                    className="rounded-right"
                    type="append"
                    id={`${id}-label`}
                    htmlFor={id}
                    list={append as VNodeChildElement[]}
                />
            )}
            <ValidMessage {...{ validMode, validMessage, invalidMessage }} />
        </div>
    );
}
