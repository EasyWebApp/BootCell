import classNames from 'classnames';
import { JsxChildren, VNode } from 'dom-renderer';
import { FC, WebCellProps } from 'web-cell';
import { uniqueID } from 'web-utility';

import { ToggleButton, ToggleButtonProps } from './Button';

export type FormTag =
    'div' | 'fieldset' | 'section' | 'label' | 'small' | 'span' | 'p';

function renderTag<P extends WebCellProps>(
    tag: FormTag | FC<P>,
    props: P
): VNode {
    if (typeof tag === 'function') return tag(props);

    const { children, style, ref, key, is, ...attributes } = props;

    return new VNode({
        tagName: tag,
        props: attributes,
        children,
        style,
        ref,
        key,
        is
    });
}

function hasChildren(children: JsxChildren): boolean {
    return Array.isArray(children)
        ? children.length > 0
        : children !== undefined &&
              children !== null &&
              children !== false &&
              children !== '';
}

function updateChildNodes(
    nodes: JsxChildren,
    update: (node: VNode) => VNode
): JsxChildren {
    if (Array.isArray(nodes))
        return nodes.map(node => updateChildNodes(node, update));
    return nodes instanceof VNode ? update(nodes) : nodes;
}

function setControlId(node: VNode, controlId: string): VNode {
    const props = { ...node.props };

    if (node.tagName === 'label') props.htmlFor ||= controlId;
    else if (
        node.tagName &&
        ['input', 'select', 'textarea', 'output'].includes(node.tagName)
    )
        props.id ||= controlId;

    return new VNode({
        ...node,
        props,
        children: node.children?.map(child =>
            updateChildNodes(child, node => setControlId(node, controlId))
        ) as VNode[]
    });
}

function describeCustomControl(
    node: VNode,
    id: string,
    describedBy: string,
    isValid: boolean,
    isInvalid: boolean
): VNode {
    const props = { ...node.props };
    const isNativeControl =
        node.tagName &&
        ['input', 'select', 'textarea', 'output'].includes(node.tagName);

    if (isNativeControl) {
        props.id ||= id;
        props['aria-describedby'] =
            [props['aria-describedby'], describedBy]
                .filter(Boolean)
                .join(' ') || undefined;
        if (isValid) props.className = classNames(props.className, 'is-valid');
        if (isInvalid) {
            props.className = classNames(props.className, 'is-invalid');
            props['aria-invalid'] = true;
        }
    }

    return new VNode({
        ...node,
        props,
        children: node.children?.map(child =>
            updateChildNodes(child, node =>
                describeCustomControl(node, id, describedBy, isValid, isInvalid)
            )
        ) as VNode[]
    });
}

export type FormProps = JSX.IntrinsicElements['form'] & {
    inline?: boolean;
    validate?: boolean;
    validated?: boolean;
    defaultSlot?: JsxChildren;
};

export const Form: FC<FormProps> = ({
    inline,
    validate,
    validated,
    className,
    onSubmit,
    children,
    defaultSlot,
    ...props
}) => (
    <form
        {...props}
        className={classNames(
            inline && 'd-flex flex-wrap align-items-center gap-2',
            className
        )}
        data-bs-validate={validate || validated || undefined}
        noValidate={validate || props.noValidate}
        onSubmit={
            validate
                ? event => {
                      const form = event.currentTarget as HTMLFormElement;

                      if (!form.checkValidity()) {
                          event.preventDefault();
                          event.stopPropagation();
                      }
                      onSubmit?.(event);
                  }
                : onSubmit
        }
    >
        {hasChildren(children) ? children : defaultSlot}
    </form>
);

export interface FormGroupProps extends WebCellProps<HTMLDivElement> {
    as?: FormTag | FC<WebCellProps<HTMLDivElement>>;
    controlId?: string;
    defaultSlot?: JsxChildren;
}

export const FormGroup: FC<FormGroupProps> = ({
    as: Tag = 'div',
    className,
    controlId,
    children,
    defaultSlot,
    ...props
}) => {
    const content = hasChildren(children) ? children : defaultSlot;

    return renderTag(Tag, {
        ...props,
        className: classNames('form-field', className),
        children: controlId
            ? updateChildNodes(content, node => setControlId(node, controlId))
            : content
    });
};

