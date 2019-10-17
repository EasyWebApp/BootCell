import { createCell, component, mixin, watch } from 'web-cell';
import classNames from 'classnames';

import { uniqueID } from './utility';

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

interface NavBarProps {
    title: string;
    theme?: string;
    background?: string;
    expand?: string;
    fixed?: string;
    menu?: NavLinkProps[];
}

@component({
    tagName: 'nav-bar',
    renderTarget: 'children'
})
export class NavBar extends mixin<NavBarProps>() {
    @watch
    title = '';

    @watch
    theme = 'dark';

    @watch
    background = 'dark';

    @watch
    expand = 'md';

    @watch
    fixed = 'top';

    @watch
    menu = [];

    @watch
    open = false;

    render() {
        const { title, theme, background, expand, fixed, menu, open } = this,
            UID = uniqueID();

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
                <a
                    target="_top"
                    href="."
                    className="navbar-brand d-flex align-items-center"
                >
                    <strong>{title}</strong>
                </a>
                <button
                    type="button"
                    className="navbar-toggler"
                    aria-controls={UID}
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    onClick={() => (this.open = !this.open)}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <main
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
                </main>
            </header>
        );
    }
}
