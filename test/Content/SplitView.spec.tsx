import { expect } from 'expect';
import { describe, it } from 'node:test';
import { fn } from 'jest-mock';
import { setTimeout } from 'node:timers/promises';

import { SplitView } from '../../source/Content/SplitView';
import { render } from '../render';

describe('SplitView', () => {
    it('should load shadow styles and reserve a nonshrinking draggable divider', async () => {
        const root = render(
            <SplitView>
                <div slot="left">Left</div>
                <div slot="right">Right</div>
            </SplitView>
        );
        document.body.append(root);
        await setTimeout(0);
        const split = root.querySelector<SplitView>('split-view');
        expect(split.shadowRoot.querySelector('link').href).toContain(
            'bootstrap@6.0.0-alpha.1'
        );
        expect(split.shadowRoot.querySelector('style').textContent).toContain(
            'display: flex'
        );
        const divider =
            split.shadowRoot.querySelector<HTMLElement>('[role="separator"]');
        expect(divider.style.width).toBe('0.5rem');
        expect(divider.style.flexShrink).toBe('0');
        expect(divider.style.touchAction).toBe('none');
        expect(
            (divider.previousElementSibling as HTMLElement).style.minWidth
        ).toBe('0px');
        expect((divider.nextElementSibling as HTMLElement).style.minWidth).toBe(
            '0px'
        );
        root.remove();
    });

    it('should use fresh layout bounds, clamp widths and release pointer capture on cancel', async () => {
        const root = render(<SplitView />);
        document.body.append(root);
        await setTimeout(0);
        const split = root.querySelector<SplitView>('split-view');
        const divider =
            split.shadowRoot.querySelector<HTMLElement>('[role="separator"]');
        const left = divider.previousElementSibling as HTMLElement;
        let captured = false,
            x = 20,
            width = 400;
        const capture = fn((_: number) => {
            captured = true;
        });
        const release = fn((_: number) => {
            captured = false;
        });
        Object.assign(divider, {
            setPointerCapture: capture,
            releasePointerCapture: release,
            hasPointerCapture: () => captured
        });
        Object.defineProperty(split, 'clientWidth', { get: () => width });
        Object.defineProperty(divider, 'offsetWidth', { value: 8 });
        left.getBoundingClientRect = () => DOMRect.fromRect({ x });
        const pointer = (type: string, clientX = 0) => {
            const event = new Event(type);
            Object.assign(event, { pointerId: 1, clientX });
            divider.dispatchEvent(event);
        };
        pointer('pointermove', 200);
        expect(left.style.width).toBe('25%');
        pointer('pointerdown');
        expect(capture).toHaveBeenCalledWith(1);
        pointer('pointermove', 200);
        expect(left.style.width).toBe('180px');
        x = 100;
        width = 250;
        pointer('pointermove', 200);
        expect(left.style.width).toBe('100px');
        pointer('pointermove', 1000);
        expect(left.style.width).toBe('242px');
        pointer('pointermove', 10);
        expect(left.style.width).toBe('0px');
        pointer('pointercancel');
        expect(release).toHaveBeenCalledWith(1);
        pointer('pointermove', 200);
        expect(left.style.width).toBe('0px');
        root.remove();
    });
});
