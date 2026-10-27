import { WebCell, WebCellProps, component } from 'web-cell';

import { BootstrapStyles } from '../BootstrapStyles';

export interface SplitView extends WebCell<WebCellProps> {}

@component({
    tagName: 'split-view',
    mode: 'open'
})
export class SplitView extends HTMLElement {
    connectedCallback() {
        this.classList.add('d-flex', 'w-100');
    }

    toggleDrag = ({ type, currentTarget, pointerId }: PointerEvent) => {
        const divider = currentTarget as HTMLElement;

        if (type === 'pointerdown') divider.setPointerCapture(pointerId);
        else if (divider.hasPointerCapture(pointerId))
            divider.releasePointerCapture(pointerId);
    };

    handleDrag = ({ currentTarget, pointerId, clientX }: PointerEvent) => {
        const divider = currentTarget as HTMLElement;
        if (!divider.hasPointerCapture(pointerId)) return;

        const left = divider.previousElementSibling as HTMLElement;
        const { x } = left.getBoundingClientRect();
        const available = Math.max(0, this.clientWidth - divider.offsetWidth);

        left.style.width = Math.max(0, Math.min(clientX - x, available)) + 'px';
    };

    render() {
        return (
            <>
                <BootstrapStyles />
                <style>{`:host { display: flex; width: 100%; min-width: 0; }`}</style>
                <div style={{ width: '25%', flexShrink: '0', minWidth: '0' }}>
                    <slot name="left" />
                </div>
                <div
                    role="separator"
                    ariaOrientation="vertical"
                    style={{
                        cursor: 'col-resize',
                        width: '.5rem',
                        flexShrink: '0',
                        touchAction: 'none',
                        borderInlineStart: '1px solid var(--bs-border-color)',
                        boxSizing: 'border-box'
                    }}
                    onPointerDown={this.toggleDrag}
                    onPointerUp={this.toggleDrag}
                    onPointerCancel={this.toggleDrag}
                    onPointerMove={this.handleDrag}
                />
                <div className="flex-fill" style={{ minWidth: '0' }}>
                    <slot name="right" />
                </div>
            </>
        );
    }
}
