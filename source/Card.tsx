import { createCell } from 'web-cell';
import classNames from 'classnames';

interface CardWrapperProps {
    direction?: 'horizontal' | 'vertical';
    left: any;
    right: any;
}

function CardWrapper({
    direction = 'vertical',
    left,
    right
}: CardWrapperProps) {
    return direction === 'vertical' ? (
        [].concat(left, right)
    ) : (
        <div class="row no-gutters align-items-center">
            <div class="col-sm-4">{left}</div>
            <div class="col-sm-8">{right}</div>
        </div>
    );
}

interface CardProps {
    className?: string;
    title: string;
    text?: string;
    image?: any;
    direction?: CardWrapperProps['direction'];
    children?: any;
}

export function Card({
    className = '',
    title,
    text,
    image,
    direction,
    children
}: CardProps) {
    return (
        <div className={classNames('card', className)}>
            <CardWrapper
                direction={direction}
                left={
                    typeof image !== 'string' ? (
                        image
                    ) : (
                        <img className="card-img-top" src={image} />
                    )
                }
                right={
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        {text && <p className="card-text">{text}</p>}
                        {children}
                    </div>
                }
            />
        </div>
    );
}
