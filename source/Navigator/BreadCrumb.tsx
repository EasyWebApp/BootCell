import { createCell } from 'web-cell';
import { HTMLHyperLinkProps } from '../utility';

export interface BreadcrumbProps {
    path: HTMLHyperLinkProps[];
}

export function BreadCrumb({ path }: BreadcrumbProps) {
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                {path.map(({ title, ...rest }, index, { length }) =>
                    index + 1 === length ? (
                        <li
                            className="breadcrumb-item active"
                            aria-current="page"
                        >
                            {title}
                        </li>
                    ) : (
                        <li className="breadcrumb-item">
                            <a {...rest}>{title}</a>
                        </li>
                    )
                )}
            </ol>
        </nav>
    );
}
