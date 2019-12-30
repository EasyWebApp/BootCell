import { createCell, VNodeChildElement } from 'web-cell';
import classNames from 'classnames';
import { HTMLProps } from '../utility';

export interface MediaItemProps extends HTMLProps {
    title: string;
    image: string | URL | VNodeChildElement;
    imageRow?: 'start' | 'center' | 'end';
    imageColumn?: 'left' | 'right';
    defaultSlot?: any[];
}

export function MediaItem({
    className = '',
    title,
    image,
    imageRow = 'start',
    imageColumn = 'left',
    defaultSlot,
    ...rest
}: MediaItemProps) {
    const left = imageColumn === 'left';

    return (
        <section
            {...rest}
            className={classNames(
                'media',
                className,
                !left && 'flex-row-reverse'
            )}
        >
            {typeof image === 'string' || image instanceof URL ? (
                <img
                    src={image}
                    className={`align-self-${imageRow} ${
                        left ? 'mr-3' : 'ml-3'
                    }`}
                    alt={title}
                />
            ) : (
                image
            )}
            <div className="media-body">
                <h5 className="mt-0">{title}</h5>
                {defaultSlot}
            </div>
        </section>
    );
}
