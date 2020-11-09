import { WebCellProps, VNodeChildElement, VNode, createCell } from 'web-cell';
import { uniqueID } from 'web-utility/source/data';
import classNames from 'classnames';

import { isButton } from './Button';
import { DropMenu } from '../Navigator/DropMenu';
import { isField } from './Field';
import { ValidMessage, ValidableFieldProps } from './Form';

export interface GroupLabelProps extends WebCellProps {
    htmlFor?: string;
    type: 'prepend' | 'append';
    list: VNodeChildElement[];
}

export function GroupLabel({
    className,
    type,
    list,
    id = uniqueID(),
    htmlFor
}: GroupLabelProps) {
    return (
        <div className={classNames(`input-group-${type}`, className)}>
            {list.map((item, index) => {
                const ID = `${id}-${type}-${index}`;

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

export interface InputGroupProps extends WebCellProps, ValidableFieldProps {
    size?: 'sm' | 'lg';
}

export function InputGroup({
    className,
    id = uniqueID(),
    size,
    defaultSlot,
    validMode,
    validMessage,
    invalidMessage,
    ...rest
}: InputGroupProps) {
    var field_id = `${id}-field-0`;

    const [
        fields,
        prepends,
        appends
    ] = (defaultSlot as VNodeChildElement[]).reduce(
        ([fields, prepends, appends], node) => {
            if (isField(node)) {
                fields.push(node);

                if (fields.length === 1) {
                    if (node.data.props?.id) field_id = node.data.props.id;
                    else
                        (node.data.props = node.data.props || {}).id = field_id;
                }
                (node.data.attrs = node.data.attrs || {})[
                    'aria-describedby'
                ] = `${id}-label-${prepends[0] ? 'prepend' : 'append'}-0`;
            } else if (fields[0]) appends.push(node);
            else prepends.push(node);

            return [fields, prepends, appends];
        },
        [[], [], []] as [VNode[], VNodeChildElement[], VNodeChildElement[]]
    );

    if (!appends[0]) {
        const [last_field] = fields.slice(-1);

        (last_field.data.class = last_field.data.class || {})[
            'rounded-right'
        ] = true;
    }

    return (
        <div
            className={classNames(
                'input-group',
                size && `input-group-${size}`,
                className
            )}
            {...{ id, ...rest }}
        >
            {prepends[0] && (
                <GroupLabel
                    type="prepend"
                    id={`${id}-label`}
                    htmlFor={field_id}
                    list={prepends}
                />
            )}
            {fields}

            {appends[0] && (
                <GroupLabel
                    className="rounded-right"
                    type="append"
                    id={`${id}-label`}
                    htmlFor={field_id}
                    list={appends}
                />
            )}
            <ValidMessage {...{ validMode, validMessage, invalidMessage }} />
        </div>
    );
}
