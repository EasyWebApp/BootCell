import { createCell } from 'web-cell';
import { HTMLProps } from 'web-utility/source/DOM-type';
import classNames from 'classnames';

export interface IFrameProps extends HTMLProps {
    src: string;
}

export function IFrame({ className, style, ...props }: IFrameProps) {
    return (
        <iframe
            className={classNames('w-100', 'border-0', className)}
            style={{ height: '50vh', ...style }}
            lazyLoad="1"
            loading="lazy"
            {...props}
        />
    );
}
