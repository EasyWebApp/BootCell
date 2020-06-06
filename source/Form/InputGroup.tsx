import { WebCellProps, VNode, createCell } from 'web-cell';
import { looksLike } from 'snabbdom-looks-like';
import { uniqueID } from 'web-utility/source/data';
import classNames from 'classnames';

import { FieldProps, Field } from './Field';

type Label = string | VNode;

function isButton(node: VNode) {
    return (
        looksLike(node, <button className="btn" />) ||
        looksLike(node, <input className="btn" />) ||
        looksLike(node, <a className="btn" />)
    );
}

export interface GroupLabelProps extends WebCellProps {
    htmlFor?: string;
    type: 'prepend' | 'append';
    list: Label[];
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

                if (isButton(item as VNode)) {
                    (item as VNode).data.props.id = ID;

                    return item;
                }

                return typeof item === 'string' ? (
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

export interface InputGroupProps extends WebCellProps, FieldProps {
    size?: 'sm' | 'lg';
    prepend?: Label | Label[];
    append?: Label | Label[];
}

export function InputGroup({
    className,
    id = uniqueID(),
    size,
    prepend,
    append,
    defaultSlot,
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
                    list={prepend as Label[]}
                />
            )}
            {defaultSlot[0] ? (
                defaultSlot
            ) : (
                <Field {...rest} id={id} aria-describedby={`${id}-label-0`} />
            )}
            {append && (
                <GroupLabel
                    type="append"
                    id={`${id}-label`}
                    htmlFor={id}
                    list={append as Label[]}
                />
            )}
        </div>
    );
}
