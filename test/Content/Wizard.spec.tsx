import { expect } from 'expect';
import { fn, spyOn } from 'jest-mock';
import { runInAction } from 'mobx';
import { describe, it } from 'node:test';

import { Tab, Tabs } from '../../source/Content/Tabs';
import { Wizard } from '../../source/Content/Wizard';
import { render } from '../render';

function createWizard() {
    const wizard = new Wizard();
    for (const caption of ['Details', 'Confirm']) {
        const pane = new Tab();
        pane.caption = caption;
        wizard.append(pane);
    }
    return wizard;
}

describe('Wizard', () => {
    it('accepts JSX configuration and completion callbacks', async context => {
        const complete = fn();
        const root = render(
            <Wizard linear={false} onComplete={complete}>
                <Tab caption="Only" />
            </Wizard>
        );
        const wizard = root.querySelector<Wizard>('wizard-box');
        const mounted = spyOn(wizard, 'mountedCallback');
        const completeEvent = fn();
        wizard.addEventListener('complete', completeEvent);
        document.body.append(wizard);
        context.after(() => wizard.remove());
        await new Promise(resolve => setTimeout(resolve, 0));
        expect(mounted).toHaveBeenCalledTimes(1);
        expect(wizard.mounted).toBe(true);
        expect(
            wizard.shadowRoot.querySelector('[role=tab]')?.textContent
        ).toContain('Only');
        expect(Wizard.observedAttributes).toContain('linear');
        expect(Tabs.observedAttributes).not.toContain('linear');
        wizard.next();
        expect(complete).toHaveBeenCalledTimes(1);
        expect(completeEvent).toHaveBeenCalledTimes(1);
        expect(
            (completeEvent.mock.calls[0][0] as CustomEvent).detail.activeKey
        ).toBe(0);
        expect(wizard.oncomplete).toBeNull();
        expect(wizard.linear).toBe(false);
    });
    it('owns linear progression, valid forms, backward reset and final completion', context => {
        const wizard = createWizard();
        context.after(() => wizard.model.dispose());
        const form = document.createElement('form');
        const input = document.createElement('input');
        input.required = true;
        form.append(input);
        wizard.children[0].append(form);
        wizard.mountedCallback();
        wizard.model.select(1);
        expect(wizard.model.index).toBe(0);
        expect(wizard.next()).toBe(false);
        input.value = 'Valid';
        expect(wizard.next()).toBe(true);
        expect(wizard.currentIndex).toBe(1);
        expect(wizard.previous()).toBe(true);
        expect(wizard.currentIndex).toBe(0);
        wizard.next();
        wizard.onComplete = fn();
        expect(wizard.next()).toBe(true);
        expect(wizard.onComplete).toHaveBeenCalledTimes(1);
        expect(wizard.currentIndex).toBe(1);
        const root = render(wizard.renderContent());
        expect(root.querySelectorAll('[role=tab]')).toHaveLength(2);
        expect(
            root.querySelectorAll('[role=tab]')[1].getAttribute('aria-controls')
        ).toBe(wizard.children[1].id);
    });

    it('wires form submit/reset without browser navigation and cleans up on disconnect', async context => {
        const wizard = createWizard();
        const first = document.createElement('form');
        const second = document.createElement('form');
        wizard.children[0].append(first);
        wizard.children[1].append(second);
        document.body.append(wizard);
        context.after(() => wizard.remove());
        await new Promise(resolve => setTimeout(resolve, 0));
        const submit = new Event('submit', { bubbles: true, cancelable: true });
        first.dispatchEvent(submit);
        expect(submit.defaultPrevented).toBe(true);
        expect(wizard.currentIndex).toBe(1);
        await Promise.resolve();
        expect(
            wizard.shadowRoot
                .querySelectorAll('[role=tab]')[1]
                .getAttribute('aria-selected')
        ).toBe('true');
        expect(wizard.children[1].hasAttribute('hidden')).toBe(false);
        second.dispatchEvent(new Event('reset', { bubbles: true }));
        expect(wizard.currentIndex).toBe(0);
        wizard.remove();
        first.dispatchEvent(
            new Event('submit', { bubbles: true, cancelable: true })
        );
        expect(wizard.currentIndex).toBe(0);
    });

    it('permits nonlinear selection and respects controlled keys', context => {
        const wizard = createWizard();
        context.after(() => wizard.model.dispose());
        wizard.linear = false;
        wizard.activeKey = 0;
        wizard.onSelect = fn();
        wizard.mountedCallback();
        wizard.model.select(1);
        expect(wizard.model.index).toBe(0);
        expect(wizard.onSelect).toHaveBeenCalledWith(1, undefined);
        runInAction(() => {
            wizard.activeKey = 1;
        });
        expect(wizard.model.index).toBe(1);
        runInAction(() => {
            wizard.linear = true;
        });
        expect(wizard.model.isDisabled(1)).toBe(false);
    });
});
