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
        className={`container${
            fluid === true ? '-fluid' : fluid ? `-${fluid}` : ''
        } ${className}`}
        {...props}
    >
        {children}
    </div>
);

export type RowProps = Record<'xs' | Size, number | 'auto'> & WebCellProps;

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
    const size = xs || sm || md || lg || xl || xxl;
    const columnClass = size
        ? `row-cols${
              xs
                  ? ''
                  : sm
                    ? '-sm'
                    : md
                      ? '-md'
                      : lg
                        ? '-lg'
                        : xl
                          ? '-xl'
                          : xxl && '-xxl'
          }-${size}`
        : '';

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
    const size = xs || sm || md || lg || xl || xxl;
    const columnClass = size
        ? `col${
              xs
                  ? ''
                  : sm
                    ? '-sm'
                    : md
                      ? '-md'
                      : lg
                        ? '-lg'
                        : xl
                          ? '-xl'
                          : xxl && '-xxl'
          }-${size}`
        : '';

    return (
        <div className={classNames('col', columnClass, className)} {...props}>
            {children}
        </div>
    );
};
