import classNames from 'classnames';
import { FC, WebCellProps } from 'web-cell';

export type BreadcrumbProps = WebCellProps;

export const BreadCrumb: FC<BreadcrumbProps> = ({ children, ...props }) => (
    <nav {...props}>
        <ol className="breadcrumb">{children}</ol>
    </nav>
);

export interface BreadcrumbItemProps extends WebCellProps<HTMLAnchorElement> {
    active?: boolean;
}

export const BreadcrumbItem: FC<BreadcrumbItemProps> = ({
    className = '',
    href,
    target,
    active,
    children,
    ...props
}) => (
    <li
        className={classNames('breadcrumb-item', { active }, className)}
        ariaCurrent={active ? 'page' : undefined}
        {...props}
    >
        {active ? children : <a {...{ href, target }}>{children}</a>}
    </li>
);
