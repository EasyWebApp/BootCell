import MIME from 'mime';
import { computed, observable } from 'mobx';
import { highlight, languages } from 'prismjs';
import {
    attribute,
    component,
    observer,
    WebCell,
    WebCellProps
} from 'web-cell';

import { IconButton } from '../Form';

export interface CodeBlockProps extends WebCellProps<HTMLPreElement> {
    name?: string;
    value: string;
    language: string;
    theme?: string;
}

export interface CodeBlock extends WebCell<CodeBlockProps> {}

@component({ tagName: 'code-block', mode: 'open' })
@observer
export class CodeBlock extends HTMLElement implements WebCell<CodeBlockProps> {
    @attribute
    @observable
    accessor name = '';

    @observable
    accessor value = '';

    @attribute
    @observable
    accessor language = '';

    @attribute
    @observable
    accessor theme = 'okaidia';

    @computed
    get markup() {
        const { value, language } = this;

        return (
            value && language && highlight(value, languages[language], language)
        );
    }

    @computed
    get dataURI() {
        return URL.createObjectURL(
            new Blob([this.value], { type: MIME.getType(this.name) })
        );
    }

    connectedCallback() {
        this.classList.add(
            'd-block',
            'bg-dark',
            'rounded',
            'p-3',
            'position-relative'
        );
    }

    render() {
        const { name, dataURI, theme, markup } = this;

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
                <link
                    rel="stylesheet"
                    href={`https://unpkg.com/prismjs@1.29.0/themes/prism-${theme}.min.css`}
                />
                {name && (
                    <IconButton
                        className="position-absolute top-0 end-0"
                        variant="warning"
                        name="download"
                        download={name}
                        href={dataURI}
                    />
                )}
                <pre className="m-0" innerHTML={markup} />
            </>
        );
    }
}
