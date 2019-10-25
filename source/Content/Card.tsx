import { createCell } from 'web-cell';
import classNames from 'classnames';
import { HTMLProps } from '../utility';

interface CardProps extends HTMLProps {
    title: string;
    text?: string;
    image?: any;
    direction?: 'horizontal' | 'vertical';
    children?: any;
}

export function Card({
    id,
    className = '',
    title,
    text,
    image,
    direction = 'vertical',
    children
}: CardProps) {
    const vertical = direction === 'vertical',
        header =
            typeof image !== 'string' ? (
                image
            ) : (
                <img className="card-img-top" src={image} />
            ),
        body = (
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                {text && <p className="card-text">{text}</p>}
                {children}
            </div>
        );

    return (
        <div
            id={id}
            className={classNames(
                'card',
                !vertical && 'justify-content-center',
                className
            )}
        >
            {vertical ? (
                [header, body]
            ) : (
                <div class="row no-gutters align-items-center">
                    <div class="col-sm-4">{header}</div>
                    <div class="col-sm-8">{body}</div>
                </div>
            )}
        </div>
    );
}
