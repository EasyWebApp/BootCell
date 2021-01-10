import {
    WebCellProps,
    VNodeChildElement,
    createCell,
    Fragment
} from 'web-cell';
import classNames from 'classnames';

export interface MediaObjectProps extends WebCellProps {
    listItem?: boolean;
    title: string;
    image: string | VNodeChildElement;
    imageRow?: 'start' | 'center' | 'end';
    imageColumn?: 'left' | 'right';
}

export function MediaObject({
    className,
    listItem,
    title,
    image,
    imageRow = 'start',
    imageColumn = 'left',
    defaultSlot,
    ...rest
}: MediaObjectProps) {
    const left = imageColumn === 'left';

    const Class = classNames('media', !left && 'flex-row-reverse', className),
        body = (
            <Fragment>
                {typeof image === 'string' ? (
                    <img
                        className={`align-self-${imageRow} ${
                            left ? 'mr-3' : 'ml-3'
                        }`}
                        style={{ width: '4rem' }}
                        src={image}
                        alt={title}
                    />
                ) : (
                    image
                )}
                <div className="media-body">
                    <h5 className="mt-0">{title}</h5>
                    {defaultSlot}
                </div>
            </Fragment>
        );

    return listItem ? (
        <li {...rest} className={Class}>
            {body}
        </li>
    ) : (
        <div {...rest} className={Class}>
            {body}
        </div>
    );
}
