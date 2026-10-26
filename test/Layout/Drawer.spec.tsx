import { expect } from 'expect';
import { fn } from 'jest-mock';
import { DOMRenderer } from 'dom-renderer';
import { describe, it } from 'node:test';
import { assertLooksLike, render } from '../render';
import { Drawer, DrawerBody } from '../../source/Layout/Drawer';

describe('Drawer', () => {
    it('should render a native dialog with Bootstrap 6 drawer markup', () => {
        assertLooksLike(
            <Drawer show backdrop="static">
                <DrawerBody>Content</DrawerBody>
            </Drawer>,
            <dialog
                className="drawer drawer-end"
                tabIndex={-1}
                data-bs-backdrop="static"
            >
                <div className="drawer-body ">Content</div>
            </dialog>
        );
    });

    it('should mark a drawer with no backdrop', () => {
        assertLooksLike(
            <Drawer show backdrop={false} />,
            <dialog
                className="drawer drawer-end"
                tabIndex={-1}
                data-bs-backdrop="false"
                style={{ '--drawer-backdrop-bg': 'transparent' }}
            />
        );
    });

    it('should choose modal or nonmodal opening and close an open drawer', () => {
        const dialog = Object.assign(document.createElement('dialog'), {
            show: fn(),
            showModal: fn(),
            close: fn()
        });

        Drawer({ show: true }).ref(dialog);
        expect(dialog.showModal).toHaveBeenCalledTimes(1);
        Drawer({ show: true, backdrop: false }).ref(dialog);
        expect(dialog.show).toHaveBeenCalledTimes(1);
        dialog.open = true;
        Drawer({}).ref(dialog);
        expect(dialog.close).toHaveBeenCalledTimes(1);
    });

    it('should notify cancellation and backdrop clicks but not child clicks', () => {
        const onHide = fn();
        const root = render(
            <Drawer onHide={onHide}>
                <DrawerBody>Content</DrawerBody>
            </Drawer>
        );
        const dialog = root.querySelector('dialog');

        dialog.querySelector('div').click();
        expect(onHide).not.toHaveBeenCalled();
        dialog.click();
        dialog.dispatchEvent(new Event('cancel'));
        expect(onHide).toHaveBeenCalledTimes(2);

        const staticDialog = render(
            <Drawer backdrop="static" onHide={onHide} />
        ).querySelector('dialog');
        staticDialog.click();
        expect(onHide).toHaveBeenCalledTimes(2);
    });

    it('should synchronize visibility and modality on the same rendered dialog', () => {
        const root = document.createElement('div');
        const renderer = new DOMRenderer();
        const ref = fn();
        const view = (show: boolean, backdrop: boolean | 'static' = true) => (
            <Drawer show={show} backdrop={backdrop} ref={ref}>
                <DrawerBody>Content</DrawerBody>
            </Drawer>
        );
        renderer.render(view(false), root);

        const dialog = root.querySelector('dialog');
        const show = fn(() => (dialog.open = true));
        const showModal = fn(() => (dialog.open = true));
        const close = fn(() => (dialog.open = false));
        Object.assign(dialog, { show, showModal, close });

        expect(ref).toHaveBeenCalledWith(dialog);
        renderer.render(view(true), root);
        expect(root.querySelector('dialog')).toBe(dialog);
        expect(dialog.open).toBe(true);
        expect(dialog.dataset.bsOpen).toBe('true');
        expect(showModal).toHaveBeenCalledTimes(1);
        expect(ref).toHaveBeenCalledTimes(1);

        renderer.render(view(true), root);
        expect(showModal).toHaveBeenCalledTimes(1);
        renderer.render(view(true, false), root);
        expect(close).toHaveBeenCalledTimes(1);
        expect(show).toHaveBeenCalledTimes(1);
        renderer.render(view(true, 'static'), root);
        expect(close).toHaveBeenCalledTimes(2);
        expect(showModal).toHaveBeenCalledTimes(2);
        renderer.render(view(false), root);
        expect(dialog.open).toBe(false);
        expect(dialog.dataset.bsOpen).toBe('false');
        expect(close).toHaveBeenCalledTimes(3);
        renderer.render(<div />, root);
        expect(ref).toHaveBeenLastCalledWith(undefined);
    });
});
