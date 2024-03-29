import {
    WebCellProps,
    WebCellElement,
    VNodeChildElement,
    VNode,
    component,
    mixin,
    watch,
    attribute,
    on,
    createCell,
    Fragment
} from 'web-cell';
import type { HTMLHyperLinkProps } from 'web-utility';
import { uniqueID } from 'web-utility/source/data';
import classNames from 'classnames';

import { ButtonProps, Button } from '../Form/Button';

export interface DropMenuItemProps extends WebCellProps, HTMLHyperLinkProps {
    active?: boolean;
    disabled?: boolean;
}

export function DropMenuItem({
    href,
    active,
    disabled,
    className,
    tabIndex,
    defaultSlot,
    ...rest
}: DropMenuItemProps) {
    return href ? (
        <a
            {...rest}
            className={classNames(
                'dropdown-item',
                active && 'active',
                disabled && 'disabled',
                className
            )}
            href={href}
            tabIndex={disabled ? -1 : tabIndex}
            aria-disabled={!!disabled + ''}
        >
            {defaultSlot}
        </a>
    ) : defaultSlot[0] ? (
        <span {...rest} className={classNames('dropdown-item-text', className)}>
            {defaultSlot}
        </span>
    ) : (
        <div {...rest} className={classNames('dropdown-divider', className)} />
    );
}

export function isDropMenuItem(node: VNodeChildElement): node is VNode {
    const {
        ['dropdown-item']: link,
        ['dropdown-item-text']: text,
        ['dropdown-divider']: divider
    } = (node as VNode).data?.class || {};

    return link || text || divider;
}

export interface DropMenuProps extends WebCellProps {
    caption: WebCellElement;
    buttonColor?: ButtonProps['color'];
    buttonSize?: ButtonProps['size'];
    alignType?: 'start' | 'end';
    alignSize?: '' | 'sm' | 'md' | 'lg' | 'xl';
    direction?: 'up' | 'down' | 'start' | 'end';
    href?: HTMLHyperLinkProps['href'];
    target?: HTMLHyperLinkProps['target'];
    open?: boolean;
}

@component({
    tagName: 'drop-menu',
    renderTarget: 'children'
})
export class DropMenu extends mixin<DropMenuProps>() {
    static is({ sel }: VNode) {
        return sel?.startsWith(this.tagName);
    }

    UID = uniqueID();

    @attribute
    @watch
    caption: WebCellElement;

    @attribute
    @watch
    buttonColor: ButtonProps['color'];

    @attribute
    @watch
    buttonSize: ButtonProps['size'];

    @attribute
    @watch
    alignType: DropMenuProps['alignType'] = 'start';

    @attribute
    @watch
    alignSize: DropMenuProps['alignSize'] = '';

    @attribute
    @watch
    direction: DropMenuProps['direction'] = 'down';

    @attribute
    @watch
    href: string;

    @attribute
    @watch
    target: DropMenuProps['target'];

    @attribute
    @watch
    set open(open: boolean) {
        this.setProps({ open }).then(() => this.classList.toggle('show', open));
    }

    outClose = ({ target }: MouseEvent) =>
        this.open &&
        !(
            this.compareDocumentPosition(target as HTMLElement) &
            Node.DOCUMENT_POSITION_CONTAINED_BY
        ) &&
        (this.open = false);

    escapeClose = ({ code }: KeyboardEvent) =>
        code === 'Escape' && (this.open = false);

    connectedCallback() {
        document.body.addEventListener('click', this.outClose);
        self.addEventListener('keydown', this.escapeClose);

        super.connectedCallback();
    }

    disconnectedCallback() {
        document.body.removeEventListener('click', this.outClose);
        self.removeEventListener('keydown', this.escapeClose);
    }

    @on('click', '.dropdown-menu [class|="dropdown-item"]')
    itemClose() {
        this.open = false;
    }

    updatedCallback() {
        const { href, direction } = this;

        this.classList.add(
            'd-inline-block',
            href || direction !== 'down' ? 'btn-group' : 'dropdown'
        );

        if (
            href ? !['down', 'start'].includes(direction) : direction !== 'down'
        )
            this.classList.add(`drop${direction}`);
    }

    renderButton() {
        const {
            UID,
            props: { buttonColor, buttonSize, open, href, caption, target }
        } = this;

        const trigger = (
            <Button
                color={buttonColor}
                size={buttonSize}
                className={classNames(
                    'dropdown-toggle',
                    href && 'dropdown-toggle-split'
                )}
                id={UID}
                aria-haspopup="true"
                aria-expanded={!!open + ''}
                onClick={() => (this.open = !open)}
            >
                {href ? (
                    <span className="sr-only">Toggle Dropdown</span>
                ) : (
                    caption
                )}
            </Button>
        );

        return href ? (
            <>
                <Button
                    color={buttonColor}
                    size={buttonSize}
                    target={target}
                    href={href}
                >
                    {caption}
                </Button>

                {trigger}
            </>
        ) : (
            trigger
        );
    }

    render({
        alignType,
        alignSize,
        open,
        defaultSlot,
        href,
        direction
    }: DropMenuProps) {
        const alignment =
            alignType === 'end'
                ? [`dropdown-menu${alignSize && '-' + alignSize}-end`]
                : alignType === 'start' && alignSize
                ? ['dropdown-menu-end', `dropdown-menu-${alignSize}-start`]
                : [];
        const body = (
            <div
                className={classNames(
                    'dropdown-menu',
                    ...alignment,
                    open && 'show'
                )}
                aria-labelledby={this.UID}
            >
                {defaultSlot}
            </div>
        );

        return href && direction === 'start' ? (
            <>
                <div className="btn-group dropstart" role="group">
                    {body}
                </div>
                {this.renderButton()}
            </>
        ) : (
            <>
                {this.renderButton()}
                {body}
            </>
        );
    }
}
