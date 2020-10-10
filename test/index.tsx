import { documentReady, render, createCell, Fragment } from 'web-cell';

import { Range } from '../source/Form/Range';
import { MarkdownEditor } from '../source/Form/MarkdownEditor';
import { TabView, TabPanel } from '../source/Content/TabView';
import { NavLink } from '../source/Navigator/Nav';
import { ListItem } from '../source/Content/ListGroup';
import { Step } from '../source/Navigator/Stepper';
import { Button } from '../source/Form/Button';

documentReady.then(() =>
    render(
        <Fragment>
            <h1>BootCell test</h1>
            <main>
                <section>
                    <h2>Range Input</h2>

                    <h3>Regular</h3>
                    <Range />

                    <h3>Star</h3>
                    <Range max={5} emptyIcon="☆" fullIcon="★" size="lg" />
                </section>
                <section>
                    <h2>Markdown Editor</h2>

                    <MarkdownEditor />
                </section>
                <section>
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
                                onSubmit={(event: Event) =>
                                    event.preventDefault()
                                }
                            >
                                <Button type="submit">Next</Button>
                            </form>
                        </TabPanel>

                        <Step icon={2}>Second</Step>
                        <TabPanel>
                            <form
                                className="d-flex justify-content-around"
                                onSubmit={(event: Event) =>
                                    event.preventDefault()
                                }
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
                </section>
            </main>
        </Fragment>
    )
);
