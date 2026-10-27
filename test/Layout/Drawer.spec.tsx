import { expect } from 'expect';
import { fn } from 'jest-mock';
import { DOMRenderer } from 'dom-renderer';
import { describe, it } from 'node:test';
import { setTimeout } from 'node:timers/promises';

import { render } from '../render';
import { Drawer, DrawerBody } from '../../source/Layout/Drawer';

describe('Drawer', () => {
    it('should render a native dialog and project children into its shadow root', async () => {
        const root = render(
            <Drawer backdrop="static">
                <DrawerBody>Content</DrawerBody>
            </Drawer>
        );
        document.body.append(root);
        await setTimeout(0);

        const drawer = root.querySelector('drawer-box') as Drawer,
            { dialog } = drawer;

        expect(dialog).not.toBeNull();
        expect(dialog.className).toBe('drawer drawer-end drawer-static');
        expect(dialog.tabIndex).toBe(-1);
        expect(dialog.dataset.bsBackdrop).toBe('static');
        expect(dialog.dataset.bsOpen).toBe('false');
        expect(drawer.shadowRoot.querySelector('slot')).not.toBeNull();
        expect(drawer.querySelector('.drawer-body').textContent).toBe(
            'Content'
        );
        root.remove();
    });

    it('should mark a drawer with no backdrop', async () => {
        const root = render(<Drawer backdrop={false} />);
        document.body.append(root);
        await setTimeout(0);

        const { dialog } = root.querySelector('drawer-box') as Drawer;
        expect(dialog.dataset.bsBackdrop).toBe('false');
        expect(dialog.style.getPropertyValue('--drawer-backdrop-bg')).toBe(
            'transparent'
        );
        root.remove();
    });

    it('should notify cancellation and backdrop clicks but not child clicks', async () => {
        const onHide = fn();
        const root = render(
            <Drawer onHide={onHide}>
                <DrawerBody>Content</DrawerBody>
            </Drawer>
        );
        document.body.append(root);
        await setTimeout(0);

        const { dialog } = root.querySelector('drawer-box') as Drawer;

        root.querySelector<HTMLElement>('.drawer-body').click();
        expect(onHide).not.toHaveBeenCalled();
        dialog.click();
        dialog.dispatchEvent(new Event('cancel'));
        expect(onHide).toHaveBeenCalledTimes(2);

        const staticDialog = render(
            <Drawer backdrop="static" onHide={onHide} />
        );
        document.body.append(staticDialog);
        await setTimeout(0);
        (staticDialog.querySelector('drawer-box') as Drawer).dialog.click();
        staticDialog.click();
        expect(onHide).toHaveBeenCalledTimes(2);
        root.remove();
        staticDialog.remove();
    });

    it('should synchronize visibility and modality on the same rendered dialog', async () => {
        const root = document.createElement('div');
        const renderer = new DOMRenderer();
        const ref = fn();
        const view = (show: boolean, backdrop: boolean | 'static' = true) => (
            <Drawer show={show} backdrop={backdrop} ref={ref}>
                <DrawerBody>Content</DrawerBody>
            </Drawer>
        );
        document.body.append(root);
        renderer.render(view(false), root);
        await setTimeout(0);

        const drawer = root.querySelector('drawer-box') as Drawer,
            { dialog } = drawer;
        const show = fn(() => (dialog.open = true));
        const showModal = fn(() => (dialog.open = true));
        const close = fn(() => (dialog.open = false));
        Object.assign(dialog, { show, showModal, close });

        expect(ref).toHaveBeenCalledWith(drawer);
        renderer.render(view(true), root);
        await setTimeout(0);
        expect(drawer.dialog).toBe(dialog);
        expect(drawer.querySelector('.drawer-body').textContent).toBe(
            'Content'
        );
        expect(dialog.open).toBe(true);
        expect(dialog.dataset.bsOpen).toBe('true');
        expect(showModal).toHaveBeenCalledTimes(1);
        expect(ref).toHaveBeenCalledTimes(1);

        renderer.render(view(true), root);
        await setTimeout(0);
        expect(showModal).toHaveBeenCalledTimes(1);
        renderer.render(view(true, false), root);
        await setTimeout(0);
        expect(close).toHaveBeenCalledTimes(1);
        expect(show).toHaveBeenCalledTimes(1);
        renderer.render(view(true, 'static'), root);
        await setTimeout(0);
        expect(close).toHaveBeenCalledTimes(2);
        expect(showModal).toHaveBeenCalledTimes(2);
        renderer.render(view(false), root);
        await setTimeout(0);
        expect(dialog.open).toBe(false);
        expect(dialog.dataset.bsOpen).toBe('false');
        expect(close).toHaveBeenCalledTimes(3);
        renderer.render(<div />, root);
        expect(ref).toHaveBeenLastCalledWith();
        root.remove();
    });
});
