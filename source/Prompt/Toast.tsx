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
import { transitOut } from 'web-utility/source/animation';

import { CloseButton } from '../Form/Button';

export interface ToastProps extends WebCellProps {
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

    close = () => transitOut(this, 'show');

    render({ icon, title, time, defaultSlot }: ToastProps) {
        return (
            <Fragment>
                <div className="toast-header">
                    {typeof icon === 'string' ? (
                        <img className="rounded me-2" alt="Icon" src={icon} />
                    ) : (
                        icon
                    )}
                    <strong className="me-auto">{title}</strong>
                    <small className="text-muted text-nowrap ms-2">
                        {time}
                    </small>
                    <CloseButton className="ms-2 mb-1" onClick={this.close} />
                </div>
                <div className="toast-body">{defaultSlot}</div>
            </Fragment>
        );
    }
}
