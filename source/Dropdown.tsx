import classNames from 'classnames';
import { JsxChildren } from 'dom-renderer';
import { observable } from 'mobx';
import { FC, WebCellProps, attribute, component, observer } from 'web-cell';

import { Button, ButtonProps } from './Button';

export const Dropdown: FC<WebCellProps<HTMLDivElement>> = ({
    className = '',
    children,
    ...props
}) => (
    <div className={`dropdown ${className}`} {...props}>
        {children}
    </div>
);

export const DropdownToggle: FC<ButtonProps> = ({
    className = '',
    children,
    ...props
}) => (
    <Button {...props} className={`dropdown-toggle ${className}`} type="button">
        {children}
    </Button>
);

export const DropdownMenu: FC<WebCellProps> = ({
    className = '',
    children,
    ...props
}) => (
    <nav className={`dropdown-menu ${className}`} {...props}>
        {children}
    </nav>
);

export const DropdownItem: FC<WebCellProps<HTMLAnchorElement>> = ({
    className = '',
    children,
    ...props
}) => (
    <a className={`dropdown-item ${className}`} {...props}>
        {children}
    </a>
);

export interface DropdownButtonProps extends WebCellProps, ButtonProps {
    caption: JsxChildren;
}

@component({
    tagName: 'dropdown-button',
    mode: 'open'
})
@observer
export class DropdownButton extends HTMLElement {
    declare props: DropdownButtonProps;

    @attribute
    @observable
    accessor variant: ButtonProps['variant'];

    @attribute
    @observable
    accessor size: ButtonProps['size'];

    @observable
    accessor caption: JsxChildren;

    @attribute
    @observable
    accessor show = false;

    renderContent() {
        const { variant, size, caption, show } = this;

        return (
            <Dropdown className={classNames({ show })}>
                <DropdownToggle
                    className={classNames({ show })}
                    {...{ variant, size }}
                    onClick={() => (this.show = !show)}
                >
                    {caption}
                </DropdownToggle>
                <DropdownMenu className={classNames({ show })}>
                    <slot />
                </DropdownMenu>
            </Dropdown>
        );
    }

    render() {
        return (
            <>
                <link
                    rel="stylesheet"
                    href="https://unpkg.com/bootstrap@5.3.2/dist/css/bootstrap.min.css"
                />
                {this.renderContent()}
            </>
        );
    }
}
