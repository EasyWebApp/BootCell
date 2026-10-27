import classNames from 'classnames';
import { JsxChildren } from 'dom-renderer';
import { action, observable } from 'mobx';
import {
    FC,
    WebCell,
    WebCellProps,
    attribute,
    component,
    observer
} from 'web-cell';

import { Button, ButtonProps } from '../Form/Button';
import { BootstrapStyles } from '../BootstrapStyles';

export const Dropdown: FC<WebCellProps<HTMLDivElement>> = ({
    key,
    className = '',
    style,
    children,
    ...props
}) => (
    <div
        key={key}
        className={className}
        style={{ position: 'relative', ...style }}
        {...props}
    >
        {children}
    </div>
);

export const DropdownToggle: FC<ButtonProps> = ({
    key,
    className = '',
    children,
    ...props
}) => (
    <Button key={key} {...props} className={className} type="button">
        {children}
    </Button>
);

export const DropdownMenu: FC<WebCellProps> = ({
    key,
    className = '',
    style,
    children,
    ...props
}) => (
    <div
        key={key}
        className={`menu ${className}`}
        style={{ insetBlockStart: '100%', insetInlineStart: '0', ...style }}
        {...props}
    >
        {children}
    </div>
);

export const DropdownItem: FC<WebCellProps<HTMLAnchorElement>> = ({
    className = '',
    children,
    ...props
}) => (
    <a className={`menu-item ${className}`} {...props}>
        {children}
    </a>
);

export interface DropdownButtonProps extends WebCellProps, ButtonProps {
    boxClass?: string;
    buttonClass?: string;
    caption: JsxChildren;
}

export interface DropdownButton extends WebCell<DropdownButtonProps> {}

@component({
    tagName: 'dropdown-button',
    mode: 'open'
})
@observer
export class DropdownButton extends HTMLElement {
    declare props: DropdownButtonProps;

    @attribute
    @observable
    accessor boxClass: string;

    @attribute
    @observable
    accessor buttonClass: string;

    @attribute
    @observable
    accessor variant: ButtonProps['variant'];

    @attribute
    @observable
    accessor theme: ButtonProps['theme'];

    @attribute
    @observable
    accessor size: ButtonProps['size'];

    @observable
    accessor caption: JsxChildren;

    @attribute
    @observable
    accessor disabled = false;

    @attribute
    @observable
    accessor show = false;

    connectedCallback() {
        this.ownerDocument.addEventListener(
            'click',
            this.handleOutsideClick,
            true
        );
        this.addEventListener('keydown', this.handleKeyDown);
        this.addEventListener('click', this.handleItemClick);
        if (this.mounted) this.update();
    }

    disconnectedCallback() {
        this.ownerDocument.removeEventListener(
            'click',
            this.handleOutsideClick,
            true
        );
        this.removeEventListener('keydown', this.handleKeyDown);
        this.removeEventListener('click', this.handleItemClick);
    }

    @action
    toggle = () => {
        if (!this.disabled) this.show = !this.show;
    };

    @action
    close = () => {
        this.show = false;
    };

    handleOutsideClick = (event: MouseEvent) => {
        if (this.show && !event.composedPath().includes(this)) this.close();
    };

    handleKeyDown = (event: KeyboardEvent) => {
        if (!this.show || event.key !== 'Escape' || event.defaultPrevented)
            return;

        // Consume Escape here so a containing native dialog stays open.
        event.preventDefault();
        event.stopPropagation();
        this.close();
        this.shadowRoot.querySelector<HTMLButtonElement>('button')?.focus();
    };

    handleItemClick = (event: MouseEvent) => {
        const link = event
            .composedPath()
            .find(
                (node): node is HTMLAnchorElement =>
                    node instanceof HTMLAnchorElement && node.matches('a[href]')
            );
        if (link && !link.matches('.disabled, [aria-disabled="true"]'))
            this.close();
    };

    renderContent() {
        const { boxClass, buttonClass, variant, theme, size, caption } = this,
            { disabled, show } = this;

        return (
            <Dropdown key="dropdown" className={classNames(boxClass, { show })}>
                <DropdownToggle
                    key="toggle"
                    className={classNames(buttonClass, { show })}
                    {...{ variant, theme, size, disabled }}
                    ariaExpanded={String(show)}
                    onClick={this.toggle}
                >
                    {caption}
                </DropdownToggle>
                <DropdownMenu key="menu" className={classNames({ show })}>
                    <slot />
                </DropdownMenu>
            </Dropdown>
        );
    }

    render() {
        return (
            <>
                <BootstrapStyles />
                <style>
                    {`:host {
                        display: inline-block;
                    }
                    :host(:has(.menu.show)) {
                        position: relative;
                        z-index: var(--z-menu, 1000);
                    }
                    .menu {
                        margin-block-start: var(--menu-spacer, .125rem);
                    }
                    ::slotted(.menu-item) {
                        display: flex;
                        align-items: center;
                        padding: var(--menu-item-padding-y, .25rem) var(--menu-item-padding-x, .75rem);
                        color: var(--menu-item-color, inherit);
                        text-decoration: none;
                        white-space: nowrap;
                        border-radius: var(--menu-item-border-radius, .25rem);
                    }
                    ::slotted(.menu-item:hover), ::slotted(.menu-item:focus) {
                        color: var(--menu-item-hover-color, inherit);
                        background-color: var(--menu-item-hover-bg, var(--bg-1));
                    }`}
                </style>
                {this.renderContent()}
            </>
        );
    }
}
