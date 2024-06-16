import classNames from 'classnames';
import { FC, WebCellProps } from 'web-cell';

export type ImageProps = WebCellProps<HTMLImageElement> &
    Partial<
        Record<'fluid' | 'rounded' | 'roundedCircle' | 'thumbnail', boolean>
    >;

export const Image: FC<ImageProps> = ({
    className,
    fluid,
    rounded,
    roundedCircle,
    thumbnail,
    ...props
}) => (
    <img
        className={classNames(
            fluid && 'img-fluid',
            thumbnail && `img-thumbnail`,
            { rounded },
            roundedCircle && 'rounded-circle',
            className
        )}
        {...props}
    />
);
