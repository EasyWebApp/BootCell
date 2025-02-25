import { observable } from 'mobx';
import {
    attribute,
    component,
    formField,
    observer,
    WebCellProps,
    WebField
} from 'web-cell';

import { FilePreview } from '../Media/FilePreview';
import { CloseButton } from './Button';

export interface FilePickerProps extends WebCellProps<HTMLInputElement> {
    onChange?: (event: CustomEvent<{ value: string; file?: File }>) => any;
}

export interface FilePicker extends WebField<FilePickerProps> {}

@component({ tagName: 'file-picker', mode: 'open' })
@formField
@observer
export class FilePicker
    extends HTMLElement
    implements WebField<FilePickerProps>
{
    @attribute
    @observable
    accessor accept: HTMLInputElement['accept'] = '*/*';

    @attribute
    @observable
    accessor multiple = false;

    handleAdd = (event: Event) => {
        const file = (event.currentTarget as HTMLInputElement).files?.[0];

        this.value = file ? URL.createObjectURL(file) : '';

        this.emit('change', { value: this.value, file });
    };

    handleClear = (event: MouseEvent) => {
        event.preventDefault();

        if (this.value) {
            URL.revokeObjectURL(this.value + '');

            this.value = '';
        }
        this.emit('change', { value: this.value });
    };

    renderInput() {
        const { name, value, required, disabled, accept, multiple } = this;

        return (
            <>
                <input
                    className="position-absolute start-0 top-0 w-100 h-100 opacity-0"
                    type="file"
                    name={value ? undefined : name}
                    required={!value && required}
                    {...{ disabled, accept, multiple }}
                    onChange={this.handleAdd}
                />
                {value && <input type="hidden" name={name} value={value} />}
            </>
        );
    }

    renderContent() {
        const { value, accept } = this;

        return (
            <div className="form-control position-relative">
                {value ? (
                    <FilePreview
                        className="w-100 h-100 object-fit-contain"
                        type={accept}
                        path={value + ''}
                    />
                ) : (
                    <div className="w-100 h-100 d-flex justify-content-center align-items-center display-1">
                        +
                    </div>
                )}
                {this.renderInput()}
                {value && (
                    <CloseButton
                        className="position-absolute top-0 end-0"
                        style={{ width: '0.5rem', height: '0.5rem' }}
                        onClick={this.handleClear}
                    />
                )}
            </div>
        );
    }

    render() {
        return (
            <>
                <link
                    rel="stylesheet"
                    href="https://unpkg.com/bootstrap@5.3.3/dist/css/bootstrap.min.css"
                />
                {this.renderContent()}
            </>
        );
    }
}
