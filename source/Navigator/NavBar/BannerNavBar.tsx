import {
    WebCellProps,
    WebCellElement,
    component,
    mixin,
    watch,
    attribute,
    createCell,
    Fragment
} from 'web-cell';
import { uniqueID } from 'web-utility/source/data';
import classNames from 'classnames';

import { Size, Theme, BackgroundColors } from '../../utility/constant';
import { NavBarToggler } from './Toggler';
import { CollapseBox } from '../../Content/Collapse';

export interface BannerNavBarProps extends WebCellProps {
    narrow?: boolean;
    expand?: false | keyof typeof Size;
    fixed?: 'top' | 'bottom';
    direction?: 'left' | 'right';
    theme?: keyof typeof Theme;
    background?: BackgroundColors;
    brand?: WebCellElement;
    open?: boolean;
}

@component({
    tagName: 'banner-navbar',
    renderTarget: 'children'
})
export class BannerNavBar extends mixin<BannerNavBarProps>() {
    UID = uniqueID();

    @attribute
    @watch
    narrow = false;

    @attribute
    @watch
    fixed = 'top';

    @attribute
    @watch
    direction = 'left';

    @attribute
    @watch
    theme = 'dark';

    @attribute
    @watch
    background = 'dark';

    @attribute
    @watch
    brand = document.title;

    @attribute
    @watch
    open = false;

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

    connectedCallback() {
        this.classList.add('d-block', 'shadow');

        document.body.addEventListener('click', this.outClose);
        self.addEventListener('keydown', this.escapeClose);

        super.connectedCallback();
    }

    disconnectedCallback() {
        document.body.removeEventListener('click', this.outClose);
        self.removeEventListener('keydown', this.escapeClose);
    }

    updatedCallback() {
        const { background, fixed } = this.props;

        this.classList.add(
            `bg-${background}`,
            fixed === 'top' ? 'sticky-top' : 'fixed-bottom'
        );
    }

    render({
        brand,
        open,
        defaultSlot,
        theme,
        narrow,
        direction
    }: BannerNavBarProps) {
        const { UID } = this,
            nav = (
                <Fragment>
                    <a className="navbar-brand" href=".">
                        {brand}
                    </a>
                    <NavBarToggler
                        aria-controls={UID}
                        aria-expanded={open + ''}
                        onClick={() => (this.open = !open)}
                    />
                </Fragment>
            );

        return (
            <Fragment>
                <CollapseBox id={UID} open={open}>
                    {narrow ? (
                        <div className="container">{defaultSlot}</div>
                    ) : (
                        defaultSlot
                    )}
                </CollapseBox>
                <div className={`navbar navbar-${theme}`}>
                    {narrow ? (
                        <div
                            className={classNames(
                                'container',
                                direction !== 'left' && 'flex-row-reverse'
                            )}
                        >
                            {nav}
                        </div>
                    ) : (
                        nav
                    )}
                </div>
            </Fragment>
        );
    }
}
