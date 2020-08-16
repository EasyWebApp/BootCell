import {
    WebCellProps,
    createCell,
    VNodeChildElement,
    component,
    mixin,
    watch,
    attribute,
    on,
    Fragment
} from 'web-cell';
import { uniqueID } from 'web-utility/source/data';
import classNames from 'classnames';

import { Size, Theme, BackgroundColors } from '../utility/constant';
import { NavProps, NavLinkProps, Nav, NavLink } from './Nav';
import '../Content/Collapse';
import './NavBar.less';

export interface NavBarProps extends WebCellProps {
    narrow?: boolean;
    expand?: keyof typeof Size;
    fixed?: 'top' | 'bottom';
    direction?: 'left' | 'right';
    offcanvas?: boolean;
    theme?: keyof typeof Theme;
    background?: BackgroundColors;
    menuAlign?: NavProps['align'];
    brand?: VNodeChildElement;
    menu?: NavLinkProps[];
    activeIndex?: number;
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
    narrow = false;

    @attribute
    @watch
    expand = 'md';

    @attribute
    @watch
    fixed = 'top';

    @attribute
    @watch
    direction = 'left';

    @attribute
    @watch
    offcanvas = false;

    @attribute
    @watch
    theme = 'dark';

    @attribute
    @watch
    background = 'dark';

    @attribute
    @watch
    menuAlign = 'start';

    @attribute
    @watch
    brand = document.title;

    @watch
    menu = [];

    @attribute
    @watch
    activeIndex = 0;

    @attribute
    @watch
    open = false;

    get expanded() {
        return Size[this.expand] <= self.innerWidth;
    }

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

    private resizer: ResizeObserver;

    connectedCallback() {
        document.body.addEventListener('click', this.outClose);
        self.addEventListener('keydown', this.escapeClose);

        this.resizer = new ResizeObserver(() => this.update());
        this.resizer.observe(this);

        super.connectedCallback();
    }

    disconnectedCallback() {
        document.body.removeEventListener('click', this.outClose);
        self.removeEventListener('keydown', this.escapeClose);

        this.resizer.disconnect();
    }

    updatedCallback() {
        const {
            theme,
            background,
            expand,
            fixed,
            narrow,
            direction,
            open
        } = this.props;

        this.classList.add(
            'navbar',
            `navbar-${theme}`,
            `bg-${background}`,
            'shadow',
            `navbar-expand${expand === 'xs' ? '' : '-' + expand}`,
            fixed === 'top' ? 'sticky-top' : 'fixed-bottom'
        );

        this.classList.toggle(
            'flex-row-reverse',
            !narrow && direction !== 'left' && !this.expanded
        );

        if (open) return;

        const offcanvas = this.querySelector<HTMLElement>(
            '.offcanvas-collapse'
        );
        if (!offcanvas) return;

        const { height, backgroundColor } = self.getComputedStyle(this);

        offcanvas.style.top = height;
        offcanvas.style.backgroundColor = backgroundColor;
    }

    @on('click', '.nav-item:not(drop-menu), .dropdown-item')
    clickClose() {
        this.open = false;
    }

    renderContent({
        menuAlign,
        menu,
        activeIndex,
        defaultSlot,
        expand,
        brand,
        open,
        offcanvas
    }: NavBarProps) {
        const { UID } = this,
            content = (
                <Fragment>
                    <Nav className="navbar-nav flex-grow-1" align={menuAlign}>
                        {menu.map(({ title, ...props }, index) => (
                            <NavLink {...props} active={index === activeIndex}>
                                {title}
                            </NavLink>
                        ))}
                    </Nav>
                    {defaultSlot[0] && (
                        <div
                            className={classNames(
                                `d${expand === 'xs' ? '' : '-' + expand}-flex`,
                                'justify-content-end'
                            )}
                        >
                            {defaultSlot}
                        </div>
                    )}
                </Fragment>
            );

        return (
            <Fragment>
                <a
                    target="_top"
                    href="."
                    className="navbar-brand d-flex align-items-center"
                >
                    {brand}
                </a>
                {(menu[0] || defaultSlot[0]) && (
                    <button
                        type="button"
                        className="navbar-toggler"
                        aria-controls={UID}
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                        onClick={() => (this.open = !open)}
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                )}
                {!offcanvas ? (
                    <collapse-box
                        className="navbar-collapse"
                        id={UID}
                        open={this.expanded || open}
                    >
                        {content}
                    </collapse-box>
                ) : (
                    <div
                        className={classNames(
                            `d-${expand}-flex`,
                            'w-100',
                            'offcanvas-collapse',
                            open && 'open'
                        )}
                        id={UID}
                    >
                        {content}
                    </div>
                )}
            </Fragment>
        );
    }

    render({ narrow, direction, ...rest }: NavBarProps) {
        const content = this.renderContent(rest);

        return narrow ? (
            <div
                className={classNames(
                    'container',
                    direction !== 'left' && !this.expanded && 'flex-row-reverse'
                )}
            >
                {content}
            </div>
        ) : (
            content
        );
    }
}