export interface FormLabelProps extends WebCellProps<HTMLLabelElement> {
    as?: FormTag | FC<WebCellProps<HTMLLabelElement>>;
    column?: boolean | 'sm' | 'lg';
    visuallyHidden?: boolean;
}

export const FormLabel: FC<FormLabelProps> = ({
    as: Tag = 'label',
    className,
    column,
    visuallyHidden,
    children,
    ...props
}) =>
    renderTag(Tag, {
        ...props,
        className: classNames(
            className,
            visuallyHidden && 'visually-hidden',
            column && 'col-form-label',
            typeof column === 'string' && `col-form-label-${column}`
        ),
        children
    });

export interface FormFloatingProps extends WebCellProps<HTMLDivElement> {
    as?: FormTag | FC<WebCellProps<HTMLDivElement>>;
}

export const FormFloating: FC<FormFloatingProps> = ({
    as: Tag = 'div',
    className,
    children,
    ...props
}) =>
    renderTag(Tag, {
        ...props,
        className: classNames('form-floating', className),
        children
    });

export interface FloatingLabelProps extends FormLabelProps {
    label: JsxChildren;
}

export const FloatingLabel: FC<FloatingLabelProps> = ({
    className,
    style,
    label,
    children,
    ...props
}) => (
    <FormFloating className={className} style={style}>
        {children}
        <label {...props}>{label}</label>
    </FormFloating>
);

export interface InputGroupProps extends WebCellProps<HTMLDivElement> {
    size?: 'sm' | 'lg';
}

export const InputGroup: FC<InputGroupProps> = ({
    className = '',
    size,
    children,
    ...props
}) => (
    <div
        className={classNames(
            'input-group',
            size && `input-group-${size}`,
            className
        )}
        {...props}
    >
        {children}
    </div>
);

export const InputGroupText: FC<WebCellProps<HTMLSpanElement>> = ({
    className = '',
    children,
    ...props
}) => (
    <span className={`input-group-text ${className}`} {...props}>
        {children}
    </span>
);

export type FormControlTag = 'input' | 'textarea' | 'select' | 'output';

export type FormControlProps<T extends FormControlTag = 'input'> = Omit<
    JSX.IntrinsicElements[T],
    'size'
> & {
    as?: T | FC<JSX.IntrinsicElements[T]>;
    htmlSize?: number;
    size?: 'sm' | 'lg';
    plaintext?: boolean;
    isValid?: boolean;
    isInvalid?: boolean;
    valid?: boolean;
};

export const FormControl = <T extends FormControlTag = 'input'>({
    as = 'input' as T,
    className,
    htmlSize,
    size,
    plaintext,
    isValid,
    isInvalid,
    valid,
    children,
    ...props
}: FormControlProps<T>) => {
    const validState = isValid ?? valid === true;
    const invalidState = isInvalid ?? valid === false;

    if (typeof as === 'function') {
        const CustomControl = as;

        return CustomControl({
            ...props,
            children,
            size: htmlSize,
            className: classNames(
                className,
                'form-control',
                validState && 'is-valid',
                invalidState && 'is-invalid'
            )
        } as JSX.IntrinsicElements[T]);
    }

    if (as === 'output')
        return (
            <output
                {...(props as JSX.IntrinsicElements['output'])}
                className={classNames(
                    'form-control',
                    'form-control-plaintext',
                    validState && 'is-valid',
                    invalidState && 'is-invalid',
                    className
                )}
            >
                {children ?? props.defaultValue}
            </output>
        );

    const controlClass = classNames(
        as === 'input' && props.type === 'range'
            ? 'form-range'
            : 'form-control',
        size && `form-control-${size}`,
        plaintext && props.readOnly && 'form-control-plaintext',
        as === 'input' && props.type === 'color' && 'form-control-color',
        validState && 'is-valid',
        invalidState && 'is-invalid',
        className
    );

    if (as === 'select')
        return (
            <select
                {...(props as JSX.IntrinsicElements['select'])}
                size={htmlSize}
                className={controlClass}
            >
                {children}
            </select>
        );

    if (as === 'textarea')
        return (
            <textarea
                {...(props as JSX.IntrinsicElements['textarea'])}
                size={htmlSize}
                className={controlClass}
            >
                {children}
            </textarea>
        );

    return (
        <input
            {...(props as JSX.IntrinsicElements['input'])}
            size={htmlSize}
            className={controlClass}
        />
    );
};

