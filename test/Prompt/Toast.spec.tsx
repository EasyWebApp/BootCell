import { expect } from 'expect';
import { describe, it } from 'node:test';
import {
    Toast,
    ToastBox,
    ToastBody,
    ToastHeader
} from '../../source/Prompt/Toast';
import { render } from '../render';

const tick = (delay = 0) => new Promise(resolve => setTimeout(resolve, delay));

describe('Toast', () => {
    it('uses Bootstrap 6 animation, foreground and themed close classes', () => {
        const toast = new Toast();
        toast.animation = false;
        toast.show = false;
        toast.title = 'Title';
        toast.time = 'now';
        const root = render(toast.render());
        const box = root.querySelector('.toast');
        expect(box.classList.contains('toast-instant')).toBe(true);
        expect(box.matches('.fade, .hide, .show')).toBe(false);
        expect(root.querySelector('.fg-2').textContent).toBe('now');
        const header = render(
            <ToastHeader closeVariant="white">Header</ToastHeader>
        );
        expect(
            header
                .querySelector('.btn-close')
                .classList.contains('btn-close-white')
        ).toBe(false);
        expect(
            header.querySelector('.btn-close').getAttribute('data-bs-theme')
        ).toBe('dark');
    });

    it('restarts autohide when delay changes while visible', async () => {
        const toast = new Toast();
        toast.autohide = true;
        toast.delay = 100;
        document.body.append(toast);
        await tick(20);
        toast.delay = 10;
        await tick(35);
        expect(toast.visible).toBe(false);
        toast.remove();
    });

    it('renders composable header/body and legacy JSX content', async () => {
        const toast = new Toast();
        toast.icon = <b>icon</b>;
        toast.title = 'Test';
        toast.time = 'just now';
        document.body.append(toast);
        await tick();
        expect(
            toast.shadowRoot.querySelector('.toast-header strong').textContent
        ).toBe('Test');
        expect(
            toast.shadowRoot.querySelector('.toast-header b').textContent
        ).toBe('icon');
        expect(
            toast.shadowRoot.querySelector('.toast').getAttribute('aria-live')
        ).toBe('assertive');
        toast.shadowRoot.querySelector<HTMLButtonElement>('.btn-close').click();
        await tick();
        expect(toast.visible).toBe(false);
        toast.remove();
        const root = render(
            <div>
                <ToastHeader closeButton={false}>Title</ToastHeader>
                <ToastBody>Body</ToastBody>
            </div>
        );
        expect(root.querySelector('.btn-close')).toBeNull();
        expect(root.querySelector('.toast-body').textContent).toBe('Body');
    });

    it('autohides once, respects controlled state and cancels on disconnect', async () => {
        const toast = new Toast();
        let closed = 0;
        toast.onClose = () => closed++;
        toast.show = true;
        toast.autohide = true;
        toast.delay = 15;
        document.body.append(toast);
        await tick(40);
        expect(closed).toBe(1);
        expect(toast.visible).toBe(true);
        toast.show = false;
        await tick();
        toast.show = true;
        await tick();
        toast.remove();
        await tick(30);
        expect(closed).toBe(1);
    });

    it('rejects invalid delays', () => {
        const toast = new Toast();
        toast.delay = -1;
        expect(() => toast.updatedCallback()).toThrow(RangeError);
    });

    it('preserves legacy delay-only autohide without hiding zero-delay toasts', async () => {
        const toast = new ToastBox();
        document.body.append(toast);
        await tick(20);
        expect(toast.visible).toBe(true);
        toast.delay = 10;
        await tick(30);
        expect(toast.visible).toBe(false);
        toast.remove();
    });
});
