import { WebCellProps, createCell } from 'web-cell';

import { BGIcon } from '../../Reminder';

import { ContentMeta, VendorName, URI_map } from './data';
import style from './index.less';

const shareAPI = 'share' in self.navigator;

export interface ShareBarProps extends WebCellProps, ContentMeta {
    targets?: VendorName[];
    direction?: 'row' | 'column';
}

export function ShareBar({
    targets = Object.keys(URI_map) as VendorName[],
    direction = 'row',
    defaultSlot,
    URL: path = self.location.href,
    title = document.title,
    summary = document.querySelector<HTMLMetaElement>(
        'meta[name="description"]'
    )?.content,
    ...meta
}: ShareBarProps) {
    (meta.source = meta.source || new URL(path).origin),
        (meta.description = meta.description || summary);

    return (
        <aside className={`d-inline-flex flex-${direction}`}>
            {targets.map(name => {
                // @ts-ignore
                const { getURI, icon, color } = URI_map[name] || {};

                const URI =
                    getURI?.({ URL: path, title, summary, ...meta }) ||
                    'javascript: ;';

                return (
                    <a
                        className={style.box}
                        target="_blank"
                        href={URI}
                        style={icon ? {} : { color }}
                    >
                        {icon ? (
                            <span
                                className={style.icon}
                                style={{ background: color }}
                            >
                                {icon}
                            </span>
                        ) : (
                            <BGIcon
                                type="circle"
                                group="brands"
                                name={name.toLowerCase()}
                            />
                        )}
                        {!URI.startsWith('data:') ? null : <img src={URI} />}
                    </a>
                );
            })}
            {!shareAPI ? null : (
                <button
                    className={style.box}
                    onClick={() =>
                        // @ts-ignore
                        navigator.share({
                            url: path,
                            title,
                            text: summary
                        })
                    }
                >
                    <BGIcon type="circle" name="ellipsis-h" color="secondary" />
                </button>
            )}
        </aside>
    );
}