export interface FormSelectProps extends Omit<
    JSX.IntrinsicElements['select'],
    'size'
> {
    as?: 'select' | FC<JSX.IntrinsicElements['select']>;
    htmlSize?: number;
    size?: 'sm' | 'lg';
    isValid?: boolean;
    isInvalid?: boolean;
}

export const FormSelect: FC<FormSelectProps> = ({
    as: Select = 'select',
    className,
    htmlSize,
    size,
    isValid,
    isInvalid,
    children,
    ...props
}) => {
    const controlProps = {
        ...props,
        size: htmlSize,
        className: classNames(
            className,
            'form-control',
            size && `form-control-${size}`,
            isValid && 'is-valid',
            isInvalid && 'is-invalid'
        ),
        children
    };

    return typeof Select === 'function' ? (
        Select(controlProps)
    ) : (
        <select {...controlProps}>{children}</select>
    );
};

export type FormRangeProps = Omit<JSX.IntrinsicElements['input'], 'type'>;

export const FormRange: FC<FormRangeProps> = ({ className, ...props }) => (
    <input
        {...props}
        type="range"
        className={classNames(className, 'form-range')}
    />
);

export interface FeedbackProps extends WebCellProps<HTMLDivElement> {
    as?: FormTag | FC<WebCellProps<HTMLDivElement>>;
    type?: 'valid' | 'invalid';
    tooltip?: boolean;
}

export const Feedback: FC<FeedbackProps> = ({
    as: Tag = 'div',
    className,
    type = 'valid',
    tooltip,
    children,
    ...props
}) =>
    renderTag(Tag, {
        ...props,
        className: classNames(
            className,
            `${type}-${tooltip ? 'tooltip' : 'feedback'}`
        ),
        children
    });

export interface FormTextProps extends WebCellProps<HTMLElement> {
    as?: FormTag | FC<WebCellProps<HTMLElement>>;
    muted?: boolean;
}

export const FormText: FC<FormTextProps> = ({
    as: Tag = 'small',
    className,
    muted: _muted,
    children,
    ...props
}) =>
    renderTag(Tag, {
        ...props,
        className: classNames(className, 'fg-2'),
        children
    });

export interface ValidableFieldProps {
    validMode?: 'feedback' | 'tooltip';
    validMessage?: JsxChildren;
    invalidMessage?: JsxChildren;
}

export const ValidMessage: FC<
    ValidableFieldProps & WebCellProps<HTMLDivElement>
> = ({
    validMode = 'feedback',
    validMessage,
    invalidMessage,
    id = uniqueID(),
    ...props
}) => {
    const both = !!(validMessage && invalidMessage);

    return (
        <>
            {validMessage && (
                <Feedback
                    {...props}
                    id={both ? `${id}-valid-message` : `${id}-message`}
                    type="valid"
                    tooltip={validMode === 'tooltip'}
                >
                    {validMessage}
                </Feedback>
            )}
            {invalidMessage && (
                <Feedback
                    {...props}
                    id={both ? `${id}-invalid-message` : `${id}-message`}
                    type="invalid"
                    tooltip={validMode === 'tooltip'}
                >
                    {invalidMessage}
                </Feedback>
            )}
        </>
    );
};

export type FormCheckInputProps = JSX.IntrinsicElements['input'] & {
    indeterminate?: boolean;
};

export interface FormCheckProps
    extends
        Omit<WebCellProps<HTMLInputElement>, 'type'>,
        Pick<ToggleButtonProps, 'variant' | 'theme'> {
    as?: 'input' | FC<FormCheckInputProps>;
    type?: 'radio' | 'checkbox' | 'switch';
    inline?: boolean;
    reverse?: boolean;
    label?: JsxChildren;
    mode?: 'normal' | 'button' | 'switch';
    labelHidden?: boolean;
    indeterminate?: boolean;
    color?: ToggleButtonProps['theme'];
    outline?: boolean;
    isValid?: boolean;
    isInvalid?: boolean;
    feedback?: JsxChildren;
    feedbackType?: 'valid' | 'invalid';
    feedbackTooltip?: boolean;
    validMode?: 'feedback' | 'tooltip';
    validMessage?: JsxChildren;
    invalidMessage?: JsxChildren;
    defaultSlot?: JsxChildren;
}

