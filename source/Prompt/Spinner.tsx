import {
    WebCellProps,
    createCell,
    Fragment,
    VNodeChildElement
} from 'web-cell';
import classNames from 'classnames';
import { HTMLProps } from 'web-utility/source/DOM-type';

import { Status, Theme } from '../utility/constant';
import style from './Spinner.less';

export interface SpinnerProps extends HTMLProps, WebCellProps {
    type?: 'border' | 'grow';
    color?: keyof typeof Status | keyof typeof Theme;
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

    const body = (defaultSlot: VNodeChildElement[], hidden?: boolean) => (
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
        <Fragment>
            {body([], true)}
            {defaultSlot}
        </Fragment>
    );
}

export interface SpinnerBoxProps extends SpinnerProps {
    cover: boolean;
}

export function SpinnerBox({
    className,
    cover,
    defaultSlot,
    ...rest
}: SpinnerBoxProps) {
    return (
        <div className={classNames(style['spinner-box'], className)}>
            {defaultSlot}

            <div
                className={classNames(
                    style['spinner-cover'],
                    cover && style['active']
                )}
            >
                <Spinner {...rest} />
            </div>
        </div>
    );
}
