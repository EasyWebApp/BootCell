import { expect } from 'expect';
import { describe, it } from 'node:test';
import { runInAction } from 'mobx';

import { CountDown } from '../../source/Calendar/CountDown';

describe('CountDown', () => {
    it('should register a custom element using stage-3 decorators', () => {
        expect(customElements.get('count-down')).toBe(CountDown);
        expect(document.createElement('count-down')).toBeInstanceOf(CountDown);
    });

    it('should derive time sections from observable state', () => {
        const counter = new CountDown();

        runInAction(() => {
            counter.rest = 90_061_000;
        });

        expect(counter.timeSections).toEqual([
            { value: 1, label: 'D' },
            { value: 1, label: 'h' },
            { value: 1, label: 'm' },
            { value: 1, label: 's' }
        ]);
    });

    it('should render padded time sections with the automatic JSX runtime', () => {
        const counter = new CountDown();
        const tree = counter.render();

        expect(tree.tagName).toBe('ol');
        expect(
            tree.children.map(({ children }) => children[0].children[0].text)
        ).toEqual(['00', '00', '00', '00']);
        expect(
            tree.children.map(
                ({ children }) => children[0].children[1].children[0].text
            )
        ).toEqual(['D', 'h', 'm', 's']);
    });
});
