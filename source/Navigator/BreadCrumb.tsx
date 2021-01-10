import { createCell } from 'web-cell';
import type { HTMLProps, HTMLHyperLinkProps } from 'web-utility';

export interface BreadcrumbProps extends HTMLProps {
    path: HTMLHyperLinkProps[];
}

export function BreadCrumb({ className, path }: BreadcrumbProps) {
    return (
        <nav className={className} aria-label="breadcrumb">
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
