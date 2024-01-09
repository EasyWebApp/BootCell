import { WebCellProps, WebCellElement, createCell } from 'web-cell';
import classNames from 'classnames';

import './index.less';

export interface ImageProps extends WebCellProps {
    src: string;
    alt?: string;
    background?: boolean;
    caption?: WebCellElement;
    fluid?: boolean;
    thumbnail?: boolean;
}

export function Image({
    className,
    background,
    caption,
    src,
    style,
    defaultSlot,
    fluid,
    thumbnail,
    ...rest
}: ImageProps) {
    const image = background ? (
        <div
            className={classNames(
                'back-image',
                caption ? 'figure-img' : className
            )}
            style={{ backgroundImage: `url(${src})`, ...style }}
            {...rest}
        >
            {defaultSlot}
        </div>
    ) : (
        <img
            className={classNames(
                (fluid || caption) && 'img-fluid',
                thumbnail && 'img-thumbnail',
                caption ? 'figure-img' : className
            )}
            style={style}
            src={src}
            // @ts-ignore
            lazyLoad="1"
            loading="lazy"
            {...rest}
        />
    );

    return caption ? (
        <figure className={classNames('figure', className)}>
            {image}
            <figcaption className="figure-caption text-center">
                {caption}
            </figcaption>
        </figure>
    ) : (
        image
    );
}
