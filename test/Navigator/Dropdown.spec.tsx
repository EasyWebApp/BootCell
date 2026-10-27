import { describe, it } from 'node:test';
import { expect } from 'expect';
import { runInAction } from 'mobx';
import { setTimeout } from 'node:timers/promises';
import { assertLooksLike, render } from '../render';
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    DropdownButton
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

    it('should update the theme of an existing dropdown button', async () => {
        const root = render(
            <DropdownButton caption="Actions" theme="danger" />
        );
        document.body.append(root);
        await setTimeout(0);

        const button = root.querySelector<DropdownButton>('dropdown-button');
        const toggle = button.shadowRoot.querySelector('button');
        expect(toggle.classList.contains('theme-danger')).toBe(true);

        runInAction(() => (button.theme = 'success'));
        await setTimeout(0);
        const updatedToggle = button.shadowRoot.querySelector('button');
        expect(updatedToggle.classList.contains('theme-success')).toBe(true);
        expect(updatedToggle.classList.contains('theme-danger')).toBe(false);

        root.remove();
    });
});
