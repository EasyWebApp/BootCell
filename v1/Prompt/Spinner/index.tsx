import { WebCellProps, createCell, Fragment } from 'web-cell';
import classNames from 'classnames';

import { CommonColors } from '../../utility/constant';
import style from './index.less';

export interface SpinnerProps extends WebCellProps {
    type?: 'border' | 'grow';
    color?: CommonColors;
    small?: boolean;
    embed?: boolean;
}

export function Spinner({
    className,
    type = 'border',
    color,
    small,
    defaultSlot,
    embed,
    ...rest
}: SpinnerProps) {
    const scope = `spinner-${type}`;

    defaultSlot = defaultSlot[0]
        ? defaultSlot
        : [<span className="sr-only">Loading...</span>];

    const body = (
        defaultSlot: WebCellProps['defaultSlot'],
        hidden?: boolean
    ) => (
        <div
            {...rest}
            className={classNames(
                scope,
                color && `text-${color}`,
                small && `${scope}-sm`,
                className
            )}
            role="status"
            aria-hidden={!!hidden + ''}
        >
            {defaultSlot}
        </div>
    );

    return !embed ? (
        body(defaultSlot)
    ) : (
        <>
            {body([], true)}
            {defaultSlot}
        </>
    );
}

export interface SpinnerBoxProps extends SpinnerProps {
    cover: boolean;
}

export function SpinnerBox({
    className,
    style: styles,
    cover,
    defaultSlot,
    ...rest
}: SpinnerBoxProps) {
    return (
        <div
            className={classNames(style['spinner-box'], className)}
            style={styles}
        >
            {defaultSlot}

            <div
                className={classNames(
                    style['spinner-cover'],
                    cover && style.active
                )}
            >
                <Spinner {...rest} />
            </div>
        </div>
    );
}
