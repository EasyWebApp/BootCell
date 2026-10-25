import { assertLooksLike } from '@tech_query/snabbdom-looks-like';
import { createCell } from 'web-cell';

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
            />
        );
    });
});
