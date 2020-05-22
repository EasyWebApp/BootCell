import { WebCellProps, createCell } from 'web-cell';
import { HTMLProps } from 'web-utility/source/DOM-type';

export interface BackImageProps extends HTMLProps, WebCellProps {
    src: string | URL;
    height?: number | string;
}

export function BackImage({
    src,
    height = '50vh',
    style,
    defaultSlot,
    ...rest
}: BackImageProps) {
    return (
        <div
            style={{
                backgroundImage: `url(${src})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                height,
                ...style
            }}
            {...rest}
        >
            {defaultSlot}
        </div>
    );
}
