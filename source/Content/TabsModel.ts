import {
    action,
    autorun,
    computed,
    IReactionDisposer,
    observable,
    runInAction
} from 'mobx';

import type { Tab, Tabs, TabSelectionDetail } from './Tabs';

export type TabKey = string | number;
let nextTabsId = 0;

export class TabsModel {
    @observable accessor tabs: Tab[] = [];
    private initialized = false;
    private observer?: MutationObserver;
    private stop?: IReactionDisposer;
    private readonly prefix = `tabs-${++nextTabsId}`;

    constructor(readonly host: Tabs) {}

    @computed
    get vertical() {
        return this.host.vertical || this.host.direction === 'column';
    }

    key(index: number): TabKey {
        return this.tabs[index]?.eventKey ?? index;
    }

    @computed
    get index() {
        const { activeKey, currentIndex } = this.host;
        if (activeKey !== undefined)
            return this.tabs.findIndex(
                (_, index) =>
                    activeKey !== null &&
                    String(this.key(index)) === String(activeKey)
            );

        const index = Math.max(
            0,
            Math.min(this.tabs.length - 1, Math.trunc(currentIndex) || 0)
        );
        if (!this.isDisabled(index)) return this.tabs.length ? index : -1;
        return this.tabs.findIndex((_, index) => !this.isDisabled(index));
    }

    headerId(index: number) {
        return (
            this.host.generateChildId?.(this.key(index), 'tab') ??
            `${this.host.id || this.prefix}-tab-${index}`
        );
    }

    isDisabled(index: number) {
        return !this.tabs[index] || this.tabs[index].disabled;
    }

    @action
    refresh() {
        const selected = this.tabs[this.index];
        const tabs = [...this.host.children].filter(
            (node): node is Tab => node.tagName === 'TAB-PANE'
        );
        if (
            tabs.length !== this.tabs.length ||
            tabs.some((tab, index) => tab !== this.tabs[index])
        ) {
            this.tabs = tabs;
            if (this.initialized && this.host.activeKey === undefined) {
                const index = tabs.indexOf(selected);
                this.host.currentIndex =
                    index >= 0
                        ? index
                        : Math.max(
                              0,
                              Math.min(tabs.length - 1, this.host.currentIndex)
                          );
            }
        }
        if (!this.initialized && tabs.length) {
            this.initialized = true;
            const key = this.host.defaultActiveKey;
            const index = tabs.findIndex(
                (_, index) => String(this.key(index)) === String(key)
            );
            if (key !== undefined && index >= 0) this.host.currentIndex = index;
        }
        this.show();
    }

    mount() {
        this.dispose();
        this.refresh();
        this.observer = new MutationObserver(() => this.refresh());
        this.observer.observe(this.host, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['event-key', 'disabled', 'title', 'id']
        });
        this.stop = autorun(() => this.show());
    }

    dispose() {
        this.observer?.disconnect();
        this.stop?.();
        this.observer = undefined;
        this.stop = undefined;
    }

    show(index = this.index) {
        this.tabs.forEach((tab, position) => {
            if (!tab.id)
                tab.id =
                    this.host.generateChildId?.(this.key(position), 'pane') ??
                    `${this.host.id || this.prefix}-pane-${position}`;
            tab.role = 'tabpanel';
            tab.setAttribute('aria-labelledby', this.headerId(position));
            tab.hidden = position !== index;
            tab.inert = position !== index;
            tab.classList.toggle('active', position === index);
            tab.classList.toggle('show', position === index);
        });
    }

    @action
    select(index: number, event?: Event) {
        if (!Number.isInteger(index) || this.isDisabled(index)) return false;
        if (index === this.index) return true;
        const key = this.key(index);
        if (this.host.activeKey === undefined) this.host.currentIndex = index;
        this.host.onSelect?.(key, event);
        this.host.dispatchEvent(
            new CustomEvent<TabSelectionDetail>('select', {
                detail: { activeKey: key, originalEvent: event },
                bubbles: true,
                composed: true
            })
        );
        return true;
    }

    keyDown(event: KeyboardEvent, index: number) {
        const keys = this.vertical
            ? ['ArrowUp', 'ArrowDown']
            : ['ArrowLeft', 'ArrowRight'];
        if (![...keys, 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        const enabled = this.tabs
            .map((_, index) => index)
            .filter(index => !this.isDisabled(index));
        if (!enabled.length) return;
        const rtl =
            !this.vertical && getComputedStyle(this.host).direction === 'rtl';
        let target: number;
        if (event.key === 'Home') target = enabled[0];
        else if (event.key === 'End') target = enabled[enabled.length - 1];
        else {
            const offset = (event.key === keys[0] ? -1 : 1) * (rtl ? -1 : 1);
            target =
                enabled[
                    (enabled.indexOf(index) + offset + enabled.length) %
                        enabled.length
                ];
        }
        runInAction(() => this.select(target, event));
        this.host.shadowRoot?.getElementById(this.headerId(target))?.focus();
    }
}
