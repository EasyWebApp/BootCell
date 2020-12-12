import {
    VNode,
    createCell,
    component,
    mixin,
    watch,
    attribute,
    on,
    Fragment
} from 'web-cell';
import { uniqueID } from 'web-utility/source/data';
import classNames from 'classnames';

import { Size } from '../../utility/constant';
import { NavProps, isNavLink, Nav } from '../Nav';
import { BannerNavBarProps } from './BannerNavBar';
import { NavBarToggler } from './Toggler';
import { CollapseBox } from '../../Content/Collapse';
import './NavBar.less';

export interface NavBarProps extends BannerNavBarProps {
    offcanvas?: boolean;
    menuAlign?: NavProps['align'];
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

    @attribute
    @watch
    open = false;

    get expanded() {
        const { expand } = this;

        return expand && Size[expand] <= self.innerWidth;
    }

    outClose = ({ target }: MouseEvent) => {
        if (
            this.open &&
            !(
                this.compareDocumentPosition(target as HTMLElement) &
                Node.DOCUMENT_POSITION_CONTAINED_BY
            )
        )
            this.open = false;
    };

    escapeClose = ({ code }: KeyboardEvent) => {
        if (this.open && code === 'Escape') this.open = false;
    };
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
            fixed === 'top' ? 'sticky-top' : 'fixed-bottom'
        );
        if (expand)
            this.classList.add(
                `navbar-expand${expand === 'xs' ? '' : '-' + expand}`
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
        defaultSlot,
        expand,
        brand,
        open,
        offcanvas
    }: NavBarProps) {
        const [links, extra] = (defaultSlot as VNode[]).reduce(
                ([links, extra], node) => {
                    if (isNavLink(node)) links.push(node);
                    else extra.push(node);

                    return [links, extra];
                },
                [[], []]
            ),
            flexClass = `d${
                !expand || expand === 'xs' ? '' : '-' + expand
            }-flex`,
            { UID } = this,
            expanded = this.expanded || open;

        const content = (
            <Fragment>
                <Nav className="navbar-nav flex-grow-1" align={menuAlign}>
                    {links}
                </Nav>
                {extra[0] && (
                    <div
                        className={classNames(
                            flexClass,
                            'justify-content-end',
                            'align-items-center'
                        )}
                    >
                        {extra}
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
                {(links[0] || extra[0]) && (
                    <NavBarToggler
                        aria-controls={UID}
                        aria-expanded={expanded + ''}
                        onClick={() => (this.open = !open)}
                    />
                )}
                {!offcanvas ? (
                    <CollapseBox
                        className="navbar-collapse"
                        id={UID}
                        open={expanded}
                    >
                        {content}
                    </CollapseBox>
                ) : (
                    <div
                        className={classNames(
                            flexClass,
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
