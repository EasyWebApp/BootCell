import { JsxProps } from 'dom-renderer';
import { FC } from 'web-cell';

import { Size } from './type';

export interface ContainerProps extends JsxProps<HTMLDivElement> {
    fluid?: boolean | Size;
}

export const Container: FC<ContainerProps> = ({
    className = '',
    fluid,
    children,
    ...props
}) => (
    <div
        className={`container${
            fluid === true ? '-fluid' : fluid ? `-${fluid}` : ''
        } ${className}`}
        {...props}
    >
        {children}
    </div>
);
