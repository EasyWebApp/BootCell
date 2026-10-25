import { expect } from 'expect';
import { fn } from 'jest-mock';
import { runInAction } from 'mobx';
import { describe, it } from 'node:test';

import { Tab, Tabs } from '../../source/Content/Tabs';
import { render } from '../render';

function tabs() {
    const tabs = new Tabs();
    const first = new Tab();
    const second = new Tab();
    first.caption = 'First';
    second.caption = 'Second';
    tabs.append(first, second);
    runInAction(() => tabs.mountedCallback());
    return tabs;
}

describe('Tabs', () => {
    it('should collect captions and activate only the initial pane', () => {
        const instance = tabs();

        expect(instance.tabMeta).toEqual([
            { caption: 'First' },
            { caption: 'Second' }
        ]);
        expect(instance.children[0].className).toBe('active show');
        expect(instance.children[0].hasAttribute('hidden')).toBe(false);
        expect(instance.children[1].hasAttribute('hidden')).toBe(true);
    });

    it('should switch pane visibility and selected navigation', () => {
        const instance = tabs();
        runInAction(() => {
            instance.currentIndex = 1;
        });
        instance.turnPaneTo(1);
        const root = render(instance.renderContent());
        const links = root.querySelectorAll('a');

        expect(links).toHaveLength(2);
        expect(links[0].getAttribute('aria-selected')).toBe('false');
        expect(links[1].getAttribute('aria-selected')).toBe('true');
        expect(links[1].textContent).toBe('Second');
        expect(instance.children[0].hasAttribute('hidden')).toBe(true);
        expect(instance.children[1].className).toBe('active show');
        expect(root.querySelector('.tab-content > slot')).not.toBeNull();
    });

    it('should prevent navigation and select the clicked tab', () => {
        const instance = tabs();
        const event = new MouseEvent('click', { cancelable: true });
        const stop = fn();
        event.stopPropagation = stop;
        const link = document.createElement('a');
        link.dataset.index = '1';

        runInAction(() => instance.handleTabClick(event, link));

        expect(event.defaultPrevented).toBe(true);
        expect(stop).toHaveBeenCalledTimes(1);
        expect(instance.currentIndex).toBe(1);
    });
});
