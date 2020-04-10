import { WebCellProps, createCell } from 'web-cell';
import { HTMLProps } from 'web-utility/source/DOM-type';

import { BGIcon } from '../../Reminder';

import { ContentMeta, VendorName, URI_map } from './data';
import style from './index.less';

export interface ShareBarProps extends HTMLProps, WebCellProps, ContentMeta {
    targets?: VendorName[];
    direction?: 'row' | 'column';
}

export function ShareBar({
    targets = Object.keys(URI_map) as VendorName[],
    direction = 'row',
    defaultSlot,
    ...meta
}: ShareBarProps) {
    return (
        <aside className={`d-inline-flex flex-${direction}`}>
            {targets.map(name => {
                // @ts-ignore
                const { getURI, icon, color } = URI_map[name] || {};

                const URI = getURI?.(meta) || 'javascript: ;';

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
        </aside>
    );
}
