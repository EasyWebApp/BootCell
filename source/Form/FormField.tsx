import { createCell } from 'web-cell';
import type { InputEventHandlers } from 'web-utility';
import { uniqueID } from 'web-utility/source/data';
import classNames from 'classnames';

import { FieldProps, Field } from './Field';
import { ValidableFieldProps, ValidMessage } from './Form';
import './FormField.less';

export interface FormFieldProps extends FieldProps, ValidableFieldProps {
    label?: string;
    labelColumn?: number;
    labelFloat?: boolean;
    tips?: string;
}

function handleFile(more?: InputEventHandlers['onChange']) {
    return function (event: Event) {
        const {
            nextElementSibling: label,
            value
        } = event.target as HTMLInputElement;

        (label as HTMLLabelElement).dataset.file = value
            .split(/\\|\//)
            .slice(-1)[0];

        more?.call(this, event);
    };
}

export function FormField({
    className,
    id = uniqueID(),
    size,
    label,
    labelColumn,
    labelFloat,
    tips,
    validMode = 'feedback',
    validMessage,
    invalidMessage,
    onChange,
    defaultSlot,
    ...rest
}: FormFieldProps = {}) {
    if (labelFloat && !label) label = rest.placeholder;

    const describedBy = [];

    if ((tips = tips?.trim())) {
        const textID = id + '-tips';
        var text = (
            <small id={textID} className="form-text text-muted">
                {tips}
            </small>
        );
        describedBy.push(textID);
    }

    if (validMessage || invalidMessage) {
        const messageID = id + '-message';
        var message = (
            <ValidMessage
                id={messageID}
                {...{ validMode, validMessage, invalidMessage }}
            />
        );
        describedBy.push(messageID);
    }

    const labelClass =
        labelColumn &&
        classNames(
            'col-form-label',
            typeof size === 'string' && `col-form-label-${size}`,
            `col-sm-${labelColumn}`,
            'text-nowrap'
        );

    defaultSlot = [
        label && (
            <label htmlFor={id} className={labelClass || ''}>
                {label}
            </label>
        ),
        !rest.is && defaultSlot[0] ? (
            defaultSlot
        ) : (
            <Field
                {...rest}
                id={id}
                size={size}
                aria-describedby={describedBy.join(' ')}
                onChange={
                    rest.type === 'file' ? handleFile(onChange) : onChange
                }
            >
                {defaultSlot}
            </Field>
        )
    ];

    if (labelColumn)
        defaultSlot[1] = (
            <div className={`col-sm-${12 - labelColumn}`}>{defaultSlot[1]}</div>
        );
    else if (labelFloat) defaultSlot.reverse();

    return (
        <div
            className={classNames(
                labelFloat ? 'form-label-group' : 'form-group',
                labelColumn && 'row',
                className
            )}
        >
            {defaultSlot}
            {text}
            {message}
        </div>
    );
}
