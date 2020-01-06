import { component, mixin } from 'web-cell';
import * as MarkdownIME from 'markdown-ime';
import marked from 'marked';

import { parseDOM, insertToCursor } from '../utility';
import { SafeTurnDown } from '../utility/TurnDown';

const parser = new SafeTurnDown();

@component({
    tagName: 'markdown-editor',
    renderTarget: 'children'
})
export class MarkdownEditor extends mixin() {
    private core: any;

    connectedCallback() {
        this.classList.add('form-control', 'markdown-body', 'h-auto');
        // @ts-ignore
        this.style.minHeight = '2.3rem';
        // @ts-ignore
        this.contentEditable = true;
        // @ts-ignore
        this.core = MarkdownIME.Enhance(this);

        this.addEventListener('paste', this.handleOuterData),
            this.addEventListener('drop', this.handleOuterData);
    }

    handleOuterData = async (event: DragEvent & ClipboardEvent) => {
        const { items } = event.dataTransfer || event.clipboardData;

        if (!items[0]) return;

        event.preventDefault();

        var list: DataTransferItem[] = Array.from(items);

        if (list.find(({ type }) => /xml|html/.test(type))) {
            list = list.filter(({ type }) => type !== 'text/plain');

            if (list[1])
                list = list.filter(({ type }) => !/xml|html/.test(type));
        }

        const parts = await Promise.all(
            list.map((item: DataTransferItem) => {
                if (item.kind === 'string')
                    return new Promise(resolve =>
                        item.getAsString(raw => resolve(marked(raw)))
                    );

                const file = item.getAsFile();

                if (file) {
                    const src = URL.createObjectURL(file);
                    const data = `title="${file.name}" src="${src}"`;

                    switch (item.type.split('/')[0]) {
                        case 'image':
                            return `<img ${data}>`;
                        case 'audio':
                            return `<audio ${data}></audio>`;
                        case 'video':
                            return `<video ${data}></video>`;
                    }
                }
                return '';
            })
        );

        insertToCursor(...parseDOM(parts.filter(Boolean).join('\n')));

        for (const paragraph of Array.from(this.querySelectorAll('p p')))
            paragraph.replaceWith(...Array.from(paragraph.childNodes));
    };

    set value(raw: string) {
        this.innerHTML = marked(raw);
    }

    get value() {
        return parser.turndown(this.innerHTML);
    }

    get files() {
        return Array.from(
            this.querySelectorAll('img[src], audio[src], video[src]'),
            ({ src, title }: HTMLImageElement) =>
                src.startsWith('blob:') && { name: title, URI: src }
        ).filter(Boolean);
    }
}
