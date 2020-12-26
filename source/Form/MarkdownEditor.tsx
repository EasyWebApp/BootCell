import { WebFieldProps, component, mixinForm } from 'web-cell';
import { parseDOM, insertToCursor } from 'web-utility/source/DOM';
import * as MarkdownIME from 'markdown-ime';
import marked from 'marked';

import { SafeTurnDown } from '../utility/TurnDown';
import { FileUploader, UploadEvent } from './FileUploader';

export interface MarkdownEditorProps extends WebFieldProps {}

const parser = new SafeTurnDown(),
    fileMap = new WeakMap<HTMLElement, Map<File, string>>();

@component({
    tagName: 'markdown-editor',
    style: {
        ':host': {
            minHeight: '2.3rem'
        },
        ':host(:disabled)': {
            cursor: 'not-allowed'
        }
    }
})
export class MarkdownEditor extends mixinForm<MarkdownEditorProps>() {
    private core: any;

    connectedCallback() {
        this.classList.add(
            'form-control',
            'markdown-body',
            'h-auto',
            'clearfix',
            'overflow-hidden'
        );
        this.contentEditable = 'true';
        // @ts-ignore
        this.core = MarkdownIME.Enhance(this);
        fileMap.set(this, new Map());

        this.addEventListener('input', this.handleInput);
        this.addEventListener('paste', this.handleOuterData);
        this.addEventListener('drop', this.handleOuterData);

        this.closest<FileUploader>('file-uploader')?.addEventListener(
            'upload',
            this.handleUpload
        );
        super.connectedCallback();
    }

    updatedCallback() {
        const { disabled } = this.state;

        this.contentEditable = !disabled + '';
    }

    handleInput = () => this.internals.setFormValue(this.value);

    handleUpload = ({ detail: { file, path } }: UploadEvent) => {
        const URI = fileMap.get(this).get(file);
        const media = this.querySelector<HTMLImageElement>(`[src="${URI}"]`);

        if (media) media.src = path;
    };

    static filterData(...items: DataTransferItem[]) {
        items = items
            .filter(
                ({ type }) =>
                    !type.startsWith('text/') ||
                    type.includes('html') ||
                    type === 'text/plain'
            )
            .sort((_, { type }) =>
                !type.startsWith('text/') ? 1 : type.includes('html') ? 0 : -1
            );

        return items[0].type.startsWith('text/')
            ? [items[0]]
            : items.filter(({ type }) => !type.startsWith('text/'));
    }

    loadData = (item: DataTransferItem) => {
        const { kind, type } = item;

        if (kind === 'string')
            return new Promise(resolve =>
                item.getAsString(raw =>
                    resolve(type === 'text/plain' ? marked(raw) : raw)
                )
            );
        const file = item.getAsFile();

        if (file) {
            const src = URL.createObjectURL(file);
            fileMap.get(this).set(file, src);

            const data = `title="${file.name}" src="${src}"`;

            switch (type.split('/')[0]) {
                case 'image':
                    return `<img ${data}>`;
                case 'audio':
                    return `<audio ${data}></audio>`;
                case 'video':
                    return `<video ${data}></video>`;
            }
        }
        return '';
    };

    handleOuterData = async (event: DragEvent & ClipboardEvent) => {
        const { items } = event.dataTransfer || event.clipboardData;

        if (!items[0]) return;

        event.preventDefault();

        const list = MarkdownEditor.filterData(...items);

        const parts = await Promise.all(list.map(this.loadData));

        insertToCursor(...parseDOM(parts.filter(Boolean).join('\n')));

        for (const paragraph of this.querySelectorAll('p p'))
            paragraph.replaceWith(...paragraph.childNodes);
    };

    set value(value: string) {
        this.internals.setFormValue(value);
        this.innerHTML = marked(value);
    }

    get value() {
        return parser.turndown(this.innerHTML);
    }

    get files() {
        return [...fileMap.get(this).keys()];
    }
}
