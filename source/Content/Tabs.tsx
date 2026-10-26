import classNames from 'classnames';
import { JsxChildren } from 'dom-renderer';
import { observable } from 'mobx';
import { WebCell, attribute, component, observer, on } from 'web-cell';

import { BootstrapStyles } from '../BootstrapStyles';
import { TabKey, TabsModel } from './TabsModel';

export type { TabKey } from './TabsModel';

export interface TabProps {
    caption?: JsxChildren;
    title?: string;
    /** Rich header content without overriding HTMLElement's tooltip title. */
    tabTitle?: JsxChildren;
    eventKey?: TabKey;
    disabled?: boolean;
    tabClassName?: string;
    tabAttrs?: Record<string, string>;
    icon?: JsxChildren;
}

export interface Tab extends WebCell<TabProps> {}

@component({ tagName: 'tab-pane' })
@observer
export class Tab extends HTMLElement implements WebCell<TabProps> {
    @observable accessor caption: JsxChildren;
    @observable accessor tabTitle: JsxChildren;
    @attribute @observable accessor eventKey: TabKey | undefined;
    @attribute @observable accessor disabled = false;
    @observable accessor tabClassName = '';
    @observable accessor tabAttrs: Record<string, string> = {};
    @observable accessor icon: JsxChildren;

    connectedCallback() {
        this.classList.add('tab-pane');
        this.role = 'tabpanel';
    }
}

export interface TabsProps {
    activeKey?: TabKey | null;
    defaultActiveKey?: TabKey;
    /** Also emits a bubbling `select` CustomEvent<TabSelectionDetail>. */
    onSelect?: (key: TabKey, event?: Event) => void;
    currentIndex?: number;
    variant?: 'tabs' | 'pills' | 'underline' | 'list';
    vertical?: boolean;
    direction?: 'row' | 'column';
    fill?: boolean;
    justify?: boolean;
    tabAlign?: 'start' | 'center' | 'end';
    tabWidth?: 'fill' | 'justify';
    tabScroll?: boolean;
    tabColor?: string;
    transition?: boolean;
    generateChildId?: (key: TabKey, type: 'tab' | 'pane') => string;
}

export interface TabSelectionDetail {
    activeKey: TabKey;
    originalEvent?: Event;
}

export interface TabsBase extends WebCell<TabsProps> {}

@observer
export class TabsBase extends HTMLElement implements WebCell<TabsProps> {
    @attribute @observable accessor activeKey: TabKey | null | undefined;
    @attribute @observable accessor defaultActiveKey: TabKey | undefined;
    @attribute @observable accessor currentIndex = 0;
    @attribute @observable accessor variant: TabsProps['variant'] = 'tabs';
    @attribute @observable accessor vertical = false;
    @attribute @observable accessor direction: TabsProps['direction'] = 'row';
    @attribute @observable accessor fill = false;
    @attribute @observable accessor justify = false;
    @attribute @observable accessor tabAlign: TabsProps['tabAlign'] = 'start';
    @attribute @observable accessor tabWidth: TabsProps['tabWidth'];
    @attribute @observable accessor tabScroll = false;
    @attribute @observable accessor tabColor: string;
    @attribute @observable accessor transition = true;
    onSelect?: TabsProps['onSelect'];
    generateChildId?: TabsProps['generateChildId'];

    // JSX callbacks are lowercased by DOM-renderer. Keep the native event
    // handler slot empty: selection notifications are dispatched separately.
    get onselect(): GlobalEventHandlers['onselect'] {
        return null;
    }
    set onselect(value: TabsProps['onSelect'] | null) {
        this.onSelect = value ?? undefined;
    }

    readonly model = this.createModel();

    protected createModel() {
        return new TabsModel(this);
    }

    get tabMeta() {
        return this.model.tabs.map(tab => ({
            caption: tab.caption ?? tab.tabTitle ?? tab.title
        }));
    }

    connectedCallback() {
        if (this.mounted) {
            this.model.mount();
            void this.update();
        }
    }

    mountedCallback() {
        this.model.mount();
    }

    disconnectedCallback() {
        this.model.dispose();
    }

    turnPaneTo(index: number) {
        this.model.show(index);
    }

    @on('click', '[data-tab-index]')
    handleTabClick(event: MouseEvent, target: HTMLElement) {
        event.preventDefault();
        event.stopPropagation();
        this.model.select(
            +(target.dataset.tabIndex ?? target.dataset.index),
            event
        );
    }

    @on('keydown', '[data-tab-index]')
    handleTabKeyDown(event: KeyboardEvent, target: HTMLElement) {
        this.model.keyDown(
            event,
            +(target.dataset.tabIndex ?? target.dataset.index)
        );
    }

    protected renderHeaders() {
        const {
            model,
            variant,
            fill,
            justify,
            tabWidth,
            tabAlign,
            tabScroll,
            tabColor
        } = this;
        return (
            <nav
                role="tablist"
                aria-orientation={model.vertical ? 'vertical' : 'horizontal'}
                className={classNames(
                    variant === 'list' ? 'list-group' : `nav nav-${variant}`,
                    `justify-content-${tabAlign}`,
                    {
                        'flex-column': model.vertical,
                        'list-group-horizontal':
                            variant === 'list' && !model.vertical,
                        'nav-fill': fill || tabWidth === 'fill',
                        'nav-justified': justify || tabWidth === 'justify',
                        'overflow-auto flex-nowrap': tabScroll,
                        [`bg-${tabColor}`]: tabColor
                    }
                )}
            >
                {model.tabs.map((tab, index) => (
                    <button
                        {...tab.tabAttrs}
                        type="button"
                        id={model.headerId(index)}
                        role="tab"
                        data-tab-index={index}
                        className={classNames(
                            variant === 'list'
                                ? 'list-group-item list-group-item-action'
                                : 'nav-link',
                            tab.tabClassName,
                            { active: model.index === index }
                        )}
                        disabled={model.isDisabled(index)}
                        tabIndex={model.index === index ? 0 : -1}
                        aria-selected={String(model.index === index)}
                        aria-controls={tab.id}
                    >
                        {tab.caption ?? tab.tabTitle ?? tab.title}
                    </button>
                ))}
            </nav>
        );
    }

    renderContent() {
        return (
            <div
                className={classNames(
                    'd-flex',
                    this.model.vertical ? 'flex-row' : 'flex-column'
                )}
            >
                {this.renderHeaders()}
                <div className="tab-content flex-fill">
                    <slot />
                </div>
            </div>
        );
    }

    render() {
        return (
            <>
                <BootstrapStyles />
                <style>{`
                    :host { display: block }
                    ::slotted(tab-pane) { display: block; opacity: 1 }
                    ::slotted(tab-pane[hidden]) { display: none; opacity: 0 }
                    ${
                        this.transition
                            ? `
                        @media (prefers-reduced-motion: no-preference) {
                            ::slotted(tab-pane) { transition: opacity .15s linear, display .15s allow-discrete }
                            @starting-style { ::slotted(tab-pane:not([hidden])) { opacity: 0 } }
                        }
                    `
                            : ''
                    }
                `}</style>
                {this.renderContent()}
            </>
        );
    }
}

@component({ tagName: 'tabs-box', mode: 'open' })
export class Tabs extends TabsBase {
    static observedAttributes: string[] = [];
}
