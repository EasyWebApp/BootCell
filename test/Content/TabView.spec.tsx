import { assertLooksLike } from '@tech_query/snabbdom-looks-like';
import { createCell } from 'web-cell';

import { TabView, TabViewProps, TabPanel } from '../../source/Content/TabView';
import { NavLink } from '../../source/Navigator/Nav';
import { ListItem } from '../../source/Content/ListGroup';
import { Step } from '../../source/Navigator/Stepper';
import { Button } from '../../source/Form/Button';

const { render } = TabView.prototype,
    typeGetter = Object.getOwnPropertyDescriptor(TabView.prototype, 'type').get;

function InlineTabView({
    mode = 'tabs',
    direction = 'row',
    tabAlign = 'start',
    defaultSlot,
    ...rest
}: TabViewProps) {
    const type = typeGetter.call({ defaultSlot });

    return (
        <div>
            {render.call(
                { defaultSlot, type },
                { mode, direction, tabAlign, ...rest }
            )}
        </div>
    );
}

describe('Tab List', () => {
    it('should render a Tab List within Nav Links', () => {
        assertLooksLike(
            <InlineTabView>
                <NavLink>First</NavLink>
                <TabPanel>
                    <h4 className="text-center">111</h4>
                </TabPanel>

                <NavLink>Second</NavLink>
                <TabPanel>
                    <h4 className="text-center">222</h4>
                </TabPanel>
            </InlineTabView>,
            <div>
                <nav
                    className="nav nav-tabs flex-row justify-content-start"
                    aria-orientation="horizontal"
                >
                    <a
                        className="nav-item nav-link text-nowrap"
                        aria-disabled="false"
                    >
                        First
                    </a>
                    <a
                        className="nav-item nav-link text-nowrap"
                        aria-disabled="false"
                    >
                        Second
                    </a>
                </nav>
                <div className="tab-content flex-fill pt-2">
                    <div className="bs-stepper-pane" role="tabpanel">
                        <h4 className="text-center">111</h4>
                    </div>
                    <div className="bs-stepper-pane" role="tabpanel">
                        <h4 className="text-center">222</h4>
                    </div>
                </div>
            </div>
        );
    });

    it('should render a Tab List within Pill Nav Links with Fill Width', () => {
        assertLooksLike(
            <InlineTabView mode="pills" tabWidth="fill">
                <NavLink>First</NavLink>
                <NavLink>Second</NavLink>
            </InlineTabView>,
            <div>
                <nav
                    className="nav nav-pills nav-fill flex-row justify-content-start"
                    aria-orientation="horizontal"
                >
                    <a
                        className="nav-item nav-link text-nowrap"
                        aria-disabled="false"
                    >
                        First
                    </a>
                    <a
                        className="nav-item nav-link text-nowrap"
                        aria-disabled="false"
                    >
                        Second
                    </a>
                </nav>
            </div>
        );
    });

    it('should render a Tab List within Masthead Nav Links with Justified Width', () => {
        assertLooksLike(
            <InlineTabView mode="masthead" tabWidth="justified">
                <NavLink>First</NavLink>
                <NavLink>Second</NavLink>
            </InlineTabView>,
            <div>
                <nav
                    className="nav nav-masthead nav-justified flex-row justify-content-start"
                    aria-orientation="horizontal"
                >
                    <a
                        className="nav-item nav-link text-nowrap"
                        aria-disabled="false"
                    >
                        First
                    </a>
                    <a
                        className="nav-item nav-link text-nowrap"
                        aria-disabled="false"
                    >
                        Second
                    </a>
                </nav>
            </div>
        );
    });

    it('should render a Tab List within List Items with Column Layout', () => {
        assertLooksLike(
            <InlineTabView direction="column">
                <ListItem>First</ListItem>
                <TabPanel>
                    <h4 className="text-center">111</h4>
                </TabPanel>

                <ListItem>Second</ListItem>
                <TabPanel>
                    <h4 className="text-center">222</h4>
                </TabPanel>
            </InlineTabView>,
            <div>
                <div
                    className="list-group"
                    role="tablist"
                    aria-orientation="vertical"
                >
                    <a
                        className="list-group-item list-group-item-action"
                        aria-disabled="false"
                    >
                        First
                    </a>
                    <a
                        className="list-group-item list-group-item-action"
                        aria-disabled="false"
                    >
                        Second
                    </a>
                </div>
                <div className="tab-content flex-fill ml-3">
                    <div className="bs-stepper-pane" role="tabpanel">
                        <h4 className="text-center">111</h4>
                    </div>
                    <div className="bs-stepper-pane" role="tabpanel">
                        <h4 className="text-center">222</h4>
                    </div>
                </div>
            </div>
        );
    });

    it('should render a Tab List within List Items with Column Layout', () => {
        assertLooksLike(
            <InlineTabView>
                <Step icon={1}>First</Step>
                <TabPanel>
                    <form className="d-flex justify-content-around">
                        <Button type="submit">Next</Button>
                    </form>
                </TabPanel>

                <Step icon={2}>Second</Step>
                <TabPanel>
                    <form className="d-flex justify-content-around">
                        <Button type="reset" color="danger">
                            Previous
                        </Button>
                        <Button type="submit" color="success">
                            Submit
                        </Button>
                    </form>
                </TabPanel>
            </InlineTabView>,
            <div>
                <nav
                    className="bs-stepper-header"
                    aria-orientation="horizontal"
                >
                    <div className="step">
                        <button
                            type="button"
                            className="step-trigger"
                            role="tab"
                            aria-selected="false"
                        >
                            <span className="bs-stepper-circle">{1}</span>
                            <span className="bs-stepper-label">First</span>
                        </button>
                    </div>
                    <div className="line" />
                    <div className="step">
                        <button
                            type="button"
                            className="step-trigger"
                            role="tab"
                            aria-selected="false"
                        >
                            <span className="bs-stepper-circle">{2}</span>
                            <span className="bs-stepper-label">Second</span>
                        </button>
                    </div>
                </nav>
                <div className="bs-stepper-content">
                    <div className="bs-stepper-pane" role="tabpanel">
                        <form className="d-flex justify-content-around">
                            <Button type="submit">Next</Button>
                        </form>
                    </div>
                    <div className="bs-stepper-pane" role="tabpanel">
                        <form className="d-flex justify-content-around">
                            <Button type="reset" color="danger">
                                Previous
                            </Button>
                            <Button type="submit" color="success">
                                Submit
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        );
    });
});
