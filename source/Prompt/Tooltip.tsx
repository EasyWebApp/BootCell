import { JsxChildren } from 'dom-renderer';
import { observable } from 'mobx';
import {
    FC,
    WebCell,
    WebCellProps,
    attribute,
    component,
    observer
} from 'web-cell';

import { BootstrapStyles } from '../BootstrapStyles';

export const Tooltip: FC<WebCellProps> = ({
    className = '',
    children,
    ...props
}) => (
    <div
        className={`tooltip bs-tooltip show position-absolute ${className}`}
        role="tooltip"
        {...props}
    >
        <div className="tooltip-arrow" />
        <div className="tooltip-inner">{children}</div>
    </div>
);

export interface TooltipBoxProps extends WebCellProps {
    content: JsxChildren;
}

export interface TooltipBox extends WebCell {}

@component({
    tagName: 'tooltip-box',
    mode: 'open'
})
@observer
export class TooltipBox extends HTMLElement implements WebCell {
    declare props: TooltipBoxProps;

    content: JsxChildren;

    @attribute
    @observable
    accessor show = false;

    connectedCallback() {
        this.style.display = 'inline-block';

        this.addEventListener('mouseenter', this.handleToggle);
        this.addEventListener('mouseleave', this.handleToggle);
    }

    disconnectedCallback() {
        this.removeEventListener('mouseenter', this.handleToggle);
        this.removeEventListener('mouseleave', this.handleToggle);
    }

    handleToggle = () => (this.show = !this.show);

    render() {
        const { content, show } = this;

        return (
            <>
                <BootstrapStyles />
                <slot />

                {show && <Tooltip>{content}</Tooltip>}
            </>
        );
    }
}
