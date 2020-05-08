import {
    WebCellProps,
    VNodeChildElement,
    createCell,
    Fragment
} from 'web-cell';
import { HTMLHyperLinkProps } from 'web-utility/source/DOM-type';
import classNames from 'classnames';

export interface CardProps extends HTMLHyperLinkProps, WebCellProps {
    subtitle?: string;
    text?: string;
    image?: VNodeChildElement;
    header?: VNodeChildElement;
    footer?: VNodeChildElement;
    overlay?: boolean;
    direction?: 'horizontal' | 'vertical';
}

export function Card({
    className,
    title,
    href,
    subtitle,
    text,
    image,
    header,
    footer,
    overlay,
    direction = 'vertical',
    defaultSlot,
    ...rest
}: CardProps) {
    const vertical = direction === 'vertical',
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

    defaultSlot = vertical ? (
        <Fragment>
            {header && <div className="card-header">{header}</div>}
            {banner}
            {body}
            {footer && <div className="card-footer text-muted">{footer}</div>}
        </Fragment>
    ) : (
        <div className="row no-gutters align-items-center">
            <div className="col-sm-4">{banner}</div>
            <div className="col-sm-8">{body}</div>
        </div>
    );

    const Class = classNames(
        'card',
        !vertical && 'justify-content-center',
        className
    );

    return href ? (
        <a
            {...rest}
            className={classNames(Class, 'text-decoration-none')}
            href={href}
        >
            {defaultSlot}
        </a>
    ) : (
        <div {...rest} className={Class}>
            {defaultSlot}
        </div>
    );
}
