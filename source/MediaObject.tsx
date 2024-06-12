import { FC, WebCellProps } from 'web-cell';
import { JsxChildren } from 'dom-renderer';
import classNames from 'classnames';

export interface MediaObjectProps extends WebCellProps {
    listItem?: boolean;
    title: string;
    image: JsxChildren;
    imageRow?: 'start' | 'center' | 'end';
    imageColumn?: 'start' | 'end';
}

export const MediaObject: FC<MediaObjectProps> = ({
    className,
    listItem,
    title,
    image,
    imageRow = 'start',
    imageColumn = 'start',
    defaultSlot,
    ...rest
}) => {
    const start = imageColumn === 'start';
    const Tag = listItem ? 'li' : 'div',
        Class = classNames('d-flex', !start && 'flex-row-reverse', className);
    const body = (
        <>
            <div className="flex-shrink-0">
                {typeof image === 'string' ? (
                    <img
                        className={`align-self-${imageRow}`}
                        style={{ width: '4rem' }}
                        src={image}
                        alt={title}
                    />
                ) : (
                    image
                )}
            </div>
            <div className={`flex-grow-1 ${start ? 'ms-3' : 'me-3'}`}>
                <h5 className="mt-0">{title}</h5>
                {defaultSlot}
            </div>
        </>
    );

    return (
        <Tag {...rest} className={Class}>
            {body}
        </Tag>
    );
};
