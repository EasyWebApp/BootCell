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
import { BootstrapStyles } from '../BootstrapStyles';

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
            'theme-inverse',
            'rounded',
            'p-5',
            'position-relative'
        );
    }

    render() {
        const { name, dataURI, theme, markup } = this;

        return (
            <>
                <BootstrapStyles />
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