export const FormCheck: FC<FormCheckProps> = ({
    as: Input = 'input',
    id = uniqueID(),
    className,
    style,
    title,
    type = 'checkbox',
    inline,
    reverse,
    label,
    mode,
    labelHidden,
    indeterminate,
    variant,
    theme,
    color,
    outline,
    isValid,
    isInvalid,
    feedback,
    feedbackType,
    feedbackTooltip,
    validMode = 'feedback',
    validMessage,
    invalidMessage,
    defaultSlot,
    ref,
    onChange,
    children,
    ...props
}) => {
    const content = label ?? (hasChildren(children) ? children : defaultSlot);
    const switchMode = type === 'switch' || mode === 'switch';
    const inputType = switchMode ? 'checkbox' : type;
    const describedBy = [
        (props as WebCellProps<HTMLInputElement>)['aria-describedby'],
        feedback ? `${id}-feedback` : undefined,
        validMessage || invalidMessage
            ? validMessage && invalidMessage
                ? `${id}-valid-message ${id}-invalid-message`
                : `${id}-message`
            : undefined
    ]
        .filter(Boolean)
        .join(' ');
    const inputProps: FormCheckInputProps = {
        ...props,
        id,
        style: reverse ? { gridColumn: '2' } : undefined,
        type: inputType,
        className: classNames(
            switchMode ? 'switch' : type === 'radio' ? 'radio' : 'check',
            isValid && 'is-valid',
            isInvalid && 'is-invalid'
        ),
        role: switchMode ? 'switch' : props.role,
        'aria-describedby': describedBy || undefined,
        'aria-invalid':
            isInvalid ||
            (props as WebCellProps<HTMLInputElement>)['aria-invalid'],
        'aria-label':
            labelHidden && typeof content === 'string'
                ? content
                : (props as WebCellProps<HTMLInputElement>)['aria-label'],
        indeterminate,
        ref: node => {
            if (node instanceof HTMLInputElement)
                node.indeterminate = !!indeterminate;
            ref?.(node);
        },
        onChange
    };
    const help = (
        <>
            {feedback && (
                <Feedback
                    id={`${id}-feedback`}
                    type={feedbackType}
                    tooltip={feedbackTooltip}
                >
                    {feedback}
                </Feedback>
            )}
            {(validMessage || invalidMessage) && (
                <ValidMessage
                    id={id}
                    validMode={validMode}
                    validMessage={validMessage}
                    invalidMessage={invalidMessage}
                />
            )}
        </>
    );

    if (mode === 'button')
        return (
            <>
                <ToggleButton
                    {...props}
                    id={id}
                    type={inputType}
                    variant={variant ?? (outline ? 'outline' : 'solid')}
                    theme={theme ?? color}
                    className={className}
                    style={style}
                    title={title}
                    inputRef={inputProps.ref}
                    indeterminate={indeterminate}
                    onChange={onChange}
                    aria-describedby={describedBy || undefined}
                    aria-invalid={inputProps['aria-invalid']}
                >
                    {content}
                </ToggleButton>
                {help}
            </>
        );

    const input =
        Input === 'input' ? <input {...inputProps} /> : Input(inputProps);
    const labelNode = !labelHidden && content && (
        <label
            htmlFor={id}
            title={title}
            style={reverse ? { gridColumn: '1', gridRow: '1' } : undefined}
        >
            {content}
        </label>
    );

    return (
        <div
            className={classNames(
                'form-field',
                inline && 'd-inline-grid',
                className
            )}
            style={{
                ...style,
                ...(reverse ? { gridTemplateColumns: '1fr auto' } : {})
            }}
        >
            {reverse ? (
                <>
                    {labelNode}
                    {input}
                </>
            ) : (
                <>
                    {input}
                    {labelNode}
                </>
            )}
            {help}
        </div>
    );
};

export type FormFieldProps<T extends FormControlTag = 'input'> = Omit<
    FormControlProps<T>,
    'className' | 'size' | 'as'
> & {
    as?: T;
    is?: T;
    className?: string;
    controlClassName?: string;
    controlId?: string;
    label?: JsxChildren;
    labelFloat?: boolean;
    labelColumn?: number;
    tips?: string;
    validMode?: 'feedback' | 'tooltip';
    validMessage?: JsxChildren;
    invalidMessage?: JsxChildren;
    fileButton?: string;
    size?: 'sm' | 'lg' | number;
    defaultSlot?: JsxChildren;
};

