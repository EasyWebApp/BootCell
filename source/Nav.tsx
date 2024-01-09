import { JsxProps } from 'dom-renderer';
import { FC } from 'web-cell';

export interface NavLinkProps extends JsxProps<HTMLAnchorElement> {
    active?: boolean;
}

export const NavLink: FC<NavLinkProps> = ({
    className = '',
    active,
    children,
    ...props
}) => (
    <li className="nav-item">
        <a
            className={`nav-link ${active ? 'active' : ''} ${className}`}
            {...props}
        >
            {children}
        </a>
    </li>
);
