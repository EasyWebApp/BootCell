import { expect } from 'expect';
import { fn } from 'jest-mock';
import { runInAction } from 'mobx';
import { describe, it } from 'node:test';

import { Tab, Tabs } from '../../source/Content/Tabs';
import { render } from '../render';

function createTabs() {
    const instance = new Tabs();
    for (const title of ['First', 'Second', 'Third']) {
        const tab = new Tab();
        tab.caption = title;
        tab.eventKey = title.toLowerCase();
        instance.append(tab);
    }
    return instance;
}

describe('Tabs', () => {
    it('accepts JSX callbacks and reattaches rendering/selection after reconnect', async context => {
        const select = fn();
        const root = render(
            <Tabs onSelect={select}>
                <Tab title="One" eventKey="one" />
                <Tab caption="Two" eventKey="two" />
            </Tabs>
        );
        const instance = root.querySelector<Tabs>('tabs-box');
        const notification = fn();
        instance.addEventListener('select', notification);
        context.after(() => instance.remove());
        document.body.append(instance);
        await new Promise(resolve => setTimeout(resolve, 0));
        (
            instance.shadowRoot.querySelectorAll(
                '[role=tab]'
            )[1] as HTMLButtonElement
        ).click();
        expect(select).toHaveBeenCalledTimes(1);
        expect(select.mock.calls[0][0]).toBe('two');
        expect(notification).toHaveBeenCalledTimes(1);
        expect(
            (notification.mock.calls[0][0] as CustomEvent).detail.activeKey
        ).toBe('two');
        expect(instance.onselect).toBeNull();
        instance.remove();
        document.body.append(instance);
        await new Promise(resolve => setTimeout(resolve, 0));
        (
            instance.shadowRoot.querySelector('[role=tab]') as HTMLButtonElement
        ).click();
        await Promise.resolve();
        expect(select).toHaveBeenCalledTimes(2);
        expect(
            instance.shadowRoot
                .querySelector('[role=tab]')
                .getAttribute('aria-selected')
        ).toBe('true');
    });

    it('keeps the native tooltip title separate from rich tab labels', context => {
        const root = render(
            <Tabs>
                <Tab title="Tooltip" tabTitle={<strong>Rich label</strong>} />
                <Tab caption={<em>Caption</em>} title="Second tooltip" />
            </Tabs>
        );
        const instance = root.querySelector<Tabs>('tabs-box');
        instance.mountedCallback();
        context.after(() => instance.model.dispose());
        const headers = render(instance.renderContent());
        expect(headers.querySelector('[role=tab] strong')?.textContent).toBe(
            'Rich label'
        );
        expect(headers.querySelector('[role=tab] em')?.textContent).toBe(
            'Caption'
        );
        expect((instance.children[0] as Tab).title).toBe('Tooltip');
    });
    it('collects direct panes, assigns unique accessible IDs and activates the default key', context => {
        const instance = createTabs();
        context.after(() => instance.model.dispose());
        instance.defaultActiveKey = 'second';
        instance.mountedCallback();
        expect(instance.model.index).toBe(1);
        expect(instance.tabMeta[0]).toEqual({ caption: 'First' });
        const root = render(instance.renderContent());
        const links = root.querySelectorAll('[role=tab]');
        expect(links).toHaveLength(3);
        expect(links[1].getAttribute('aria-selected')).toBe('true');
        expect(links[1].getAttribute('aria-controls')).toBe(
            instance.children[1].id
        );
        expect(instance.children[1].getAttribute('aria-labelledby')).toBe(
            links[1].id
        );
        expect((instance.children[0] as HTMLElement).hidden).toBe(true);
        expect((instance.children[0] as HTMLElement).inert).toBe(true);
        expect(instance.children[1].className).toBe('active show');
        expect(
            render(instance.render()).querySelector('style').textContent
        ).toContain('@starting-style');
        instance.transition = false;
        expect(
            render(instance.render()).querySelector('style').textContent
        ).not.toContain('@starting-style');
        const other = createTabs();
        other.mountedCallback();
        context.after(() => other.model.dispose());
        expect(other.children[0].id).not.toBe(instance.children[0].id);
    });

    it('keeps controlled keys authoritative and reports user selection once', context => {
        const instance = createTabs();
        context.after(() => instance.model.dispose());
        instance.activeKey = 'first';
        instance.onSelect = fn();
        instance.mountedCallback();
        const target = document.createElement('button');
        target.dataset.tabIndex = '1';
        const event = new MouseEvent('click', { cancelable: true });
        instance.handleTabClick(event, target);
        expect(event.defaultPrevented).toBe(true);
        expect(instance.onSelect).toHaveBeenCalledWith('second', event);
        expect(instance.model.index).toBe(0);
        runInAction(() => {
            instance.activeKey = 'second';
        });
        expect(instance.model.index).toBe(1);
        expect((instance.children[1] as HTMLElement).hidden).toBe(false);
        runInAction(() => {
            instance.activeKey = null;
        });
        expect(
            [...instance.children].every(tab => (tab as HTMLElement).hidden)
        ).toBe(true);
    });

    it('supports currentIndex and skips disabled panes for keyboard navigation', context => {
        const instance = createTabs();
        context.after(() => instance.model.dispose());
        (instance.children[1] as Tab).disabled = true;
        instance.mountedCallback();
        const event = new KeyboardEvent('keydown', {
            key: 'ArrowRight',
            cancelable: true
        });
        instance.model.keyDown(event, 0);
        expect(event.defaultPrevented).toBe(true);
        expect(instance.currentIndex).toBe(2);
        instance.model.keyDown(
            new KeyboardEvent('keydown', { key: 'Home' }),
            2
        );
        expect(instance.currentIndex).toBe(0);
        instance.model.keyDown(new KeyboardEvent('keydown', { key: 'End' }), 0);
        expect(instance.currentIndex).toBe(2);
        instance.model.select(1);
        expect(instance.currentIndex).toBe(2);
        runInAction(() => {
            instance.currentIndex = 0;
        });
        expect((instance.children[0] as HTMLElement).hidden).toBe(false);
        instance.model.select(99);
        expect(instance.currentIndex).toBe(0);
    });

    it('renders pills/list, vertical layouts, fill/justify and title compatibility', context => {
        const instance = createTabs();
        context.after(() => instance.model.dispose());
        instance.variant = 'pills';
        instance.vertical = true;
        instance.fill = true;
        instance.justify = true;
        instance.mountedCallback();
        const root = render(instance.renderContent());
        expect(
            root.querySelector('.nav-pills.flex-column.nav-fill.nav-justified')
        ).not.toBeNull();
        expect(
            root.querySelector('nav')?.getAttribute('aria-orientation')
        ).toBe('vertical');
        instance.variant = 'list';
        expect(
            render(instance.renderContent()).querySelectorAll(
                '.list-group-item'
            )
        ).toHaveLength(3);
        instance.model.keyDown(
            new KeyboardEvent('keydown', { key: 'ArrowDown' }),
            0
        );
        expect(instance.currentIndex).toBe(1);
    });

    it('honors custom IDs, RTL arrows and empty/disabled keyboard boundaries', context => {
        const instance = createTabs();
        context.after(() => instance.model.dispose());
        instance.generateChildId = (key, type) => `${type}-${key}`;
        instance.style.direction = 'rtl';
        instance.mountedCallback();
        expect(instance.children[0].id).toBe('pane-first');
        expect(instance.model.headerId(0)).toBe('tab-first');
        instance.model.keyDown(
            new KeyboardEvent('keydown', { key: 'ArrowRight' }),
            0
        );
        expect(instance.currentIndex).toBe(2);
        instance.model.keyDown(
            new KeyboardEvent('keydown', { key: 'Escape' }),
            2
        );
        expect(instance.currentIndex).toBe(2);
        runInAction(() => {
            instance.model.tabs.forEach(tab => {
                tab.disabled = true;
            });
        });
        expect(instance.model.index).toBe(-1);
        expect(() =>
            instance.model.keyDown(
                new KeyboardEvent('keydown', { key: 'Home' }),
                0
            )
        ).not.toThrow();
    });

    it('synchronizes inserted, reordered and removed panes without selecting nested tabs', async context => {
        const instance = createTabs();
        context.after(() => instance.model.dispose());
        instance.mountedCallback();
        instance.model.select(1);
        const selected = instance.children[1];
        instance.prepend(selected);
        await Promise.resolve();
        expect(instance.currentIndex).toBe(0);
        selected.remove();
        await Promise.resolve();
        expect(instance.model.tabs).toHaveLength(2);
        expect(instance.model.index).toBe(0);
        const nested = new Tab();
        instance.children[0].append(nested);
        await Promise.resolve();
        expect(instance.model.tabs).toHaveLength(2);
        instance.replaceChildren();
        await Promise.resolve();
        expect(instance.model.index).toBe(-1);
        expect(() => instance.model.select(0)).not.toThrow();
    });
});
