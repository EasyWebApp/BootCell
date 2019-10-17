import { createCell, mixin, attribute, watch, component } from 'web-cell';
import className from 'classnames';

import style from './FileInput.less';

@component({
    tagName: 'file-input',
    renderTarget: 'children'
})
export class FileInput extends mixin() {
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
    file = '';

    handleChange = (event: Event) => {
        const { files } = event.target as HTMLInputElement;

        if (files && files[0])
            (this.value = URL.createObjectURL(files[0])),
                (this.file = files[0].name);
    };

    render() {
        const { name, required, accept, value, file } = this;

        const empty = !value || value.startsWith('blob:');

        return (
            <div
                className={className(style.container, value && style.active)}
                style={{ backgroundImage: `url(${value})` }}
                title={file}
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
