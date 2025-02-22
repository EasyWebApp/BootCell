import { FC, WebCellProps } from 'web-cell';

import { Icon } from '../Reminder';
import { ImageProps } from './Image';
import { ImagePreview } from './ImagePreview';

export type FilePreviewProps = ImageProps &
    WebCellProps<HTMLAudioElement> &
    WebCellProps<HTMLVideoElement> &
    WebCellProps<HTMLAnchorElement> & {
        type?: HTMLInputElement['accept'];
        path: string;
    };

export const FileTypeMap = {
    stream: 'binary',
    compressed: 'zip',
    msword: 'doc',
    document: 'docx',
    powerpoint: 'ppt',
    presentation: 'pptx',
    excel: 'xls',
    sheet: 'xlsx'
};

export const FilePreview: FC<FilePreviewProps> = ({ type, path, ...props }) => {
    const [category, ...kind] = type?.split(/\W+/) || [],
        fileName = new URL(path, 'http://localhost').pathname.split('/').at(-1);

    const extension = FileTypeMap[kind.at(-1)] || fileName?.split('.').at(-1);

    return category === 'image' ? (
        <ImagePreview fluid loading="lazy" src={path} {...props} />
    ) : category === 'audio' ? (
        <audio controls src={path} {...props} />
    ) : category === 'video' ? (
        <video
            muted
            src={path}
            onMouseEnter={({ currentTarget }) =>
                (currentTarget as HTMLVideoElement).play()
            }
            onMouseLeave={({ currentTarget }) =>
                (currentTarget as HTMLVideoElement).pause()
            }
            {...props}
        />
    ) : (
        <a
            className="d-inline-block px-3 py-2"
            download={fileName}
            href={path}
            {...props}
        >
            {extension ? (
                <Icon className="fs-1" name={`filetype-${extension}`} />
            ) : (
                path
            )}
        </a>
    );
};
