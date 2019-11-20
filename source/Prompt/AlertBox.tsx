import { component, mixin, attribute, watch, createCell } from 'web-cell';
import classNames from 'classnames';

import { Status, Theme } from '../utility';

type AlertType = keyof typeof Status | keyof typeof Theme;

@component({
    tagName: 'alert-box',
    renderTarget: 'children'
})
export class AlertBox extends mixin() {
    @attribute
    @watch
    type: AlertType = 'primary';

    @attribute
    @watch
    title = '';

    @attribute
    @watch
    closable = false;

    @attribute
    @watch
    hidden = false;

    handleHidden = (event: MouseEvent) => {
        event.preventDefault();

        this.hidden = true;
    };

    render() {
        const {
            title,
            type,
            defaultSlot,
            closable,
            hidden,
            handleHidden
        } = this;

        return (
            <aside
                className={classNames(
                    'alert',
                    `alert-${type}`,
                    closable && 'alert-dismissible fade',
                    hidden ? '' : 'show'
                )}
                role="alert"
            >
                {title && <h4 className="alert-heading">{title}</h4>}
                {defaultSlot}
                {closable && (
                    <button
                        type="button"
                        className="close"
                        aria-label="Close"
                        onClick={handleHidden}
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                )}
            </aside>
        );
    }
}
