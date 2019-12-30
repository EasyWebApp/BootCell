import { createCell, Fragment, VNodeChildElement } from 'web-cell';
import classNames from 'classnames';

import { HTMLProps, Status, Theme } from '../utility';
import style from './Spinner.less';

export interface SpinnerProps extends HTMLProps {
    type?: 'border' | 'grow';
    color?: keyof typeof Status | keyof typeof Theme;
    small?: boolean;
    defaultSlot?: VNodeChildElement[];
    embed?: boolean;
}

export function Spinner({
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
                small && `${scope}-sm`
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

export function SpinnerBox({
    cover,
    defaultSlot,
    ...rest
}: SpinnerProps & { cover: boolean }) {
    return (
        <div className="position-relative">
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
