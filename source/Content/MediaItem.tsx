import { createCell } from 'web-cell';
import { HTMLProps } from '../utility';

export interface MediaItemProps extends HTMLProps {
    title: string;
    image: string | URL;
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
    defaultSlot
}: MediaItemProps) {
    return (
        <section className={`media ${className}`}>
            {imageColumn === 'left' ? (
                <img
                    src={image}
                    className={`align-self-${imageRow} mr-3`}
                    alt={title}
                />
            ) : null}
            <div className="media-body">
                <h5 className="mt-0">{title}</h5>
                {defaultSlot}
            </div>
            {imageColumn === 'right' ? (
                <img
                    src={image}
                    className={`align-self-${imageRow} ml-3`}
                    alt={title}
                />
            ) : null}
        </section>
    );
}
