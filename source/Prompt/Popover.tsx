import classNames from 'classnames';
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
import {
    OverlayTriggerElement,
    OverlayTriggerProps,
    Placement
} from './Overlay';
import { validatePlacement } from './OverlayModel';

export const PopoverHeader: FC<WebCellProps<HTMLHeadingElement>> = ({
    className,
    children,
    ...props
}) => (
    <h3 {...props} className={classNames('popover-header', className)}>
        {children}
    </h3>
);
export const PopoverBody: FC<WebCellProps<HTMLDivElement>> = ({
    className,
    children,
    ...props
}) => (
    <div {...props} className={classNames('popover-body', className)}>
        {children}
    </div>
);
export interface PopoverProps extends WebCellProps<HTMLDivElement> {
    placement?: Placement;
    body?: boolean;
    show?: boolean;
}
export const Popover: FC<PopoverProps> = ({
    placement = 'right',
    body,
    show,
    className,
    children,
    ...props
}) => {
    validatePlacement(placement);
    const side = placement.split('-')[0];
    const direction = { left: 'start', right: 'end' }[side] || side;
    return (
        <div
            {...props}
            role="tooltip"
            data-placement={placement}
            className={classNames(
                'popover',
                `bs-popover-${direction}`,
                show && 'show',
                className
            )}
        >
            <div className="popover-arrow" />
            {body ? <PopoverBody>{children}</PopoverBody> : children}
        </div>
    );
};

export interface PopoverBoxProps extends Omit<OverlayTriggerProps, 'overlay'> {
    header?: JsxChildren;
    body?: JsxChildren;
    position?: Placement;
    shown?: boolean;
}
export interface PopoverBox extends Omit<
    WebCell,
    'props' | 'connectedCallback' | 'disconnectedCallback' | 'updatedCallback'
> {}
@component({ tagName: 'popover-box', mode: 'open' })
@observer
export class PopoverBox extends OverlayTriggerElement {
    declare props: PopoverBoxProps;
    @observable accessor header: JsxChildren;
    @observable accessor body: JsxChildren;
    @attribute @observable accessor placement: Placement = 'top';
    @observable accessor trigger: OverlayTriggerProps['trigger'] = 'click';
    get position() {
        return this.placement;
    }
    set position(placement: Placement) {
        this.placement = placement;
    }
    get shown() {
        return this.visible;
    }
    set shown(show: boolean) {
        this.toggle(show);
    }
    renderOverlay() {
        return (
            <Popover placement={this.placement} show={this.visible}>
                {this.header != null && (
                    <PopoverHeader>{this.header}</PopoverHeader>
                )}
                <PopoverBody>{this.body}</PopoverBody>
            </Popover>
        );
    }
}
