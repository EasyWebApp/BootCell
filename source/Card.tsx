import classNames from 'classnames';
import { FC, WebCellProps } from 'web-cell';

import { Image, ImageProps } from './Image';
import { TextColor, PositionY } from './type';

export interface CardProps extends WebCellProps<HTMLDivElement> {
    bg?: TextColor;
    text?: TextColor | 'white' | 'muted';
    border?: TextColor;
    body?: boolean;
}

export const Card: FC<CardProps> = ({
    className,
    bg,
    text,
    border,
    body,
    children,
    ...props
}) => (
    <div
        className={classNames(
            'card',
            bg && `text-bg-${bg}`,
            text && `text-${text}`,
            border && `border-${border}`,
            className
        )}
        {...props}
    >
        {body ? <CardBody>{children}</CardBody> : children}
    </div>
);

export const CardHeader: FC<WebCellProps<HTMLDivElement>> = ({
    className = '',
    children,
    ...props
}) => (
    <div className={`card-header ${className}`} {...props}>
        {children}
    </div>
);

export const CardBody: FC<WebCellProps<HTMLDivElement>> = ({
    className = '',
    children,
    ...props
}) => (
    <div className={`card-body ${className}`} {...props}>
        {children}
    </div>
);

export const CardFooter: FC<WebCellProps<HTMLDivElement>> = ({
    className = '',
    children,
    ...props
}) => (
    <div className={`card-footer ${className}`} {...props}>
        {children}
    </div>
);

export const CardTitle: FC<WebCellProps<HTMLHeadingElement>> = ({
    className = '',
    children,
    ...props
}) => (
    <h5 className={`card-title ${className}`} {...props}>
        {children}
    </h5>
);

export interface CardImgProps extends ImageProps {
    variant?: PositionY;
}

export const CardImg: FC<CardImgProps> = ({
    className = '',
    variant,
    ...props
}) => (
    <Image
        className={`card-img${variant ? `-${variant}` : ''} ${className}`}
        {...props}
    />
);
