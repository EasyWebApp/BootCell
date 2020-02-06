import { component, mixin, attribute, watch, createCell } from 'web-cell';
import classNames from 'classnames';

import { Status, Theme } from '../utility';

export interface AlertProps {
    type?: keyof typeof Status | keyof typeof Theme;
    title?: string;
    closable?: boolean;
    open?: boolean;
}

@component({
    tagName: 'alert-box',
    renderTarget: 'children'
})
export class AlertBox extends mixin<AlertProps>() {
    @attribute
    @watch
    type: AlertProps['type'] = 'primary';

    @attribute
    @watch
    title = '';

    @attribute
    @watch
    closable = false;

    @attribute
    @watch
    open = false;

    render() {
        const { title, type, defaultSlot, closable, open } = this;

        return (
            <aside
                className={classNames(
                    'alert',
                    `alert-${type}`,
                    closable && 'alert-dismissible fade',
                    open ? 'show' : ''
                )}
                role="alert"
            >
                {title && <h4 className="alert-heading">{title}</h4>}
                {defaultSlot}
                {!closable ? null : (
                    <button
                        type="button"
                        className="close"
                        aria-label="Close"
                        onClick={() => (this.open = false)}
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                )}
            </aside>
        );
    }
}
