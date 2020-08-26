import {
    WebCellProps,
    VNodeChildElement,
    createCell,
    Fragment
} from 'web-cell';
import classNames from 'classnames';

export interface CardProps extends WebCellProps {
    subtitle?: string;
    text?: string;
    image?: VNodeChildElement;
    header?: VNodeChildElement;
    footer?: VNodeChildElement;
    overlay?: boolean;
    direction?: 'row' | 'column';
}

export function Card({
    className,
    title,
    subtitle,
    text,
    image,
    header,
    footer,
    overlay,
    direction = 'column',
    defaultSlot,
    ...rest
}: CardProps) {
    const column = direction !== 'row',
        banner =
            typeof image !== 'string' ? (
                image
            ) : (
                <img
                    className={'card-img' + (overlay ? '' : '-top')}
                    src={image}
                />
            ),
        body = (
            <div className={'card-' + (overlay ? 'img-overlay' : 'body')}>
                {title && <h5 className="card-title">{title}</h5>}
                {subtitle && (
                    <h6 className="card-subtitle mb-2 text-muted">
                        {subtitle}
                    </h6>
                )}
                {text && <p className="card-text">{text}</p>}
                {defaultSlot}
            </div>
        );

    return (
        <div
            {...rest}
            className={classNames(
                'card',
                !column && 'justify-content-center',
                className
            )}
        >
            {column ? (
                <Fragment>
                    {header && <div className="card-header">{header}</div>}
                    {banner}
                    {body}
                    {footer && (
                        <div className="card-footer text-muted">{footer}</div>
                    )}
                </Fragment>
            ) : (
                <div className="row no-gutters align-items-center">
                    <div className="col-md-4">{banner}</div>
                    <div className="col-md-8">{body}</div>
                </div>
            )}
        </div>
    );
}
