import { VNode, VNodeChildElement, WebCellProps, createCell } from 'web-cell';
import { HTMLContainerProps, uniqueID } from 'web-utility';
import classNames from 'classnames';

import { isButton } from './Button';
import { DropMenu } from '../Navigator/DropMenu';
import { isToggleField } from './ToggleField';
import { ValidMessage, ValidableFieldProps } from './Form';

export interface InputGroupProps
    extends WebCellProps,
        HTMLContainerProps,
        ValidableFieldProps {
    size?: 'sm' | 'lg';
}

function toLabelNode(node: VNodeChildElement) {
    if (isToggleField(node))
        node.data.class = {
            ...node.data.class,
            'input-group-text': true
        };
    else if (
        typeof node === 'string' ||
        typeof node === 'number' ||
        !(
            /^(input|textarea|select|label)/.test((node as VNode).sel) ||
            isButton(node) ||
            DropMenu.is(node)
        )
    )
        node = <label className="input-group-text">{node}</label>;

    return node as VNode;
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
    var lastID = '',
        count = 0;

    const nodes = (defaultSlot as VNodeChildElement[])
        .flat(Infinity)
        .reverse()
        .map(node => {
            node = toLabelNode(node);

            const [tag] = node.sel.split(/[^\w-]/);

            switch (tag) {
                case 'input':
                case 'textarea':
                case 'select':
                    lastID = (node.data.props ||= {}).id =
                        node.data.props?.id || `${id}-${count++}`;
                    break;
                case 'label':
                    if (node.data.class?.['input-group-text'])
                        (node.data.props ||= {}).htmlFor = lastID;
            }
            return node;
        })
        .reverse();

    return (
        <div
            className={classNames(
                'input-group',
                size && `input-group-${size}`,
                className
            )}
            {...{ id, ...rest }}
        >
            {nodes}
            <ValidMessage {...{ validMode, validMessage, invalidMessage }} />
        </div>
    );
}
