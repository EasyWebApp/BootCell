import { WebCellProps, createCell } from 'web-cell';
import classNames from 'classnames';

export interface EmbedProps extends WebCellProps {
    is: 'iframe' | 'video' | 'audio' | 'embed';
    src: string;
    ratio?: '21/9' | '16/9' | '4/3' | '1/1';
    hoverPlay?: boolean;
}

export function Embed({
    ratio = '16/9',
    className,
    style,
    id,
    title,
    is: Tag,
    hoverPlay,
    key,
    defaultSlot,
    ...props
}: EmbedProps) {
    props =
        Tag === 'iframe'
            ? {
                  lazyLoad: '1',
                  loading: 'lazy',
                  ...props
              }
            : (Tag === 'video' || Tag === 'audio') && hoverPlay
            ? {
                  muted: true,
                  onMouseEnter: ({ target }: MouseEvent) =>
                      (target as HTMLVideoElement | HTMLAudioElement).play(),
                  onMouseLeave: ({ target }: MouseEvent) =>
                      (target as HTMLVideoElement | HTMLAudioElement).pause(),
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
            {...{ style, id, title, key }}
        >
            <Tag className="embed-responsive-item" {...props} />
        </div>
    );
}
