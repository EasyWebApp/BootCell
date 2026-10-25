import { expect } from 'expect';
import { fn } from 'jest-mock';
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
});
