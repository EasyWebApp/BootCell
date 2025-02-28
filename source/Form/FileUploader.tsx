import { CoreFileOptions, fileOpen } from 'browser-fs-access';
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
import { makeArray } from 'web-utility';

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

export interface WebFileFieldProps
    extends Omit<WebCellProps<HTMLInputElement>, 'defaultValue' | 'value'> {
    defaultValue?: string | string[];
    value?: string | string[];
}

export interface FileUploaderProps extends WebFileFieldProps {
    store: FileModel;
}

export interface WebFileField
    extends Pick<FileUploaderProps, 'defaultValue' | 'value'>,
        Omit<WebField<FileUploaderProps>, 'defaultValue' | 'value' | 'props'> {
    props: FileUploaderProps;
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

    @reaction(({ store }) => store?.files)
    emitFiles(files?: FileModel['files']) {
        if (files) {
            this.value = files[1] ? files : files[0];
            this.emit('change', [...files]);
        }
    }

    handleAdd = async () => {
        const { accept, multiple, store } = this;

        const fileOption = accept.split(',').reduce((option, type) => {
            type = type.trim();

            if (type.includes('/')) (option.mimeTypes ||= []).push(type);
            else (option.extensions ||= []).push(type);

            return option;
        }, {} as CoreFileOptions);

        const files = makeArray(await fileOpen({ multiple, ...fileOption }));

        for (const file of files) await store.upload(file);
    };

    handleDrop = (index: number) => (event: DragEvent) => {
        event.preventDefault();

        const { pickIndex } = this;

        if (pickIndex != null) return this.props.store.move(pickIndex, index);
    };

    handleChange =
        (oldURI = ''): FilePickerProps['onChange'] =>
        ({ detail: { file } }) => {
            const { store } = this;

            if (oldURI) return store.delete(oldURI);
            if (file) return store.upload(file);
        };

    renderContent() {
        const { accept, multiple } = this,
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
                            value={file}
                            onChange={this.handleChange(file)}
                        />
                    </li>
                ))}
                {(multiple || !files[0]) && (
                    <li
                        role="button"
                        className="list-inline-item border rounded d-flex justify-content-center align-items-center display-1"
                        style={{ width: '10rem', height: '10rem' }}
                        onClick={this.handleAdd}
                    >
                        +
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
