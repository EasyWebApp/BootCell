import classNames from 'classnames';
import { JsxChildren } from 'dom-renderer';
import { action, observable } from 'mobx';
import {
    FC,
    WebCell,
    WebCellProps,
    attribute,
    component,
    observer
} from 'web-cell';
import { BootstrapStyles } from '../BootstrapStyles';
import { CloseButton } from '../Form/Button';
import { BackgroundColor } from '../type';
import { CallbackElement, validateDelay } from './OverlayModel';

export interface ToastHeaderProps extends WebCellProps<HTMLDivElement> {
    closeButton?: boolean;
    closeLabel?: string;
    closeVariant?: 'white';
    onClose?: (event?: Event) => void;
}

export const ToastHeader: FC<ToastHeaderProps> = ({
    className,
    children,
    closeButton = true,
    closeLabel = 'Close',
    closeVariant,
    onClose,
    ...props
}) => (
    <div {...props} className={classNames('toast-header', className)}>
        {children}
        {closeButton && (
            <CloseButton
                data-bs-theme={closeVariant === 'white' ? 'dark' : undefined}
                ariaLabel={closeLabel}
                data-toast-close=""
                onClick={onClose}
            />
        )}
    </div>
);

export const ToastBody: FC<WebCellProps<HTMLDivElement>> = ({
    className,
    children,
    ...props
}) => (
    <div {...props} className={classNames('toast-body', className)}>
        {children}
    </div>
);

export interface ToastProps extends WebCellProps {
    show?: boolean;
    defaultShow?: boolean;
    animation?: boolean;
    autohide?: boolean;
    delay?: number;
    bg?: BackgroundColor;
    icon?: JsxChildren;
    time?: string;
    onClose?: (event?: Event) => void;
}

class ToastElement extends CallbackElement {
    static callbacks = ['onClose'];
    declare mounted: boolean;
    declare update: () => Promise<void>;
    declare props: ToastProps;
    @attribute @observable accessor show: boolean;
    @attribute @observable accessor defaultShow = true;
    @attribute @observable accessor animation = true;
    @attribute @observable accessor autohide = false;
    @attribute @observable accessor delay = 5000;
    @attribute @observable accessor bg: BackgroundColor;
    @attribute @observable accessor time = '';
    @attribute @observable accessor title = '';
    @observable accessor icon: JsxChildren;
    @observable accessor dismissed = false;
    onClose?: ToastProps['onClose'];
    private timer?: ReturnType<typeof setTimeout>;
    private timing?: string;

    get visible() {
        return this.show ?? (!this.dismissed && this.defaultShow);
    }

    protected get shouldAutohide() {
        return this.autohide;
    }

    close = action((event?: Event) => {
        this.onClose?.(event);
        if (this.show === undefined) this.dismissed = true;
        this.dispatchEvent(new CustomEvent('close', { detail: event }));
    });

    private handleClose = (event: MouseEvent) => {
        if (
            event
                .composedPath()
                .some(
                    node =>
                        node instanceof Element &&
                        node.hasAttribute('data-toast-close')
                )
        )
            this.close(event);
    };

    connectedCallback() {
        this.addEventListener('click', this.handleClose);
        if (this.mounted) void this.update();
    }
    disconnectedCallback() {
        this.removeEventListener('click', this.handleClose);
        clearTimeout(this.timer);
        this.timing = undefined;
    }

    updatedCallback() {
        validateDelay(this.delay);
        const timing =
            this.visible && this.shouldAutohide && this.isConnected
                ? `${this.delay}`
                : undefined;
        if (timing === this.timing) return;
        clearTimeout(this.timer);
        this.timing = timing;
        if (timing !== undefined)
            this.timer = setTimeout(this.close, this.delay);
    }

    render() {
        const { icon, title, time, bg, visible, animation } = this;
        const legacy = icon != null || time || title;
        return (
            <>
                <BootstrapStyles />
                <div
                    className={classNames(
                        'toast',
                        !animation && 'toast-instant',
                        visible && 'show',
                        bg && `bg-${bg}`
                    )}
                    role="alert"
                    ariaLive="assertive"
                    ariaAtomic="true"
                    hidden={!visible}
                >
                    {legacy ? (
                        <>
                            <ToastHeader>
                                {typeof icon === 'string' ? (
                                    <img
                                        className="rounded me-2"
                                        alt="Icon"
                                        src={icon}
                                    />
                                ) : (
                                    icon
                                )}
                                <strong className="me-auto">{title}</strong>
                                <small className="fg-2 text-nowrap ms-2">
                                    {time}
                                </small>
                            </ToastHeader>
                            <ToastBody>
                                <slot />
                            </ToastBody>
                        </>
                    ) : (
                        <slot />
                    )}
                </div>
            </>
        );
    }
}

export interface Toast extends Omit<
    WebCell,
    'props' | 'connectedCallback' | 'disconnectedCallback' | 'updatedCallback'
> {}

@component({ tagName: 'bs-toast', mode: 'open' })
@observer
export class Toast extends ToastElement {}

/** Legacy delay-only autohide, without changing Toast's opt-in autohide API. */
@component({ tagName: 'toast-box', mode: 'open' })
@observer
export class ToastBox extends ToastElement {
    @attribute @observable accessor delay = 0;
    @attribute @observable accessor autohide = true;

    protected get shouldAutohide() {
        return this.autohide && this.delay > 0;
    }
}
