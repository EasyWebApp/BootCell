import classNames from 'classnames';
import { JsxChildren } from 'dom-renderer';
import { FC, WebCellProps } from 'web-cell';

import { BackgroundColor } from './type';
import { Container, ContainerProps } from './Grid';

export interface JumbotronProps
    extends Omit<ContainerProps, 'title'>,
        Record<'title' | 'description', JsxChildren> {
    bg?: BackgroundColor;
    rounded?: 0 | 1 | 2 | 3 | 4 | 5;
}

export const Jumbotron: FC<JumbotronProps> = ({
    className,
    fluid,
    bg = 'body-tertiary',
    rounded = fluid ? 0 : 3,
    title,
    description,
    children,
    ...props
}) => {
    const content = (
        <>
            <h1 className="display-4">{title}</h1>

            <p className="lead">{description}</p>

            {children && (
                <>
                    <hr className="my-4" />
                    {children}
                </>
            )}
        </>
    );

    return (
        <header
            className={classNames(
                'py-5',
                !fluid && 'px-5',
                bg && `bg-${bg}`,
                rounded && `rounded-${rounded}`,
                className
            )}
            {...props}
        >
            {fluid ? <Container fluid={fluid}>{content}</Container> : content}
        </header>
    );
};
