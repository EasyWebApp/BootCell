import TurnDown from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

const Empty_HREF = /^(#|javascript:\s*void\(0\);?\s*)$/;

type TurnDownGFM = (td: TurnDown) => void;

export class SafeTurnDown extends TurnDown {
    constructor(options?: any) {
        super({
            headingStyle: 'atx',
            hr: '---',
            bulletListMarker: '-',
            codeBlockStyle: 'fenced',
            linkStyle: 'referenced',
            ...options
        });

        this.use(gfm as TurnDownGFM)
            .addRule('non_url', {
                filter: node =>
                    ['a', 'area'].includes(node.nodeName.toLowerCase()) &&
                    Empty_HREF.test(node.getAttribute('href') || ''),
                replacement: (content, node) =>
                    content.trim() ||
                    (node instanceof HTMLElement ? node.title.trim() : '')
            })
            .addRule('asset_code', {
                filter: ['style', 'script'],
                replacement: () => ''
            });
    }
}
