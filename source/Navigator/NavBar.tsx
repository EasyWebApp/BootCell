import {
    createCell,
    VNodeChildElement,
    component,
    mixin,
    watch,
    attribute,
    Fragment
} from 'web-cell';
import classNames from 'classnames';

import { Theme, Status, uniqueID, WebCellProps } from '../utility';

interface NavLinkProps {
    title: string;
    href: string;
    active?: boolean;
}

export function NavLink({ title, href, active }: NavLinkProps) {
    return (
        <li className={classNames('nav-item', active && 'active')}>
            <a className="nav-link" href={href}>
                {title}
                {!active ? null : <span className="sr-only">(current)</span>}
            </a>
        </li>
    );
}

export interface NavBarProps extends WebCellProps {
    brand?: VNodeChildElement;
    theme?: keyof typeof Theme;
    background?: keyof typeof Theme | keyof typeof Status;
    narrow?: boolean;
    expand?: string;
    fixed?: string;
    menu?: NavLinkProps[];
    open?: boolean;
}

@component({
    tagName: 'nav-bar',
    renderTarget: 'children'
})
export class NavBar extends mixin<NavBarProps>() {
    UID = uniqueID();

    @attribute
    @watch
    brand = document.title;

    @attribute
    @watch
    theme = 'dark';

    @attribute
    @watch
    background = 'dark';

    @attribute
    @watch
    narrow = false;

    @attribute
    @watch
    expand = 'md';

    @attribute
    @watch
    fixed = 'top';

    @watch
    menu = [];

    @watch
    open = false;

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
    }

    disconnectedCallback() {
        document.body.removeEventListener('click', this.outClose);
        self.removeEventListener('keydown', this.escapeClose);
    }

    renderContent() {
        const {
            UID,
            props: { brand, menu, open },
            defaultSlot
        } = this;

        return (
            <Fragment>
                <a
                    target="_top"
                    href="."
                    className="navbar-brand d-flex align-items-center"
                >
                    {brand}
                </a>
                {menu[0] && (
                    <button
                        type="button"
                        className="navbar-toggler"
                        aria-controls={UID}
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                        onClick={() => (this.open = !open)}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                )}
                <div
                    className={classNames(
                        'collapse',
                        'navbar-collapse',
                        open && 'show'
                    )}
                    id={UID}
                >
                    <ul
                        className="navbar-nav"
                        onClick={() => (this.open = false)}
                    >
                        {menu.map(item => (
                            <NavLink {...item} />
                        ))}
                    </ul>
                    {defaultSlot[0] && (
                        <div className="flex-grow-1 d-md-flex justify-content-end">
                            {this.defaultSlot}
                        </div>
                    )}
                </div>
            </Fragment>
        );
    }

    render({ theme, background, narrow, expand, fixed }: NavBarProps) {
        const content = this.renderContent();

        return (
            <header
                className={classNames(
                    'navbar',
                    `navbar-${theme}`,
                    `bg-${background}`,
                    'box-shadow',
                    `navbar-expand-${expand}`,
                    `fixed-${fixed}`
                )}
            >
                {narrow ? <div className="container">{content}</div> : content}
            </header>
        );
    }
}
