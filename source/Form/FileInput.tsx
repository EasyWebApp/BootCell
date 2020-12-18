import {
    WebFieldProps,
    component,
    mixinForm,
    attribute,
    watch,
    createCell
} from 'web-cell';

import style from './FileInput.less';

export interface FileInputProps extends WebFieldProps {
    accept?: string;
}

@component({
    tagName: 'file-input',
    style: {
        'input[type="file"]': {
            position: 'absolute',
            width: '100%',
            height: '100%',
            opacity: '0'
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

    get files() {
        return (this.shadowRoot.lastElementChild as HTMLInputElement).files;
    }

    handleChange = (event: Event) => {
        const { files } = event.target as HTMLInputElement;

        if (files && files[0])
            (this.value = URL.createObjectURL(files[0])),
                (this.title = files[0].name);
    };

    connectedCallback() {
        this.classList.add(style.fileBox);
    }

    updatedCallback() {
        const { value } = this.props;

        this.classList.toggle(style.active, !!value);
        this.style.backgroundImage = value && `url(${value})`;
    }

    render({ accept }: FileInputProps) {
        return (
            <input type="file" accept={accept} onChange={this.handleChange} />
        );
    }
}
