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
                : `${fluid ? `${fluid}:container` : 'container'} ${className}`
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
    '2xl': twoXL,
    children,
    ...props
}) => {
    const columnClass = classNames(
        xs && `row-cols-${xs}`,
        sm && `sm:row-cols-${sm}`,
        md && `md:row-cols-${md}`,
        lg && `lg:row-cols-${lg}`,
        xl && `xl:row-cols-${xl}`,
        twoXL && `2xl:row-cols-${twoXL}`
    );

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
    '2xl': twoXL,
    children,
    ...props
}) => {
    const columnClass = classNames(
        xs && `col-${xs}`,
        sm && `sm:col-${sm}`,
        md && `md:col-${md}`,
        lg && `lg:col-${lg}`,
        xl && `xl:col-${xl}`,
        twoXL && `2xl:col-${twoXL}`
    );

    return (
        <div className={classNames(columnClass || 'col', className)} {...props}>
            {children}
        </div>
    );
};
