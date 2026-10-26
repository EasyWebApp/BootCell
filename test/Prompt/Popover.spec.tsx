import { expect } from 'expect';
import { describe, it } from 'node:test';
import {
    Popover,
    PopoverBody,
    PopoverBox,
    PopoverHeader
} from '../../source/Prompt/Popover';
import { render } from '../render';
const tick = () => new Promise(resolve => setTimeout(resolve, 0));

describe('Popover', () => {
    it('composes header/body and supports placement and JSX', () => {
        const root = render(
            <Popover placement="left-start">
                <PopoverHeader>
                    <b>Title</b>
                </PopoverHeader>
                <PopoverBody>Body</PopoverBody>
            </Popover>
        );
        expect(root.querySelector('.bs-popover-start')).not.toBeNull();
        expect(root.querySelector('.popover-header b').textContent).toBe(
            'Title'
        );
        expect(root.querySelector('.popover-body').textContent).toBe('Body');
        expect(
            render(<Popover body>Content</Popover>).querySelector(
                '.popover-body'
            ).textContent
        ).toBe('Content');
    });
    it('toggles on trigger click and dismisses on outside click/Escape', async () => {
        const box = new PopoverBox();
        box.header = <b>Title</b>;
        box.body = <i>Body</i>;
        const button = document.createElement('button');
        box.append(button);
        document.body.append(box);
        await tick();
        button.click();
        await tick();
        expect(box.visible).toBe(true);
        expect(button.hasAttribute('aria-describedby')).toBe(true);
        expect(
            box.shadowRoot.querySelector('overlay-box').shadowRoot
        ).not.toBeNull();
        document.body.click();
        await tick();
        expect(box.visible).toBe(false);
        expect(button.hasAttribute('aria-describedby')).toBe(false);
        button.click();
        await tick();
        document.dispatchEvent(
            new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
        );
        await tick();
        expect(box.visible).toBe(false);
        box.remove();
    });

    it('preserves legacy shown/position aliases and controlled JSX callbacks', async () => {
        let requested: boolean;
        const root = render(
            <PopoverBox
                show={false}
                onToggle={show => (requested = show)}
                header={<b>Title</b>}
                body={<i>Content</i>}
                position="bottom"
            >
                <button>Open</button>
            </PopoverBox>
        );
        document.body.append(root);
        await tick();
        const box = root.querySelector<PopoverBox>('popover-box');
        root.querySelector('button').click();
        await tick();
        expect(requested).toBe(true);
        expect(box.visible).toBe(false);
        expect(box.placement).toBe('bottom');
        root.remove();
        const legacy = new PopoverBox();
        legacy.shown = true;
        expect(legacy.shown).toBe(true);
    });
});
