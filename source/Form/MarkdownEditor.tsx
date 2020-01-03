import { component, mixin } from 'web-cell';
import * as MarkdownIME from 'markdown-ime';
import marked from 'marked';
import { parseDOM, insertToCursor } from '../utility';

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

        if (list.find(({ type }) => /xml|html/.test(type)))
            list = list.filter(({ type }) => type !== 'text/plain');

        const parts = await Promise.all(
            list.map((item: DataTransferItem) => {
                if (item.kind === 'string')
                    return new Promise(resolve =>
                        item.getAsString(raw => resolve(marked(raw)))
                    );

                const file = item.getAsFile();

                if (file) {
                    const src = URL.createObjectURL(file);

                    switch (item.type.split('/')[0]) {
                        case 'image':
                            return `<img src=${src}>`;
                        case 'audio':
                            return `<audio src=${src}></audio>`;
                        case 'video':
                            return `<video src=${src}></video>`;
                    }
                }
                return '';
            })
        );

        insertToCursor(...parseDOM(parts.filter(Boolean).join('\n')));

        for (const paragraph of Array.from(this.querySelectorAll('p p')))
            paragraph.replaceWith(...Array.from(paragraph.childNodes));
    };

    get files() {
        return Array.from(
            this.querySelectorAll('img[src], audio[src], video[src]'),
            ({ src }: HTMLImageElement) => src.startsWith('blob:') && src
        ).filter(Boolean);
    }
}
