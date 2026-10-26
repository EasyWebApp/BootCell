import { expect } from 'expect';
import { describe, it } from 'node:test';
import { Overlay, OverlayTrigger } from '../../source/Prompt/Overlay';
import {
    OverlayPosition,
    RootCloseGuard
} from '../../source/Prompt/OverlayModel';
const tick = (delay = 0) => new Promise(resolve => setTimeout(resolve, delay));

describe('Overlay lifecycle', () => {
    it('positions relative to a target and releases root-close on removal', async () => {
        const target = document.createElement('button');
        document.body.append(target);
        const overlay = new Overlay();
        overlay.target = target;
        overlay.show = true;
        overlay.rootClose = true;
        let hidden = 0;
        overlay.onHide = () => hidden++;
        document.body.append(overlay);
        await tick();
        expect(overlay.style.position).toBe('fixed');
        target.click();
        expect(hidden).toBe(0);
        document.body.click();
        expect(hidden).toBe(1);
        overlay.remove();
        document.body.click();
        expect(hidden).toBe(1);
        target.remove();
    });
    it('supports delayed hover/focus and controlled visibility', async () => {
        const trigger = new OverlayTrigger();
        trigger.append(document.createElement('button'));
        trigger.overlay = <div>Content</div>;
        trigger.delay = { show: 10, hide: 10 };
        document.body.append(trigger);
        await tick();
        trigger.dispatchEvent(new MouseEvent('mouseenter'));
        expect(trigger.visible).toBe(false);
        await tick(20);
        expect(trigger.visible).toBe(true);
        trigger.dispatchEvent(new MouseEvent('mouseleave'));
        await tick(20);
        expect(trigger.visible).toBe(false);
        trigger.show = false;
        trigger.toggle(true);
        await tick(20);
        expect(trigger.visible).toBe(false);
        trigger.remove();
    });
    it('validates targets/placements and removes keyboard guards', () => {
        expect(() =>
            new OverlayPosition(document.createElement('div'), null).connect()
        ).toThrow(TypeError);
        expect(
            () =>
                new OverlayPosition(
                    document.createElement('div'),
                    document.body,
                    // @ts-expect-error Invalid placements must also fail at runtime.
                    'bad'
                )
        ).toThrow(TypeError);
        let closed = 0;
        const guard = new RootCloseGuard(
            () => false,
            () => closed++
        );
        guard.connect(document);
        guard.disconnect();
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
        expect(closed).toBe(0);
    });

    it('flips, aligns, clamps and updates measured positions with cleanup', () => {
        const target = document.createElement('button');
        const content = document.createElement('div');
        content.innerHTML = '<div class="popover bs-popover-top"></div>';
        target.getBoundingClientRect = () =>
            DOMRect.fromRect({ x: 100, y: 2, width: 40, height: 20 });
        content.getBoundingClientRect = () =>
            DOMRect.fromRect({ width: 100, height: 50 });
        const model = new OverlayPosition(content, target, 'top-end');
        model.connect();
        expect(content.style.left).toBe('40px');
        expect(content.style.top).toBe('30px');
        expect(content.dataset.placement).toBe('bottom-end');
        expect(content.querySelector('.bs-popover-bottom')).not.toBeNull();
        target.getBoundingClientRect = () =>
            DOMRect.fromRect({ x: -20, y: 100, width: 40, height: 20 });
        window.dispatchEvent(new Event('resize'));
        expect(content.style.left).toBe('0px');
        expect(content.style.top).toBe('42px');
        model.disconnect();
        target.getBoundingClientRect = () =>
            DOMRect.fromRect({ x: 400, y: 100, width: 40, height: 20 });
        window.dispatchEvent(new Event('resize'));
        expect(content.style.left).toBe('0px');
    });

    it('restores positioning/root-close after reconnect and supports defaultShow', async () => {
        const overlay = new Overlay();
        const target = document.createElement('button');
        document.body.append(target);
        overlay.target = target;
        overlay.defaultShow = true;
        overlay.rootClose = true;
        document.body.append(overlay);
        await tick();
        overlay.remove();
        document.body.append(overlay);
        await tick();
        expect(overlay.visible).toBe(true);
        document.body.click();
        await tick();
        expect(overlay.visible).toBe(false);
        overlay.remove();
        target.remove();
    });

    it('uses the native manual popover top layer when available', async () => {
        const overlay = new Overlay();
        let open = false;
        let shown = 0;
        let hidden = 0;
        overlay.showPopover = () => {
            open = true;
            shown++;
        };
        overlay.hidePopover = () => {
            open = false;
            hidden++;
        };
        const matches = overlay.matches.bind(overlay);
        overlay.matches = selector =>
            selector === ':popover-open' ? open : matches(selector);
        overlay.target = document.body;
        overlay.show = true;
        document.body.append(overlay);
        await tick();
        expect(overlay.popover).toBe('manual');
        expect(shown).toBe(1);
        overlay.remove();
        expect(hidden).toBe(1);
    });
});