export const FormField = <T extends FormControlTag = 'input'>({
    as,
    is,
    id,
    controlId,
    className,
    controlClassName,
    label,
    labelFloat,
    labelColumn,
    tips,
    validMode = 'feedback',
    validMessage,
    invalidMessage,
    isValid,
    isInvalid,
    valid,
    fileButton: _fileButton,
    type,
    size,
    htmlSize,
    placeholder,
    title,
    children,
    defaultSlot,
    onChange,
    defaultValue,
    ...props
}: FormFieldProps<T>) => {
    const Tag = as ?? is ?? 'input';
    const fieldID = id ?? controlId ?? uniqueID();
    const fieldChildren = hasChildren(children) ? children : defaultSlot;
    const fieldLabel =
        label ??
        (labelFloat ? (placeholder as JsxChildren) : undefined) ??
        title;
    const validState = isValid ?? valid === true;
    const invalidState = isInvalid ?? valid === false;
    const tipsText = tips?.trim();
    const feedbackIDs =
        validMessage && invalidMessage
            ? `${fieldID}-valid-message ${fieldID}-invalid-message`
            : validMessage || invalidMessage
              ? `${fieldID}-message`
              : '';
    const describedBy = [
        (props as WebCellProps<HTMLInputElement>)['aria-describedby'] ?? '',
        tipsText ? `${fieldID}-tips` : '',
        feedbackIDs
    ]
        .filter(Boolean)
        .join(' ');
    const customControl =
        Tag === 'input' &&
        (fieldChildren instanceof VNode ||
            (Array.isArray(fieldChildren) &&
                fieldChildren.some(
                    child =>
                        child instanceof VNode &&
                        ['input', 'select', 'textarea', 'output'].includes(
                            child.tagName ?? ''
                        )
                )));
    const control = customControl ? (
        updateChildNodes(fieldChildren, node =>
            describeCustomControl(
                node,
                fieldID,
                describedBy,
                validState,
                invalidState
            )
        )
    ) : Tag === 'output' ? (
        <FormControl
            {...(props as FormControlProps<'output'>)}
            as="output"
            id={fieldID}
            className={controlClassName}
            isValid={validState}
            isInvalid={invalidState}
            aria-describedby={describedBy || undefined}
            aria-invalid={
                invalidState ||
                (props as WebCellProps<HTMLInputElement>)['aria-invalid']
            }
        >
            {hasChildren(fieldChildren) ? fieldChildren : defaultValue}
        </FormControl>
    ) : (
        <FormControl
            {...(props as FormControlProps<T>)}
            as={Tag}
            id={fieldID}
            type={type}
            htmlSize={htmlSize ?? (typeof size === 'number' ? size : undefined)}
            size={typeof size === 'number' ? undefined : size}
            className={controlClassName}
            isValid={validState}
            isInvalid={invalidState}
            aria-describedby={describedBy || undefined}
            aria-invalid={
                invalidState ||
                (props as WebCellProps<HTMLInputElement>)['aria-invalid']
            }
            placeholder={placeholder as string}
            defaultValue={defaultValue}
            onChange={onChange}
        >
            {fieldChildren}
        </FormControl>
    );
    const labelNode = fieldLabel && (
        <FormLabel
            htmlFor={fieldID}
            column={labelColumn ? 'sm' : undefined}
            className={labelColumn ? `col-sm-${labelColumn} text-nowrap` : ''}
        >
            {fieldLabel}
        </FormLabel>
    );
    const help = (
        <>
            {tipsText && <FormText id={`${fieldID}-tips`}>{tipsText}</FormText>}
            {(validMessage || invalidMessage) && (
                <ValidMessage
                    id={fieldID}
                    validMode={validMode}
                    validMessage={validMessage}
                    invalidMessage={invalidMessage}
                />
            )}
        </>
    );
    const content = labelFloat ? (
        <>
            <FloatingLabel label={fieldLabel ?? ''} htmlFor={fieldID}>
                {control}
            </FloatingLabel>
            {help}
        </>
    ) : labelColumn ? (
        <div className="row">
            {labelNode}
            <div className={`col-sm-${12 - labelColumn}`}>
                {control}
                {help}
            </div>
        </div>
    ) : (
        <>
            {labelNode}
            {control}
            {help}
        </>
    );

    return <FormGroup className={className}>{content}</FormGroup>;
};
