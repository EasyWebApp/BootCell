import classNames from 'classnames';
import { JsxChildren } from 'dom-renderer';
import { FC } from 'web-cell';

import { BackgroundColor, backgroundClassName } from '../type';
import { Container, ContainerProps } from '../Layout/Grid';

export interface JumbotronProps
    extends Omit<ContainerProps, 'title'>,
        Record<'title' | 'description', JsxChildren> {
    bg?: BackgroundColor;
    rounded?: 0 | 1 | 2 | 3 | 4 | 5;
}

export const Jumbotron: FC<JumbotronProps> = ({
    fluid,
    className = `py-12 ${fluid ? '' : 'px-12'}`,
    bg = 'body-tertiary',
    rounded = fluid ? 0 : 3,
    title,
    description,
    children,
    ...props
}) => (
    <header
        className={classNames(
            bg && backgroundClassName(bg),
            rounded != null && `rounded-${rounded ? rounded + 2 : 0}`,
            className
        )}
        {...props}
    >
        <Container fluid={fluid}>
            <h1 className="fs-5xl fw-light">{title}</h1>

            <p className="fs-lg fw-light">{description}</p>

            {children && (
                <>
                    <hr className="my-7" />
                    {children}
                </>
            )}
        </Container>
    </header>
);
