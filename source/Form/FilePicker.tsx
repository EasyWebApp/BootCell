import { computed, observable } from 'mobx';
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

    @observable
    accessor file: File | undefined;

    @computed
    get fileType() {
        const { accept, file } = this;

        return file?.type || file?.name.match(/\.\w+$/)?.[0] || accept;
    }

    connectedCallback() {
        this.classList.add('d-block');
        this.style.width = '10rem';
        this.style.height = '10rem';
    }

    handleAdd = ({ currentTarget }: Event) => {
        const file = (currentTarget as HTMLInputElement).files?.[0];

        this.value = (this.file = file) ? URL.createObjectURL(file) : '';

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
        const { value, fileType } = this;

        return (
            <div className="d-inline-block w-100 h-100 border rounded position-relative">
                {value ? (
                    <FilePreview
                        className="w-100 h-100 object-fit-contain"
                        type={fileType}
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
                <link
                    rel="stylesheet"
                    href="https://unpkg.com/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
                />
                {this.renderContent()}
            </>
        );
    }
}
