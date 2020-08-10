import { WebCellProps, createCell } from 'web-cell';
import classNames from 'classnames';

import './Image.less';

export interface ImageProps extends WebCellProps {
    src: string | URL;
    alt?: string;
    background?: boolean;
    fluid?: boolean;
    thumbnail?: boolean;
}

export function Image({
    className,
    background,
    src,
    style,
    defaultSlot,
    fluid,
    thumbnail,
    ...rest
}: ImageProps) {
    return background ? (
        <div
            className={classNames('back-image', className)}
            style={{ backgroundImage: `url(${src})`, ...style }}
            {...rest}
        >
            {defaultSlot}
        </div>
    ) : (
        <img
            className={classNames(
                fluid && 'img-fluid',
                thumbnail && 'img-thumbnail',
                className
            )}
            style={style}
            src={src}
            lazyLoad="1"
            loading="lazy"
            {...rest}
        />
    );
}

export function Figure({
    className,
    title,
    defaultSlot,
    ...props
}: ImageProps & WebCellProps) {
    return (
        <figure className={classNames('figure', className)}>
            <Image className="figure-img" fluid {...props} />

            <figcaption className="figure-caption text-center">
                {title}
            </figcaption>
        </figure>
    );
}
