import { observable } from 'mobx';
import {
    attribute,
    component,
    formField,
    observer,
    reaction,
    WebCellProps,
    WebField
} from 'web-cell';

import { FilePicker, FilePickerProps } from './FilePicker';

export abstract class FileModel {
    @observable
    accessor files: string[] = [];

    clear() {
        this.files = [];
    }

    /**
     * Override this method for Network calling,
     * then call `super.upload(fileURL)` to update `this.files` array.
     */
    async upload(file: string | Blob) {
        if (file instanceof Blob) file = URL.createObjectURL(file);

        const { files } = this;

        if (!files.includes(file)) this.files = [...files, file];

        return file;
    }

    /**
     * Override this method for Network calling,
     * then call `super.delete(fileURL)` to update `this.files` array.
     */
    async delete(file: string) {
        const { files } = this;
        const index = files.indexOf(file);

        this.files = [...files.slice(0, index), ...files.slice(index + 1)];
    }

    move(sourceIndex: number, targetIndex: number) {
        const { files } = this;
        const sourceFile = files[sourceIndex],
            targetFile = files[targetIndex];
        const frontIndex = Math.min(sourceIndex, targetIndex),
            backIndex = Math.max(sourceIndex, targetIndex);

        const front = files.slice(0, frontIndex),
            middle = files.slice(frontIndex + 1, backIndex),
            back = files.slice(backIndex + 1);

        this.files =
            sourceIndex < targetIndex
                ? [...front, ...middle, targetFile, sourceFile, ...back]
                : [...front, sourceFile, targetFile, ...middle, ...back];
    }
}

export interface FileUploaderProps extends WebCellProps<HTMLInputElement> {
    store: FileModel;
}

export interface WebFileField
    extends Omit<WebField<FileUploaderProps>, 'defaultValue' | 'value'> {
    defaultValue?: string | string[];
    value?: string | string[];
}

export interface FileUploader extends WebFileField {}

@component({ tagName: 'file-uploader', mode: 'open' })
@formField
@observer
export class FileUploader extends HTMLElement implements WebFileField {
    @attribute
    @observable
    accessor accept: HTMLInputElement['accept'] = '*/*';

    @attribute
    @observable
    accessor multiple = false;

    @observable
    accessor store: FileModel;

    @observable
    accessor pickIndex: number | undefined;

    mountedCallback() {
        const { defaultValue, store } = this;

        store.files =
            defaultValue instanceof Array
                ? (defaultValue as string[])
                : defaultValue
                  ? [defaultValue as string]
                  : [];
    }

    @reaction(({ value }) => value)
    updateFiles(value: this['value']) {
        this.store.files =
            value instanceof Array
                ? (value as string[])
                : value
                  ? [value as string]
                  : [];
    }

    handleDrop = (index: number) => (event: DragEvent) => {
        event.preventDefault();

        const { pickIndex } = this;

        if (pickIndex != null) return this.props.store.move(pickIndex, index);
    };

    handleChange =
        (oldURI = ''): FilePickerProps['onChange'] =>
        async ({ detail: { file } }) => {
            const { store } = this;

            if (oldURI) await store.delete(oldURI);
            if (file) await store.upload(file);

            this.emit('change', [...store.files]);
        };

    renderContent() {
        const { accept, multiple, required } = this,
            { files } = this.store;

        return (
            <ol
                className="list-inline d-flex m-0"
                onDragOver={event => event.preventDefault()}
            >
                {files.map((file, index) => (
                    <li
                        key={file}
                        className="list-inline-item"
                        draggable
                        onDragStart={() => (this.pickIndex = index)}
                        onDrop={this.handleDrop(index)}
                    >
                        <FilePicker
                            accept={accept}
                            style={{ height: '10rem' }}
                            value={file}
                            onChange={this.handleChange(file)}
                        />
                    </li>
                ))}
                {(multiple || !files[0]) && (
                    <li className="list-inline-item">
                        <FilePicker
                            style={{ width: '10rem', height: '10rem' }}
                            required={!files[0] && required}
                            onChange={this.handleChange()}
                        />
                    </li>
                )}
            </ol>
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
