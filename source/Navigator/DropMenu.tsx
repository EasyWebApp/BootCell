import {
    VNodeChildElement,
    WebCellProps,
    component,
    mixin,
    watch,
    attribute,
    createCell,
    Fragment,
    on
} from 'web-cell';
import { HTMLHyperLinkProps } from 'web-utility/source/DOM-type';
import { uniqueID } from 'web-utility/source/data';
import classNames from 'classnames';

import { ButtonProps, Button } from '../Form/Button';

export interface DropMenuItem extends HTMLHyperLinkProps {
    active?: boolean;
    disabled?: boolean;
    content?: VNodeChildElement;
}

export interface DropMenuProps extends WebCellProps {
    title: VNodeChildElement & string;
    buttonKind?: ButtonProps['kind'];
    buttonSize?: ButtonProps['size'];
    alignType?: 'left' | 'right';
    alignSize?: '' | 'sm' | 'md' | 'lg' | 'xl';
    direction?: 'up' | 'down' | 'left' | 'right';
    href?: HTMLHyperLinkProps['href'];
    target?: HTMLHyperLinkProps['target'];
    open?: boolean;
    list: DropMenuItem[];
}

@component({
    tagName: 'drop-menu',
    renderTarget: 'children'
})
export class DropMenu extends mixin<DropMenuProps>() {
    UID = uniqueID();

    @attribute
    @watch
    title: ButtonProps['title'];

    @attribute
    @watch
    buttonKind: ButtonProps['kind'];

    @attribute
    @watch
    buttonSize: ButtonProps['size'];

    @attribute
    @watch
    alignType: DropMenuProps['alignType'] = 'left';

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

    @watch
    list: DropMenuItem[] = [];

    outClose = ({ target }: MouseEvent) => {
        if (
            this.compareDocumentPosition(target as HTMLElement) &
            Node.DOCUMENT_POSITION_CONTAINED_BY
        )
            return;

        this.open = false;
    };

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

    renderButton() {
        const {
            UID,
            props: { buttonKind, buttonSize, open, href, title, target }
        } = this;

        const trigger = (
            <Button
                kind={buttonKind}
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
                    title
                )}
            </Button>
        );

        return href ? (
            <Fragment>
                <Button
                    kind={buttonKind}
                    size={buttonSize}
                    target={target}
                    href={href}
                >
                    {title}
                </Button>

                {trigger}
            </Fragment>
        ) : (
            trigger
        );
    }

    @on('click', '.dropdown-menu [class|="dropdown-item"]')
    itemClose() {
        this.open = false;
    }

    renderItem({
        href,
        active,
        disabled,
        className,
        tabIndex,
        title,
        content,
        ...rest
    }: DropMenuItem) {
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
                {title}
            </a>
        ) : title ? (
            <span
                {...rest}
                className={classNames('dropdown-item-text', className)}
            >
                {title}
            </span>
        ) : (
            content || (
                <div
                    {...rest}
                    className={classNames('dropdown-divider', className)}
                />
            )
        );
    }

    renderList() {
        const { alignType, alignSize, open, UID, list } = this;
        const alignment =
            alignType === 'right'
                ? [`dropdown-menu${alignSize && '-' + alignSize}-right`]
                : alignType === 'left' && alignSize
                ? ['dropdown-menu-right', `dropdown-menu-${alignSize}-left`]
                : [];

        return (
            <div
                className={classNames(
                    'dropdown-menu',
                    ...alignment,
                    open && 'show'
                )}
                aria-labelledby={UID}
            >
                {list.map(item => this.renderItem(item))}
            </div>
        );
    }

    updatedCallback() {
        const { href, direction } = this;

        this.classList.add(
            'd-inline-block',
            href || direction !== 'down' ? 'btn-group' : 'dropdown'
        );

        if (href ? !['down', 'left'].includes(direction) : direction !== 'down')
            this.classList.add(`drop${direction}`);
    }

    render({ href, direction }: DropMenuProps) {
        return href && direction === 'left' ? (
            <Fragment>
                <div className="btn-group dropleft" role="group">
                    {this.renderList()}
                </div>
                {this.renderButton()}
            </Fragment>
        ) : (
            <Fragment>
                {this.renderButton()}
                {this.renderList()}
            </Fragment>
        );
    }
}
