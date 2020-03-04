import { component, mixin, watch, attribute } from 'web-cell';
import { watchMotion } from 'web-utility/source/animation';

export interface CollapseProps {
    open: boolean;
}

@component({
    tagName: 'collapse-box',
    renderTarget: 'children'
})
export class CollapseBox extends mixin<CollapseProps>() {
    naturalDisplay = '';
    naturalHeight = 0;

    @attribute
    @watch
    set open(open: boolean) {
        const end = watchMotion('transition', this);

        this.setProps({ open }).then(async () => {
            if (!this.naturalHeight) return;

            if (!open) {
                this.style.height = '0px';
                await end;
                this.style.display = 'none';
                this.emit('close');
            } else {
                this.style.display = this.naturalDisplay;

                self.requestAnimationFrame(async () => {
                    this.style.height = this.naturalHeight + 'px';
                    await end;
                    this.emit('open');
                });
            }
        });
    }

    connectedCallback() {
        this.style.transitionDuration = '0.25s';

        new IntersectionObserver(([{ isIntersecting }], observer) => {
            if (!isIntersecting) return;

            observer.disconnect();

            const { display, height } = getComputedStyle(this);

            this.naturalDisplay = display;
            this.naturalHeight = parseFloat(height);

            if (!this.open) this.open = false;
        }).observe(this);

        super.connectedCallback();
    }
}
