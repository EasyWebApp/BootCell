import { VNodeChildElement, createCell } from 'web-cell';
import classNames from 'classnames';
import { HTMLHyperLinkProps, HTMLProps, Status, Theme } from '../utility';

interface ListItem extends HTMLHyperLinkProps {
    content?: VNodeChildElement[];
    color?: Status | Theme;
    disabled?: boolean;
}

export interface ListGroupProps extends HTMLProps {
    list: ListItem[];
    activeIndex?: number;
    flush?: boolean;
    horizontal?: boolean | 'sm' | 'md' | 'lg' | 'xl';
}

export function ListGroup({
    className,
    list,
    activeIndex = 0,
    flush,
    horizontal,
    defaultSlot,
    ...rest
}: ListGroupProps) {
    var modeClass = '';

    if (flush) modeClass += 'list-group-flush';
    else if (horizontal) {
        modeClass += 'list-group-horizontal';

        if (typeof horizontal === 'string') modeClass += '-' + horizontal;
    }

    return (
        <div
            {...rest}
            className={classNames('list-group', modeClass, className)}
        >
            {list.map(
                (
                    { title, content, color, disabled, tabIndex, ...rest },
                    index
                ) => (
                    <a
                        {...rest}
                        className={classNames(
                            'list-group-item',
                            'list-group-item-action',
                            color && `list-group-item-${color}`,
                            (!content || typeof content === 'string') &&
                                'text-nowrap',
                            !disabled && index === activeIndex && 'active',
                            disabled && 'disabled'
                        )}
                        tabIndex={disabled ? -1 : tabIndex}
                        aria-disabled={Boolean(disabled) + ''}
                    >
                        {content || title}
                    </a>
                )
            )}
        </div>
    );
}
