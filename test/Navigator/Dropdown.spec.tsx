import { describe, it } from 'node:test';
import { assertLooksLike } from '../render';
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
