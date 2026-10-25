import { assertLooksLike } from '@tech_query/snabbdom-looks-like';
import { createCell } from 'web-cell';

import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle
} from '../../source/Navigator/Dropdown';

describe('Menu', () => {
    it('should render Bootstrap 6 menu classes', () => {
        assertLooksLike(
            <Dropdown>
                <DropdownToggle>Actions</DropdownToggle>
                <DropdownMenu>
                    <DropdownItem href="/edit">Edit</DropdownItem>
                </DropdownMenu>
            </Dropdown>,
            <div className="">
                <button type="button" className="btn">
                    Actions
                </button>
                <div className="menu ">
                    <a className="menu-item " href="/edit">
                        Edit
                    </a>
                </div>
            </div>
        );
    });
});
