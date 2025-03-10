import { DOMRenderer } from 'dom-renderer';
import { configure } from 'mobx';
import { documentReady, formToJSON } from 'web-utility';

import { CodeBlock } from '../source/Content';
import {
    Button,
    FileModel,
    FilePicker,
    FileUploader,
    FormControl,
    RangeInput
} from '../source/Form';

import 'prismjs/components/prism-typescript';

configure({ enforceActions: 'never' });

const test_image = 'https://github.com/EasyWebApp.png';

class MediaModel extends FileModel {}

const Content = () => (
    <>
        <h1>BootCell test</h1>
        <main>
            <form
                onSubmit={(event: Event) => {
                    event.preventDefault();
                    console.log(formToJSON(event.target as HTMLFormElement));
                }}
            >
                <section>
                    <h2>Range Input</h2>

                    <h3>Regular</h3>
                    <FormControl type="range" name="count" />

                    <h3>Star</h3>
                    <RangeInput
                        className="text-warning"
                        name="score"
                        icon={value => (value ? '★' : '☆')}
                    />
                </section>

                <section>
                    <h2>File Picker</h2>

                    <FilePicker name="file" onChange={console.log} />
                </section>

                <h2>File Uploader</h2>
                <FileUploader
                    store={new MediaModel()}
                    name="media"
                    accept="image/*"
                    multiple
                    onChange={console.log}
                />
                <Button type="submit" variant="success" className="my-3">
                    Submit
                </Button>
            </form>
            <h2>Code Block</h2>
            <CodeBlock
                language="typescript"
                name="test.js"
                value="alert('你好，世界！')"
            />
            {/* <section>
                <h2>Tab View</h2>

                <h3>Nav tab</h3>
                <TabView>
                    <NavLink>First</NavLink>
                    <TabPanel>
                        <h4 className="text-center">111</h4>
                    </TabPanel>

                    <NavLink>Second</NavLink>
                    <TabPanel>
                        <h4 className="text-center">222</h4>
                    </TabPanel>
                </TabView>

                <h3>Nav tab - Pill</h3>
                <TabView mode="pills" tabWidth="fill">
                    <NavLink>First</NavLink>
                    <TabPanel>
                        <h4 className="text-center">111</h4>
                    </TabPanel>

                    <NavLink>Second</NavLink>
                    <TabPanel>
                        <h4 className="text-center">222</h4>
                    </TabPanel>
                </TabView>

                <h3>Nav tab - Masthead</h3>
                <TabView mode="masthead" tabWidth="justified">
                    <NavLink>First</NavLink>
                    <TabPanel>
                        <h4 className="text-center">111</h4>
                    </TabPanel>

                    <NavLink>Second</NavLink>
                    <TabPanel>
                        <h4 className="text-center">222</h4>
                    </TabPanel>
                </TabView>

                <h3>List tab</h3>
                <TabView direction="column">
                    <ListItem>First</ListItem>
                    <TabPanel>
                        <h4 className="text-center">111</h4>
                    </TabPanel>

                    <ListItem>Second</ListItem>
                    <TabPanel>
                        <h4 className="text-center">222</h4>
                    </TabPanel>
                </TabView>

                <h3>Step tab</h3>
                <TabView>
                    <Step icon={1}>First</Step>
                    <TabPanel>
                        <form
                            className="d-flex justify-content-around"
                            onSubmit={(event: Event) => event.preventDefault()}
                        >
                            <Button type="submit">Next</Button>
                        </form>
                    </TabPanel>

                    <Step icon={2}>Second</Step>
                    <TabPanel>
                        <form
                            className="d-flex justify-content-around"
                            onSubmit={(event: Event) => event.preventDefault()}
                        >
                            <Button type="reset" color="danger">
                                Previous
                            </Button>
                            <Button type="submit" color="success">
                                Submit
                            </Button>
                        </form>
                    </TabPanel>
                </TabView>
            </section> */}
        </main>
    </>
);

documentReady.then(() => new DOMRenderer().render(<Content />));
