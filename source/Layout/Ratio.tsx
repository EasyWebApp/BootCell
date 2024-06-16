import classNames from 'classnames';
import { FC, WebCellProps } from 'web-cell';

export interface RatioProps extends WebCellProps<HTMLDivElement> {
    aspectRatio?: number | '1x1' | '4x3' | '16x9' | '21x9';
}

export const Ratio: FC<RatioProps> = ({
    className,
    style,
    aspectRatio = '1x1',
    children,
    ...props
}) => (
    <div
        className={classNames(
            'ratio',
            typeof aspectRatio === 'string' && `ratio-${aspectRatio}`,
            className
        )}
        style={{
            ...style,
            ...(typeof aspectRatio === 'number'
                ? { '--bs-aspect-ratio': `${aspectRatio * 100}%` }
                : null)
        }}
        {...props}
    >
        {children}
    </div>
);
