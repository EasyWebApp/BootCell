import { assertLooksLike } from '@tech_query/snabbdom-looks-like';
import { createCell } from 'web-cell';

import { Offcanvas, OffcanvasBody } from '../../source/Layout/Offcanvas';

describe('Drawer', () => {
    it('should render a native dialog with Bootstrap 6 drawer markup', () => {
        assertLooksLike(
            <Offcanvas show backdrop="static">
                <OffcanvasBody>Content</OffcanvasBody>
            </Offcanvas>,
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
            <Offcanvas show backdrop={false} />,
            <dialog
                className="drawer drawer-end"
                tabIndex={-1}
                data-bs-backdrop="false"
            />
        );
    });
});
