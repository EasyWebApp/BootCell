import {
    WebCellProps,
    VNodeChildElement,
    component,
    mixin,
    createCell,
    Fragment,
    watch,
    attribute
} from 'web-cell';
import { transitIn, transitOut } from 'web-utility/source/animation';

import { Position } from '../utility/constant';

import './Tooltip/index.less';

export interface PopoverProps extends WebCellProps {
    header?: VNodeChildElement;
    body?: VNodeChildElement;
    position?: keyof typeof Position;
    shown?: boolean;
}

@component({
    tagName: 'popover-box',
    renderTarget: 'children'
})
export class PopoverBox extends mixin<PopoverProps>() {
    @watch
    header = '';

    @watch
    body = '';

    @attribute
    @watch
    position = 'top';

    @attribute
    @watch
    set shown(shown: boolean) {
        if (shown === !!this.props.shown) return;

        this.setProps({ shown }).then(async () => {
            const popover = this.lastElementChild as HTMLElement;

            if (shown) {
                popover.removeAttribute('aria-hidden');

                await transitIn(popover, 'show');

                this.emit('show');
            } else {
                popover.setAttribute('aria-hidden', 'true');

                await transitOut(popover, 'show');

                this.emit('hide');
            }
        });
    }

    fromSlot({ target }: Event) {
        return (
            target === this ||
            ((target as Element).parentElement === this &&
                target !== this.lastElementChild)
        );
    }

    toggleByClick = (event: MouseEvent) => {
        if (this.fromSlot(event)) this.shown = !this.shown;
        else if (!this.contains(event.target as Element)) this.shown = false;
    };

    connectedCallback() {
        this.classList.add('d-inline-block', 'position-relative');

        self.addEventListener('click', this.toggleByClick);

        super.connectedCallback();
    }

    disconnectedCallback() {
        self.addEventListener('click', this.toggleByClick);
    }

    render({ defaultSlot, header, body, position }: PopoverProps) {
        return (
            <Fragment>
                {defaultSlot}

                <div
                    className={`popover bs-popover-${position} fade`}
                    role="tooltip"
                >
                    <div className="popover-arrow" />
                    {header && (
                        <h3 className="popover-header text-nowrap">{header}</h3>
                    )}
                    <div className="popover-body">{body}</div>
                </div>
            </Fragment>
        );
    }
}
