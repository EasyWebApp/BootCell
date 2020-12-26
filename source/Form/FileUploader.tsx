import {
    WebFieldProps,
    WebFieldState,
    component,
    mixinForm,
    createCell,
    Fragment,
    watch
} from 'web-cell';

import { Progress } from '../Reminder';

export interface UploadHandler {
    progress?: {
        [Symbol.asyncIterator](): AsyncGenerator<ProgressEvent>;
    };
    path: Promise<string>;
}

export type UploadEvent = CustomEvent<{
    file: File;
    path: string;
}>;

export interface FileUploaderProps extends WebFieldProps {
    transport(file: File): UploadHandler;
    onUpload?(event: UploadEvent): any;
}

interface FileUploaderState extends WebFieldState {
    percent: number;
}

@component({
    tagName: 'file-uploader',
    renderTarget: 'children'
})
export class FileUploader extends mixinForm<
    FileUploaderProps,
    FileUploaderState
>() {
    @watch
    transport: FileUploaderProps['transport'];

    state = { percent: 0 };

    get percent() {
        return this.state.percent;
    }

    formAssociatedCallback(form: HTMLFormElement) {
        form.addEventListener('submit', this.upload);
    }

    upload = async () => {
        const files = Array.from(
            this.querySelectorAll('*'),
            field => 'files' in field && [...(field as HTMLInputElement).files]
        )
            .filter(Boolean)
            .flat(2);

        const sum = files.reduce((sum, { size }) => sum + size, 0);
        var finished = 0;

        for (const file of files) {
            const { progress, path } = this.transport(file);

            if (progress)
                for await (const { loaded } of progress)
                    await this.setState({
                        percent: ((finished + loaded) / sum) * 100
                    });
            finished += file.size;

            await this.setState({ percent: (finished / sum) * 100 });

            this.emit('upload', { file, path: await path });
        }
    };

    render({ defaultSlot }: FileUploaderProps, { percent }: FileUploaderState) {
        return (
            <Fragment>
                <Progress
                    className="mb-2"
                    striped
                    animated={percent < 100}
                    percent={percent}
                />
                {defaultSlot}
            </Fragment>
        );
    }
}
