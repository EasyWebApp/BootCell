import {
    WebCellProps,
    component,
    mixin,
    watch,
    attribute,
    createCell
} from 'web-cell';
import { watchMotion } from 'web-utility/source/animation';

export interface CollapseProps extends WebCellProps {
    open?: boolean;
}

@component({
    tagName: 'collapse-box',
    style: {
        ':host': {
            position: 'relative',
            height: 0,
            overflow: 'hidden',
            transition: '0.25s'
        },
        ':host > div': {
            display: 'none',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0
        }
    }
})
export class CollapseBox extends mixin<CollapseProps>() {
    @attribute
    @watch
    set open(open: boolean) {
        this.setProps({ open }).then(async () => {
            const end = watchMotion('transition', this),
                box = this.shadowRoot.lastElementChild as HTMLElement;

            if (!open) {
                this.style.height = '0px';
                await end;
                box.style.display = 'none';
                this.emit('close');
            } else {
                box.style.display = self.getComputedStyle(this).display;
                this.style.height = self.getComputedStyle(box).height;
                await end;
                this.emit('open');
            }
        });
    }

    private resizer: ResizeObserver;

    connectedCallback() {
        super.connectedCallback();

        this.resizer = new ResizeObserver(([{ target }]) => {
            (target as HTMLElement).style.display = self.getComputedStyle(
                this
            ).display;

            if (this.open)
                this.style.height = self.getComputedStyle(target).height;
        });
        this.resizer.observe(this.shadowRoot.lastElementChild);
    }

    disconnectedCallback() {
        this.resizer.disconnect();
    }

    render() {
        return (
            <div>
                <slot />
            </div>
        );
    }
}
