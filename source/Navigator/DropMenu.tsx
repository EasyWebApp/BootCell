import {
    VNodeChildElement,
    component,
    mixin,
    watch,
    attribute,
    createCell,
    Fragment
} from 'web-cell';
import classNames from 'classnames';

import { HTMLHyperLinkProps, uniqueID } from '../utility';
import { ButtonProps, Button } from '../Form/Button';

export interface DropMenuProps {
    title: VNodeChildElement;
    buttonKind?: ButtonProps['kind'];
    buttonSize?: ButtonProps['size'];
    direction?: 'up' | 'down' | 'left' | 'right';
    href?: HTMLHyperLinkProps['href'];
    target?: HTMLHyperLinkProps['target'];
    open?: boolean;
    list: HTMLHyperLinkProps[];
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
    direction: DropMenuProps['direction'] = 'down';

    @attribute
    @watch
    href: string;

    @attribute
    @watch
    target: DropMenuProps['target'];

    @attribute
    @watch
    open: boolean;

    @watch
    list: HTMLHyperLinkProps[] = [];

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
                {href ? <span class="sr-only">Toggle Dropdown</span> : title}
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

    render({ href, direction, open, list }: DropMenuProps) {
        const { UID } = this;

        const menu = (
            <div
                className={classNames('dropdown-menu', open && 'show')}
                aria-labelledby={UID}
                onClick={() => (this.open = false)}
            >
                {list.map(({ title, ...rest }) => (
                    <a
                        href="javascript: void"
                        {...rest}
                        className="dropdown-item"
                    >
                        {title}
                    </a>
                ))}
            </div>
        );

        return (
            <div
                className={classNames(
                    href || direction !== 'down' ? 'btn-group' : 'dropdown',
                    (href
                        ? !['down', 'left'].includes(direction)
                        : direction !== 'down') && `drop${direction}`,
                    open && 'show'
                )}
            >
                {href && direction === 'left' ? (
                    <Fragment>
                        <div class="btn-group dropleft" role="group">
                            {menu}
                        </div>
                        {this.renderButton()}
                    </Fragment>
                ) : (
                    <Fragment>
                        {this.renderButton()}
                        {menu}
                    </Fragment>
                )}
            </div>
        );
    }
}
