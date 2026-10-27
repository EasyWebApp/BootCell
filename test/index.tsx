import { DOMRenderer } from 'dom-renderer';
import { configure } from 'mobx';
import { documentReady, formToJSON } from 'web-utility';

import { CountDown } from '../source/Calendar/CountDown';
import { MonthCalendar } from '../source/Calendar/MonthCalendar';
import { CodeBlock, MediaObject, SplitView } from '../source/Content';
import {
    Button,
    FileModel,
    FilePicker,
    FileUploader,
    FormControl,
    FormField,
    RangeInput
} from '../source/Form';
import { Col, Row } from '../source/Layout/Grid';
import {
    Carousel,
    CarouselCaption,
    CarouselItem
} from '../source/Media/Carousel';
import { NavLink } from '../source/Navigator/Nav';
import { DrawerNavbar } from '../source/Navigator/Navbar';
import { Spinner } from '../source/Prompt/Spinner';
import { TooltipBox } from '../source/Prompt/Tooltip';
import { Badge } from '../source/Reminder/Badge';

import 'prismjs/components/prism-typescript';
import { DialogExamples } from './Dialog';
import { NavigationExamples } from './Navigation';

configure({ enforceActions: 'never' });

const test_image = 'https://github.com/EasyWebApp.png';

class MediaModel extends FileModel {}

const Content = () => (
    <>
        <h1>BootCell test</h1>
        <main id="main">
            <section>
                <h2>Badges</h2>
                <Badge bg="primary">Primary</Badge>{' '}
                <Badge bg="warning">Warning</Badge>
            </section>
            <section>
                <h2>Small spinners</h2>
                <Spinner size="sm" animation="border" />{' '}
                <Spinner size="sm" animation="grow" />
            </section>
            <section>
                <h2>Tooltip</h2>
                <TooltipBox content="Anchored tooltip">
                    <button type="button">Tooltip trigger</button>
                </TooltipBox>
            </section>
            <section>
                <h2>Responsive grid</h2>
                <Row id="patch-grid" xs={1} md={2} lg={3}>
                    <Col md={6} lg={4}>
                        First column
                    </Col>
                    <Col md={6} lg={4}>
                        Second column
                    </Col>
                </Row>
            </section>
            <section>
                <h2>Media alignment</h2>
                <MediaObject
                    title="Aligned media"
                    imageRow="center"
                    image={<span>Image</span>}
                >
                    <p style={{ overflowWrap: 'anywhere' }}>
                        LongContentThatMustShrinkOnNarrowScreensWithoutOverflowingItsFlexContainer
                    </p>
                </MediaObject>
            </section>
            <h2>Code Block</h2>
            <CodeBlock
                language="typescript"
                name="test.js"
                value="alert('你好，世界！')"
            />
            <form
                onSubmit={(event: Event) => {
                    event.preventDefault();
                    console.log(formToJSON(event.target as HTMLFormElement));
                }}
            >
                <section>
                    <h2>Form labels</h2>
                    <FormField label="Name" />
                    <FormField label="Email" labelFloat placeholder="Email" />
                </section>
                <section>
                    <h2>Range Input</h2>

                    <h3>Regular</h3>
                    <FormControl type="range" name="count" />

                    <h3>Star</h3>
                    <RangeInput
                        className="fg-warning"
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
                <Button
                    type="submit"
                    variant="solid"
                    theme="success"
                    className="my-3"
                >
                    Submit
                </Button>
            </form>
            <section>
                <h2>Countdown</h2>
                <CountDown endTime={Date.now() + 90_061_000} />
            </section>
            <section>
                <h2>Compact calendar</h2>
                <MonthCalendar locale="en-US" style={{ width: '100%' }} />
            </section>
            <section>
                <h2>Carousel</h2>
                <Carousel id="patch-carousel" interval={60_000}>
                    {['First', 'Second', 'Third'].map((name, index) => (
                        <CarouselItem key={name}>
                            <div
                                style={{
                                    height: '16rem',
                                    backgroundColor: [
                                        '#294c60',
                                        '#59344f',
                                        '#375d3b'
                                    ][index]
                                }}
                            />
                            <CarouselCaption>{name} slide</CarouselCaption>
                        </CarouselItem>
                    ))}
                </Carousel>
            </section>
            <section>
                <h2>Split view</h2>
                <SplitView style={{ height: '8rem' }}>
                    <div slot="left">Resizable left pane</div>
                    <div slot="right">Flexible right pane</div>
                </SplitView>
            </section>
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

            <section>
                <h2>Responsive navigation</h2>
                <h3>Disabled navigation</h3>
                <NavLink href="#should-not-navigate" disabled>
                    Disabled navigation
                </NavLink>
                <h3>Sticky navigation</h3>
                <DrawerNavbar
                    id="sticky-regression"
                    title="Sticky navigation"
                    sticky="top"
                    expand
                    fluid
                >
                    <NavLink href="#main">Overview</NavLink>
                </DrawerNavbar>
                <h3>Drawer and dropdown navigation</h3>
                <NavigationExamples />
            </section>

            <section>
                <h2>Dialog</h2>
                <p>
                    Compare with the Bootstrap{' '}
                    <a href="https://getbootstrap.com/docs/5.3/components/offcanvas/">
                        Offcanvas
                    </a>{' '}
                    and{' '}
                    <a href="https://getbootstrap.com/docs/5.3/components/modal/">
                        Modal
                    </a>{' '}
                    documentation.
                </p>
                <DialogExamples />
            </section>
        </main>
    </>
);

documentReady.then(() => new DOMRenderer().render(<Content />));
