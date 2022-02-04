import { WebCellProps, createCell, Fragment } from 'web-cell';
import classNames from 'classnames';

export interface JumbotronProps extends WebCellProps {
    fluid?: boolean;
    title: string;
    description: string;
}

export function Jumbotron({
    className,
    fluid,
    title,
    description,
    defaultSlot,
    ...rest
}: JumbotronProps) {
    const content = (
        <>
            <h1 className="display-4">{title}</h1>
            <p className="lead">{description}</p>

            {defaultSlot[0] && (
                <>
                    <hr className="my-4" />
                    {defaultSlot}
                </>
            )}
        </>
    );

    return (
        <header
            className={classNames(
                'bg-light mb-4 py-5',
                fluid ? 'rounded-0' : 'px-5 rounded-3',
                className
            )}
            {...rest}
        >
            {fluid ? <div className="container">{content}</div> : content}
        </header>
    );
}
