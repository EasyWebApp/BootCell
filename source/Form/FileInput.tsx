import {
    WebFieldProps,
    WebFieldState,
    component,
    mixinForm,
    attribute,
    watch,
    createCell
} from 'web-cell';

import { FileUploader } from './FileUploader';
import style from './FileInput.less';

export interface FileInputProps extends WebFieldProps {
    accept?: string;
}

@component({
    tagName: 'file-input',
    style: {
        ':host input[type="file"]': {
            position: 'absolute',
            width: '100%',
            height: '100%',
            opacity: '0'
        },
        ':host input[type="file"]:disabled': {
            cursor: 'not-allowed'
        }
    }
})
export class FileInput extends mixinForm<FileInputProps>() {
    get type() {
        return 'file';
    }

    @attribute
    @watch
    accept = '*/*';

    @watch
    value: string;

    get files() {
        return (this.shadowRoot.lastElementChild as HTMLInputElement).files;
    }

    handleChange = (event: Event) => {
        const { files: [file] = [] } = event.target as HTMLInputElement;

        if (!file) return;
        // @ts-ignore
        this.internals.setFormValue(file);
        this.value = URL.createObjectURL(file);
        this.title = file.name;
    };

    connectedCallback() {
        this.classList.add(style.fileBox);

        this.closest<FileUploader>('file-uploader')?.addEventListener(
            'upload',
            ({ detail: { file, path } }) => {
                if (file === this.files[0]) this.value = path;
            }
        );
        super.connectedCallback();
    }

    updatedCallback() {
        const { value } = this.props;

        this.classList.toggle(style.active, !!value);
        this.style.backgroundImage = value && `url(${value})`;
    }

    render({ accept }: FileInputProps, { disabled }: WebFieldState) {
        return (
            <input
                type="file"
                {...{ accept, disabled }}
                onChange={this.handleChange}
            />
        );
    }
}
