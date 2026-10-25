import { action, computed, observable } from 'mobx';

export class TableSelectionModel<Key extends string | number = string> {
    @observable accessor keys: Key[] = [];
    @observable accessor selected = new Set<Key>();

    constructor(keys: readonly Key[] = [], selected: readonly Key[] = []) {
        this.keys = [...new Set(keys)];
        this.selected = new Set(
            selected.filter(key => this.keys.includes(key))
        );
    }

    @computed get checked() {
        return (
            !!this.keys.length && this.keys.every(key => this.selected.has(key))
        );
    }

    @computed get indeterminate() {
        return !this.checked && this.keys.some(key => this.selected.has(key));
    }

    @action setKeys(keys: readonly Key[]) {
        this.keys = [...new Set(keys)];
        this.selected = new Set(
            [...this.selected].filter(key => this.keys.includes(key))
        );
    }

    @action toggle(key: Key, checked = !this.selected.has(key)) {
        if (!this.keys.includes(key))
            throw new RangeError(`Unknown table row: ${key}`);
        if (checked) this.selected.add(key);
        else this.selected.delete(key);
    }

    @action toggleAll(checked = !this.checked) {
        this.selected = new Set(checked ? this.keys : []);
    }
}
