import { WebCellProps, createCell, Fragment } from 'web-cell';
import { HTMLProps } from 'web-utility/source/DOM-type';
import classNames from 'classnames';

export interface JumbotronProps extends WebCellProps, HTMLProps {
    fluid?: boolean;
    title: string;
    description: string;
}

export function Jumbotron({
    className,
    fluid,
    title,
    description,
    defaultSlot
}: JumbotronProps) {
    const content = (
        <Fragment>
            <h1 className="display-4">{title}</h1>
            <p className="lead">{description}</p>

            {defaultSlot[0] && (
                <Fragment>
                    <hr className="my-4" />
                    {defaultSlot}
                </Fragment>
            )}
        </Fragment>
    );

    return (
        <header
            className={classNames(
                'jumbotron',
                fluid && 'jumbotron-fluid',
                className
            )}
        >
            {fluid ? <div className="container">{content}</div> : content}
        </header>
    );
}
