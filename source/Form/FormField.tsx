import { createCell } from 'web-cell';
import { BaseFieldProps } from 'web-utility/source/DOM-type';
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
    fileButton?: string;
}

function handleFile(more?: BaseFieldProps['onChange']) {
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
    validMode,
    validMessage,
    invalidMessage,
    fileButton = 'Browse',
    defaultSlot,
    ...rest
}: FormFieldProps = {}) {
    if (labelFloat && !label) label = rest.placeholder;

    if ((tips = tips?.trim())) rest['aria-describedby'] = id + '-tips';

    const message = (
        <ValidMessage {...{ validMode, validMessage, invalidMessage }} />
    );

    if (rest.type === 'file')
        return (
            <div className={classNames('custom-file', className)}>
                <Field
                    id={id}
                    size={size}
                    {...rest}
                    onChange={handleFile(rest.onChange)}
                >
                    {defaultSlot}
                </Field>
                <label
                    className="custom-file-label"
                    for={id}
                    data-file={label || 'Choose file'}
                    data-browse={fileButton}
                />
                {message}
            </div>
        );

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
            <Field id={id} size={size} {...rest}>
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

            {tips && (
                <small id={id + '-tips'} className="form-text text-muted">
                    {tips}
                </small>
            )}
            {message}
        </div>
    );
}
