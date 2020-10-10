import { createCell } from 'web-cell';
import { HTMLProps } from 'web-utility/source/DOM-type';
import classNames from 'classnames';

export interface EmbedProps extends HTMLProps {
    is: 'iframe' | 'video' | 'audio' | 'embed';
    src: string;
    ratio?: '21/9' | '16/9' | '4/3' | '1/1';
}

export function Embed({
    ratio = '16/9',
    className,
    style,
    id,
    title,
    is: Tag,
    ...props
}: EmbedProps) {
    props =
        Tag === 'iframe'
            ? {
                  lazyLoad: '1',
                  loading: 'lazy',
                  ...props
              }
            : props;

    return (
        <div
            className={classNames(
                'embed-responsive',
                'embed-responsive-' + ratio.replace('/', 'by'),
                className
            )}
            {...{ style, id, title }}
        >
            <Tag className="embed-responsive-item" {...props} />
        </div>
    );
}
