import {
    WebCellProps,
    VNodeChildElement,
    createCell,
    Fragment
} from 'web-cell';
import classNames from 'classnames';

import { NavProps, Nav, isNavLink } from '../Navigator/Nav';

export interface CardHeaderProps extends NavProps {}

export function CardHeader({
    className,
    direction,
    align,
    itemMode,
    itemWidth,
    scrollable,
    background,
    defaultSlot,
    ...rest
}: CardHeaderProps) {
    const tabMode = isNavLink(defaultSlot[0]);

    return (
        <div {...rest} className={classNames('card-header', className)}>
            {!tabMode ? (
                defaultSlot
            ) : (
                <Nav
                    className={`card-header-${itemMode}`}
                    {...{
                        direction,
                        align,
                        itemMode,
                        itemWidth,
                        scrollable,
                        background
                    }}
                >
                    {defaultSlot}
                </Nav>
            )}
        </div>
    );
}

export interface CardFooterProps extends WebCellProps {}

export function CardFooter({
    className,
    defaultSlot,
    ...rest
}: CardFooterProps) {
    return (
        <div
            {...rest}
            className={classNames('card-footer', 'text-muted', className)}
        >
            {defaultSlot}
        </div>
    );
}

export interface CardProps extends WebCellProps {
    subtitle?: string;
    text?: string;
    image?: VNodeChildElement;
    overlay?: boolean;
    direction?: 'row' | 'column';
}

export function Card({
    className,
    title,
    subtitle,
    text,
    image,
    overlay,
    direction = 'column',
    defaultSlot,
    ...rest
}: CardProps) {
    var [header, body, footer] = (defaultSlot as VNodeChildElement[]).reduce(
        ([header, body, footer], node) => {
            if (typeof node === 'object') {
                const { ['card-header']: head, ['card-footer']: foot } =
                    node.data.class || {};

                if (head) header.push(node);
                else if (foot) footer.push(node);
                else body.push(node);
            } else body.push(node);

            return [header, body, footer];
        },
        [[], [], []] as VNodeChildElement[][]
    );

    const column = direction !== 'row',
        banner =
            typeof image !== 'string' ? (
                image
            ) : (
                <img
                    className={'card-img' + (overlay ? '' : '-top')}
                    src={image}
                />
            );
    body = (
        <div className={'card-' + (overlay ? 'img-overlay' : 'body')}>
            {title && <h5 className="card-title">{title}</h5>}
            {subtitle && (
                <h6 className="card-subtitle mb-2 text-muted">{subtitle}</h6>
            )}
            {text && <p className="card-text">{text}</p>}
            {body}
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
                    {header}
                    {banner}
                    {body}
                    {footer}
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
