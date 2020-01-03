import { documentReady, render, createCell, Fragment } from 'web-cell';

import { MarkdownEditor } from '../source';

documentReady.then(() =>
    render(
        <Fragment>
            <h1>BootCell test</h1>
            <main>
                <section>
                    <h2>Markdown Editor</h2>

                    <MarkdownEditor />
                </section>
            </main>
        </Fragment>
    )
);
