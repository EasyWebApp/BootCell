import {
    VNodeChildElement,
    component,
    mixin,
    createCell,
    Fragment,
    watch,
    attribute,
    transitIn,
    transitOut
} from 'web-cell';

import { WebCellProps } from '../utility/type';
import { Position } from '../utility/constant';

import './Tooltip.less';

export interface TooltipProps extends WebCellProps {
    text: VNodeChildElement;
    position?: keyof typeof Position;
}

@component({
    tagName: 'tooltip-box',
    renderTarget: 'children'
})
export class TooltipBox extends mixin<TooltipProps>() {
    @watch
    text = '';

    @attribute
    @watch
    position = 'top';

    connectedCallback() {
        this.style.display = 'inline-block';
        this.style.position = 'relative';

        this.addEventListener('mouseenter', () =>
            transitIn(this.lastElementChild as HTMLElement, 'show')
        );
        this.addEventListener('mouseleave', () =>
            transitOut(this.lastElementChild as HTMLElement, 'show')
        );

        super.connectedCallback();
    }

    render({ text, position }: TooltipProps) {
        return (
            <Fragment>
                {this.defaultSlot}

                <div
                    className={`tooltip bs-tooltip-${position} fade`}
                    role="tooltip"
                >
                    <div className="arrow" />
                    <div className="tooltip-inner">{text}</div>
                </div>
            </Fragment>
        );
    }
}
