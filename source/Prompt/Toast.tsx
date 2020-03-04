import {
    WebCellProps,
    VNodeChildElement,
    component,
    mixin,
    watch,
    attribute,
    createCell,
    Fragment
} from 'web-cell';
import { HTMLProps } from 'web-utility/source/DOM-type';
import { transitOut } from 'web-utility/source/animation';

export interface ToastProps extends HTMLProps, WebCellProps {
    icon: VNodeChildElement;
    time: string;
    delay?: number;
}

@component({
    tagName: 'toast-box',
    renderTarget: 'children'
})
export class ToastBox extends mixin<ToastProps>() {
    @attribute
    @watch
    title = '';

    @watch
    icon = '';

    @attribute
    @watch
    time = '';

    @attribute
    @watch
    delay = 0;

    private timer: number;

    connectedCallback() {
        this.style.display = 'block';
        this.classList.add('toast', 'fade', 'show');

        this.setAttribute('role', 'alert');
        this.setAttribute('aria-live', 'assertive');
        this.setAttribute('aria-atomic', 'true');

        if (this.delay) this.timer = self.setTimeout(this.close, this.delay);

        super.connectedCallback();
    }

    disconnectedCallback() {
        if (this.timer) self.clearTimeout(this.timer);
    }

    close = () => transitOut(this, 'show', true);

    render({ icon, title, time, defaultSlot }: ToastProps) {
        return (
            <Fragment>
                <div className="toast-header">
                    {typeof icon === 'string' ? (
                        <img className="rounded mr-2" alt="Icon" src={icon} />
                    ) : (
                        icon
                    )}
                    <strong className="mr-auto">{title}</strong>
                    <small className="text-muted text-nowrap ml-2">
                        {time}
                    </small>
                    <button
                        type="button"
                        className="ml-2 mb-1 close"
                        aria-label="Close"
                        onClick={this.close}
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="toast-body">{defaultSlot}</div>
            </Fragment>
        );
    }
}
