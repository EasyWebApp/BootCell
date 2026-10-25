import { expect } from 'expect';
import { describe, it } from 'node:test';

import { Collapse } from '../../source/Layout/Collapse';
import { render } from '../render';

describe('Collapse', () => {
    it('defaults to vertical height collapse, matching React-Bootstrap', () => {
        expect(
            render(<Collapse in>Content</Collapse>).firstElementChild.className
        ).toBe('collapse show');
        expect(render(<Collapse />).firstElementChild.className).toBe(
            'collapse'
        );
    });
    it('uses horizontal collapse only for width, including a dimension resolver', () => {
        expect(
            render(<Collapse dimension="width" />).firstElementChild.className
        ).toBe('collapse collapse-horizontal');
        expect(
            render(<Collapse dimension={() => 'width'} in />).firstElementChild
                .className
        ).toBe('collapse collapse-horizontal show');
    });
    it('reports native transition completion without reacting to child transitions', () => {
        const calls: string[] = [];
        const root = render(
            <Collapse in onEntered={node => calls.push(node.tagName)}>
                <span>Content</span>
            </Collapse>
        );
        root.querySelector('span').dispatchEvent(
            new Event('transitionend', { bubbles: true })
        );
        expect(calls).toEqual([]);
        root.firstElementChild.dispatchEvent(new Event('transitionend'));
        expect(calls).toEqual(['DIV']);
    });
});
