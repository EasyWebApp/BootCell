import { component, mixin, createCell, Fragment } from 'web-cell';

type EdgeSide = 'top' | 'bottom' | 'left' | 'right';

export type EdgeEvent = CustomEvent<EdgeSide>;

declare global {
    interface HTMLElementEventMap {
        touchedge: EdgeEvent;
    }
}

@component({
    tagName: 'edge-detector',
    style: {
        main: {
            position: 'relative'
        },
        '.left, .right': {
            position: 'absolute',
            top: '0',
            height: '100%'
        },
        '.left': {
            left: '0'
        },
        '.right': {
            right: '0'
        }
    }
})
export class EdgeDetector extends mixin() {
    watch(side: EdgeSide, node: HTMLElement) {
        new IntersectionObserver(([{ isIntersecting }]) => {
            if (isIntersecting) this.emit('touchedge', side);
        }).observe(node);
    }

    render() {
        return (
            <Fragment>
                <div ref={this.watch.bind(this, 'top')}>
                    <slot name="top" />
                </div>
                <main>
                    <div ref={this.watch.bind(this, 'left')} className="left">
                        <slot name="left" />
                    </div>

                    <slot />

                    <div ref={this.watch.bind(this, 'right')} className="right">
                        <slot name="right" />
                    </div>
                </main>
                <div ref={this.watch.bind(this, 'bottom')}>
                    <slot name="bottom" />
                </div>
            </Fragment>
        );
    }
}
