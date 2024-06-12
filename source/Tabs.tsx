import { JsxChildren } from 'dom-renderer';
import { observable } from 'mobx';
import {
    WebCell,
    attribute,
    component,
    observer,
    on,
    reaction
} from 'web-cell';

import { Nav, NavLink } from './Nav';

export interface TabProps {
    caption: JsxChildren;
}

export interface Tab extends WebCell<TabProps> {}

@component({ tagName: 'tab-pane' })
export class Tab extends HTMLElement implements WebCell<TabProps> {
    caption: JsxChildren;

    connectedCallback() {
        this.classList.add('tab-pane');
        this.role = 'tabpanel';
    }
}

export interface Tabs extends WebCell {}

@component({
    tagName: 'tabs-box',
    mode: 'open'
})
@observer
export class Tabs extends HTMLElement implements WebCell {
    @observable
    accessor tabMeta: TabProps[] = [];

    @attribute
    @observable
    accessor currentIndex = 0;

    mountedCallback() {
        const tabs = [...this.querySelectorAll<Tab>('tab-pane')];

        this.tabMeta = tabs.map(tab => {
            tab.hidden = true;

            return { caption: tab.caption };
        });

        this.turnPaneTo(this.currentIndex);
    }

    @on('click', '.nav-tabs > .nav-link')
    handleTabClick(
        event: MouseEvent,
        { dataset: { index } }: HTMLAnchorElement
    ) {
        event.preventDefault();
        event.stopPropagation();

        this.currentIndex = +index;
    }

    @reaction(({ currentIndex }) => currentIndex)
    turnPaneTo(index: number) {
        const previous = this.querySelector<Tab>('tab-pane.active');

        if (previous) {
            previous.hidden = true;
            previous.classList.remove('active', 'show');
        }
        const next = this.children[index] as Tab;

        next.hidden = false;
        next.classList.add('active', 'show');
    }

    renderContent() {
        const { tabMeta, currentIndex } = this;

        return (
            <>
                <Nav className="nav-tabs" role="tablist">
                    {tabMeta.map(({ caption }, index) => (
                        <NavLink
                            role="tab"
                            data-index={index}
                            className={currentIndex === index ? 'active' : ''}
                            ariaSelected={`${currentIndex === index}`}
                        >
                            {caption}
                        </NavLink>
                    ))}
                </Nav>
                <div className="tab-content">
                    <slot />
                </div>
            </>
        );
    }

    render() {
        return (
            <>
                <link
                    rel="stylesheet"
                    href="https://unpkg.com/bootstrap@5.3.2/dist/css/bootstrap.min.css"
                />
                {this.renderContent()}
            </>
        );
    }
}
