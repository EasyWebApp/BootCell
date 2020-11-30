import { component, mixin, attribute, watch, createCell } from 'web-cell';
import { BaseFieldProps } from 'web-utility/source/DOM-type';
import className from 'classnames';

import style from './FileInput.less';

export interface FileInputProps extends BaseFieldProps {
    accept?: string;
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
                <input
                    type="file"
                    name={empty ? name : undefined}
                    required={!value && required}
                    accept={accept}
                    onChange={this.handleChange}
                />
                {empty ? null : (
                    <input type="hidden" name={name} value={value} />
                )}
            </div>
        );
    }
}
