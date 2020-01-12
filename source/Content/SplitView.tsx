import { component, mixin, createCell, Fragment } from 'web-cell';
import { Observable } from 'iterable-observer';

@component({
    tagName: 'split-view',
    renderTarget: 'children'
})
export class SplitView extends mixin() {
    connectedCallback() {
        this.classList.add('d-flex', 'w-100');
    }

    toggleDrag({ type, target, pointerId }: PointerEvent) {
        if (type !== 'pointerup')
            (target as HTMLElement).setPointerCapture(pointerId);
        else (target as HTMLElement).releasePointerCapture(pointerId);
    }

    async watchLine(element: HTMLElement) {
        const moving = Observable.fromEvent<PointerEvent>(
                element,
                'pointermove'
            ),
            {
                style,
                offsetLeft
            } = element.previousElementSibling as HTMLElement;

        for await (const { pointerId, clientX } of moving)
            if (element.hasPointerCapture(pointerId))
                style.width = clientX - offsetLeft + 'px';
    }

    render() {
        const [left, right] = this.defaultSlot;

        return (
            <Fragment>
                <div style={{ width: '25%' }}>{left}</div>
                <div
                    className="border border-secondary m-1"
                    style={{ cursor: 'col-resize' }}
                    onPointerDown={this.toggleDrag}
                    onPointerUp={this.toggleDrag}
                    ref={this.watchLine}
                />
                <div className="flex-fill">{right}</div>
            </Fragment>
        );
    }
}
