import { createCell } from 'web-cell';

interface MediaItemProps {
    className?: string;
    title: string;
    image: string | URL;
    imageRow?: 'start' | 'center' | 'end';
    imageColumn?: 'left' | 'right';
    children?: any[];
}

export function MediaItem({
    className = '',
    title,
    image,
    imageRow = 'start',
    imageColumn = 'left',
    children
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
                {children}
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
