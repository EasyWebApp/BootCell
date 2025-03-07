import MIME from 'mime';
import { computed, observable } from 'mobx';
import { codeToHtml } from 'shiki';
import {
    attribute,
    component,
    observer,
    reaction,
    WebCell,
    WebCellProps
} from 'web-cell';

import { IconButton } from '../Form';
import * as styles from './CodeBlock.module.less';

export interface CodeBlockProps extends WebCellProps<HTMLPreElement> {
    name?: string;
    value: string;
    language: string;
    theme?: string;
}

export interface CodeBlock extends WebCell<CodeBlockProps> {}

@component({ tagName: 'code-block' })
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
    accessor theme = '';

    @observable
    accessor markup = '';

    @computed
    get dataURI() {
        return `data:${MIME.getType(this.name)};base64,${btoa(this.value)}`;
    }

    @reaction(({ value, language, theme }) => value + language + theme)
    async connectedCallback() {
        if (this.value)
            this.markup = await codeToHtml(this.value, {
                lang: this.language,
                theme: this.theme
            });
    }

    render() {
        const { name, dataURI, markup } = this;

        return (
            <>
                {name && (
                    <div className="text-end mb-2">
                        <IconButton
                            name="download"
                            variant="warning"
                            download={name}
                            href={dataURI}
                        />
                    </div>
                )}
                <div
                    className={`rounded overflow-hidden ${styles.code}`}
                    innerHTML={markup}
                />
            </>
        );
    }
}
