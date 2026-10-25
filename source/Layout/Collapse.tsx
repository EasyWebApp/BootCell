import classNames from 'classnames';
import { FC, WebCellProps } from 'web-cell';

export interface CollapseProps extends WebCellProps<HTMLElement> {
    dimension?: 'width' | 'height' | (() => 'width' | 'height');
    in?: boolean;
    onEntered?: (element: HTMLElement) => void;
    onExited?: (element: HTMLElement) => void;
}

export const Collapse: FC<CollapseProps> = ({
    className,
    dimension = 'height',
    in: show,
    onEntered,
    onExited,
    onTransitionEnd,
    children,
    ...props
}) => (
    <div
        className={classNames(
            'collapse',
            {
                'collapse-horizontal':
                    (typeof dimension === 'function'
                        ? dimension()
                        : dimension) === 'width',
                show
            },
            className
        )}
        {...props}
        onTransitionEnd={event => {
            onTransitionEnd?.(event);
            if (event.target !== event.currentTarget) return;
            const element = event.currentTarget as HTMLElement;
            (show ? onEntered : onExited)?.(element);
        }}
    >
        {children}
    </div>
);
