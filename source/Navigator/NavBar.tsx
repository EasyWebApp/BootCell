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
import { NavProps, Nav } from './Nav';
import './NavBar.less';

export interface NavBarProps extends WebCellProps {
    narrow?: boolean;
    expand?: keyof typeof Size;
    fixed?: 'top' | 'bottom';
    direction?: 'left' | 'right';
    offcanvas?: boolean;
    theme?: keyof typeof Theme;
    background?: BackgroundColors;
    brand?: VNodeChildElement;
    menu?: NavProps['list'];
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
    brand = document.title;

    @watch
    menu = [];

    @attribute
    @watch
    activeIndex = 0;

    @attribute
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

        super.connectedCallback();
    }

    disconnectedCallback() {
        document.body.removeEventListener('click', this.outClose);
        self.removeEventListener('keydown', this.escapeClose);
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

        this.className = classNames(
            'navbar',
            `navbar-${theme}`,
            `bg-${background}`,
            'shadow',
            `navbar-expand${expand === 'xs' ? '' : '-' + expand}`,
            fixed === 'top' ? 'sticky-top' : 'fixed-bottom',
            !narrow && direction !== 'left' && 'flex-row-reverse',
            this.className
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
        brand,
        menu,
        activeIndex,
        open,
        offcanvas,
        expand,
        defaultSlot
    }: NavBarProps) {
        const { UID } = this;

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
                <div
                    className={classNames(
                        !offcanvas && 'collapse',
                        'navbar-collapse',
                        offcanvas && 'offcanvas-collapse',
                        open && (offcanvas ? 'open' : 'show')
                    )}
                    id={UID}
                >
                    <Nav
                        className="navbar-nav"
                        list={menu}
                        activeIndex={activeIndex}
                    />
                    {defaultSlot[0] && (
                        <div
                            className={classNames(
                                'flex-grow-1',
                                `d${expand === 'xs' ? '' : '-' + expand}-flex`,
                                'justify-content-end'
                            )}
                        >
                            {defaultSlot}
                        </div>
                    )}
                </div>
            </Fragment>
        );
    }

    render({ narrow, direction, ...rest }: NavBarProps) {
        const content = this.renderContent(rest);

        return narrow ? (
            <div
                className={classNames(
                    'container',
                    direction !== 'left' && 'flex-row-reverse'
                )}
            >
                {content}
            </div>
        ) : (
            content
        );
    }
}
