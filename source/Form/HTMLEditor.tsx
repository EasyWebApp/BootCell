import {
    WebFieldProps,
    component,
    mixinForm,
    watch,
    attribute,
    createCell
} from 'web-cell';
import { HTMLTextFieldProps } from 'web-utility/source/DOM-type';
import { importCSS } from 'web-utility/source/DOM';
import Quill, { QuillOptionsStatic } from 'quill';

import './HTMLEditor.less';

export interface HTMLEditorProps extends HTMLTextFieldProps, WebFieldProps {
    theme?: 'bubble' | 'snow';
    options?: QuillOptionsStatic;
    upload?(file: File): Promise<string>;
}

@component({
    tagName: 'html-editor',
    renderTarget: 'children'
})
export class HTMLEditor extends mixinForm<HTMLEditorProps>() {
    get type() {
        return 'textarea';
    }

    @attribute
    @watch
    theme: HTMLEditorProps['theme'] = 'bubble';

    @attribute
    @watch
    readOnly?: boolean;

    @attribute
    @watch
    placeholder?: string;

    @watch
    options?: QuillOptionsStatic;

    @watch
    upload?: HTMLEditorProps['upload'];

    protected box?: Quill;

    @watch
    // @ts-ignore
    set defaultValue(defaultValue: string) {
        this.setProps({ defaultValue }).then(
            () => (this.box.root.innerHTML = defaultValue)
        );
    }
    // @ts-ignore
    set value(value: string) {
        const { box } = this;

        if (!box) return;

        this.internals.setFormValue(value);
        box.root.innerHTML = value;
    }

    get value() {
        return this.box?.root.innerHTML;
    }

    async connectedCallback() {
        await importCSS(
            `https://cdn.jsdelivr.net/npm/quill@1.3.7/dist/quill.${this.theme}.css`
        );
        super.connectedCallback();
    }

    /**
     * @see https://quilljs.com/docs/modules/toolbar/#container
     */
    protected boot = async (node: HTMLElement) => {
        const { theme, readOnly, placeholder, upload, options } = this;

        if (theme === 'snow')
            Quill.register(
                'modules/imageUploader',
                (await import('quill-image-uploader')).default
            );

        this.box = new Quill(node, {
            theme,
            readOnly,
            placeholder,
            modules: {
                toolbar: [
                    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
                    ['blockquote', 'code-block'],

                    [{ header: 1 }, { header: 2 }], // custom button values
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
                    [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
                    [{ direction: 'rtl' }], // text direction

                    [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
                    [{ header: [1, 2, 3, 4, 5, 6, false] }],

                    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
                    [{ font: [] }],
                    [{ align: [] }],

                    ...(theme === 'snow' ? [['image']] : []),

                    ['clean'] // remove formatting button
                ],
                ...(upload && { imageUploader: { upload } })
            },
            ...options
        });

        node.addEventListener('input', () =>
            this.internals.setFormValue(this.value)
        );
    };

    updatedCallback() {
        const { defaultValue } = this.props;

        if (!(defaultValue != null) && this.box)
            return this.setProps({ defaultValue: this.box.root.innerHTML });
    }

    render({ theme, defaultSlot }: HTMLEditorProps) {
        return (
            <div
                className={theme === 'bubble' ? 'form-control p-0' : undefined}
                ref={this.boot}
            >
                {defaultSlot}
            </div>
        );
    }
}
