import classNames from 'classnames';
import { FC, WebCellProps } from 'web-cell';

import { Size } from '../type';

export interface ContainerProps extends WebCellProps {
    fluid?: boolean | Size;
}

export const Container: FC<ContainerProps> = ({
    className = '',
    fluid,
    children,
    ...props
}) => (
    <div
        className={
            fluid === true
                ? `container-fluid ${className}`
                : `${fluid ? `${fluid === 'xxl' ? '2xl' : fluid}:container` : 'container'} ${className}`
        }
        {...props}
    >
        {children}
    </div>
);

export type RowProps = Partial<Record<'xs' | Size, number | 'auto'>> &
    WebCellProps;

export const Row: FC<RowProps> = ({
    className,
    xs,
    sm,
    md,
    lg,
    xl,
    xxl,
    children,
    ...props
}) => {
    const columnClass = xs
        ? `row-cols-${xs}`
        : sm
          ? `sm:row-cols-${sm}`
          : md
            ? `md:row-cols-${md}`
            : lg
              ? `lg:row-cols-${lg}`
              : xl
                ? `xl:row-cols-${xl}`
                : xxl && `2xl:row-cols-${xxl}`;

    return (
        <div className={classNames('row', columnClass, className)} {...props}>
            {children}
        </div>
    );
};

export type ColProps = RowProps;

export const Col: FC<ColProps> = ({
    className,
    xs,
    sm,
    md,
    lg,
    xl,
    xxl,
    children,
    ...props
}) => {
    const columnClass = xs
        ? `col-${xs}`
        : sm
          ? `sm:col-${sm}`
          : md
            ? `md:col-${md}`
            : lg
              ? `lg:col-${lg}`
              : xl
                ? `xl:col-${xl}`
                : xxl && `2xl:col-${xxl}`;

    return (
        <div className={classNames('col', columnClass, className)} {...props}>
            {children}
        </div>
    );
};
