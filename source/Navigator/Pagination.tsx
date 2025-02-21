import classNames from 'classnames';
import { FC, WebCellProps } from 'web-cell';
import { buildURLData, parseURLData } from 'web-utility';

import { FormControl } from '../Form/Form';

export interface PaginationProps extends WebCellProps<HTMLDivElement> {
    size?: 'sm' | 'lg';
}

export const Pagination: FC<PaginationProps> = ({
    size,
    children,
    ...props
}) => (
    <nav {...props}>
        <ol className={`m-0 pagination ${size ? `pagination-${size}` : ''}`}>
            {children}
        </ol>
    </nav>
);

export interface PaginationItemProps extends WebCellProps<HTMLLIElement> {
    href?: string;
    active?: boolean;
    disabled?: boolean;
}

export const PaginationItem: FC<PaginationItemProps> = ({
    className,
    href,
    active,
    disabled,
    children,
    ...props
}) => (
    <li
        className={classNames('page-item', { active, disabled }, className)}
        ariaCurrent={active ? 'page' : undefined}
        {...props}
    >
        <a className="page-link" href={href}>
            {children}
        </a>
    </li>
);

export type PageMeta = Record<'pageSize' | 'pageIndex', number>;

export interface PagerProps extends PageMeta {
    pageCount: number;
    onChange?: (meta: PageMeta) => any;
}

export const Pager: FC<PagerProps> = ({
    pageSize,
    pageIndex,
    pageCount,
    onChange
}) => {
    function propsOf(pageIndex = 1) {
        const pagination = { pageSize, pageIndex };

        return {
            href: `?${buildURLData({ ...parseURLData(), ...pagination })}`,
            onClick:
                onChange &&
                ((event: MouseEvent) => {
                    event.preventDefault();

                    onChange(pagination);
                })
        };
    }

    return (
        <form
            className="m-0 d-flex align-items-center gap-2"
            onSubmit={onChange && (event => event.preventDefault())}
        >
            <FormControl
                type="number"
                name="pageSize"
                defaultValue={pageSize}
                min={1}
                required
                onChange={({ currentTarget }) => {
                    const input = currentTarget as HTMLInputElement;
                    input.reportValidity();
                    onChange?.({ pageSize: +input.value, pageIndex });
                }}
            />
            x
            <FormControl
                type="number"
                name="pageIndex"
                defaultValue={pageIndex || 1}
                min={1}
                max={pageCount}
                required
                onChange={({ currentTarget }) => {
                    const input = currentTarget as HTMLInputElement;
                    input.reportValidity();
                    onChange?.({ pageSize, pageIndex: +input.value });
                }}
            />
            <Pagination>
                {pageIndex > 1 && (
                    <PaginationItem {...propsOf(1)}>1</PaginationItem>
                )}
                {pageIndex > 3 && <PaginationItem>...</PaginationItem>}
                {pageIndex > 2 && (
                    <PaginationItem {...propsOf(pageIndex - 1)}>
                        {pageIndex - 1}
                    </PaginationItem>
                )}
                <PaginationItem active>{pageIndex}</PaginationItem>
                {pageCount - pageIndex > 1 && (
                    <PaginationItem {...propsOf(pageIndex + 1)}>
                        {pageIndex + 1}
                    </PaginationItem>
                )}
                {pageCount - pageIndex > 2 && (
                    <PaginationItem>...</PaginationItem>
                )}
                {pageIndex < pageCount && (
                    <PaginationItem {...propsOf(pageCount)}>
                        {pageCount}
                    </PaginationItem>
                )}
            </Pagination>
        </form>
    );
};
