import { action, observable } from 'mobx';

import type { Wizard } from './Wizard';
import { TabsModel } from './TabsModel';
import type { TabSelectionDetail } from './Tabs';

export class WizardModel extends TabsModel {
    declare readonly host: Wizard;
    @observable accessor furthestIndex = 0;

    isDisabled(index: number) {
        const { activeKey, currentIndex } = this.host;
        const activeIndex =
            activeKey === undefined
                ? currentIndex
                : this.tabs.findIndex(
                      (_, position) =>
                          activeKey !== null &&
                          String(this.key(position)) === String(activeKey)
                  );
        return (
            super.isDisabled(index) ||
            (this.host.linear &&
                index > Math.max(this.furthestIndex, activeIndex))
        );
    }

    @action
    next(event?: Event) {
        const pane = this.tabs[this.index];
        if (
            !pane ||
            [...pane.querySelectorAll('form')].some(
                form => !form.reportValidity()
            )
        )
            return false;
        let next = this.index + 1;
        while (this.tabs[next]?.disabled) next++;
        if (!this.tabs[next]) {
            const detail: TabSelectionDetail = {
                activeKey: this.key(this.index),
                originalEvent: event
            };
            this.host.onComplete?.(event);
            this.host.dispatchEvent(
                new CustomEvent<TabSelectionDetail>('complete', {
                    detail,
                    bubbles: true,
                    composed: true
                })
            );
            return true;
        }
        this.furthestIndex = Math.max(this.furthestIndex, next);
        return this.select(next, event);
    }

    previous(event?: Event) {
        let previous = this.index - 1;
        while (this.tabs[previous]?.disabled) previous--;
        return this.select(previous, event);
    }
}
