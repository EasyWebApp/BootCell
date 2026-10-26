import { DOMRenderer } from 'dom-renderer';
import { configure } from 'mobx';
import { documentReady, formToJSON } from 'web-utility';

import { CodeBlock } from '../source/Content';
import { Tab, Tabs } from '../source/Content/Tabs';
import { WeekCalendar } from '../source/Calendar/WeekCalendar';
import { ShareBar } from '../source/Navigator/ShareBar';
import { Wizard } from '../source/Content/Wizard';
import { Carousel, CarouselItem } from '../source/Media/Carousel';
import { DropdownButton, DropdownItem } from '../source/Navigator/Dropdown';
import { PopoverBox } from '../source/Prompt/Popover';
import { Toast } from '../source/Prompt/Toast';
import {
    Button,
    FileModel,
    FilePicker,
    FileUploader,
    Form,
    FormCheck,
    FormControl,
    FormField,
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
            <h2>Code Block</h2>
            <CodeBlock
                language="typescript"
                name="test.js"
                value="alert('你好，世界！')"
            />
            <section>
                <h2>Tabs</h2>
                <Tabs>
                    <Tab caption="First">
                        <p>First pane</p>
                    </Tab>
                    <Tab caption="Second">
                        <p>Second pane</p>
                    </Tab>
                </Tabs>
            </section>
            <section>
                <h2>Week calendar</h2>
                <WeekCalendar
                    startTime="08:00"
                    endTime="18:00"
                    hourInterval={2}
                />
            </section>
            <section>
                <h2>Share</h2>
                <ShareBar targets={['Weixin', 'Twitter']} />
            </section>
            <section>
                <h2>Dropdown and popover</h2>
                <DropdownButton title="Actions" id="demo-dropdown">
                    <DropdownItem href="#first" eventKey="first">
                        First action
                    </DropdownItem>
                    <DropdownItem href="#second" eventKey="second">
                        Second action
                    </DropdownItem>
                </DropdownButton>
                <PopoverBox
                    header="Details"
                    body={<strong>Popover content</strong>}
                >
                    <Button type="button">Show details</Button>
                </PopoverBox>
            </section>
            <section>
                <h2>Validated form</h2>
                <Form validate onSubmit={event => event.preventDefault()}>
                    <FormField
                        id="demo-email"
                        label="Email"
                        type="email"
                        required
                        tips="Use a valid email address"
                        invalidMessage="Enter a valid email"
                    />
                    <FormCheck
                        type="switch"
                        id="demo-notify"
                        label="Notifications"
                    />
                    <Button type="submit">Validate form</Button>
                </Form>
            </section>
            <section>
                <h2>Toast</h2>
                <Toast title="Notification" time="Now">
                    Migration complete
                </Toast>
            </section>
            <section>
                <h2>Wizard</h2>
                <Wizard>
                    <Tab caption="Details">
                        <form>
                            <label>
                                Name <input name="name" required />
                            </label>
                            <Button type="submit">Next step</Button>
                        </form>
                    </Tab>
                    <Tab caption="Confirm">
                        <form>
                            <p>Ready</p>
                            <Button type="reset">Previous step</Button>
                            <Button type="submit">Finish</Button>
                        </form>
                    </Tab>
                </Wizard>
            </section>
            <section>
                <h2>Carousel</h2>
                <Carousel interval={null}>
                    <CarouselItem>
                        <div className="p-5 bg-2">First slide</div>
                    </CarouselItem>
                    <CarouselItem>
                        <div className="p-5 bg-3">Second slide</div>
                    </CarouselItem>
                </Carousel>
            </section>
        </main>
    </>
);

documentReady.then(() => new DOMRenderer().render(<Content />));
