import { createCell, mixin, attribute, watch, component } from 'web-cell';
import className from 'classnames';

import style from './FileInput.less';

export interface FileInputProps {
    name?: string;
    required?: boolean;
    accept?: string;
    value?: string;
    fileName?: string;
}

@component({
    tagName: 'file-input',
    renderTarget: 'children'
})
export class FileInput extends mixin<FileInputProps>() {
    @attribute
    @watch
    name = '';

    @attribute
    @watch
    required = false;

    @attribute
    @watch
    accept = '*/*';

    @watch
    value = '';

    @watch
    fileName = '';

    handleChange = (event: Event) => {
        const { files } = event.target as HTMLInputElement;

        if (files && files[0])
            (this.value = URL.createObjectURL(files[0])),
                (this.fileName = files[0].name);
    };

    render({ name, required, accept, value, fileName }: FileInputProps) {
        const empty = !value || value.startsWith('blob:');

        return (
            <div
                className={className(style.fileBox, value && style.active)}
                style={{ backgroundImage: value && `url(${value})` }}
                title={fileName}
            >
                {empty ? null : (
                    <input type="hidden" name={name} value={value} />
                )}
                <input
                    type="file"
                    name={empty ? name : undefined}
                    required={!value && required}
                    accept={accept}
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}
