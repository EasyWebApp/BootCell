import { describe, it } from 'node:test';
import { expect } from 'expect';
import { runInAction } from 'mobx';
import { fn } from 'jest-mock';
import { setTimeout } from 'node:timers/promises';
import { assertLooksLike } from 'dom-renderer/assert';
import { render } from '../render';
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

    it('should anchor the menu below a positioned trigger container', () => {
        expect(Dropdown({}).style.position).toBe('relative');
        expect(DropdownMenu({}).style).toMatchObject({
            insetBlockStart: '100%',
            insetInlineStart: '0'
        });
    });

    it('should toggle without replacing the button and close on outside clicks', async () => {
        const root = render(<DropdownButton caption="Actions" />);
        document.body.append(root);
        await setTimeout(0);

        const dropdown = root.querySelector<DropdownButton>('dropdown-button');
        const toggle = dropdown.shadowRoot.querySelector('button');
        toggle.click();
        await setTimeout(0);

        expect(dropdown.show).toBe(true);
        expect(dropdown.shadowRoot.querySelector('button')).toBe(toggle);
        expect(toggle.getAttribute('aria-expanded')).toBe('true');
        toggle.click();
        await setTimeout(0);
        expect(dropdown.show).toBe(false);

        toggle.click();
        document.body.click();
        expect(dropdown.show).toBe(false);
        toggle.click();
        const outside = root.appendChild(document.createElement('button'));
        outside.addEventListener('click', event => event.stopPropagation());
        outside.click();
        expect(dropdown.show).toBe(false);
        root.remove();
    });

    it('should distinguish shadow and slotted clicks from outside clicks, without blocking navigation', async () => {
        const root = render(
            <DropdownButton caption="Actions">
                <button type="button">Inside</button>
                <DropdownItem href="#destination">Destination</DropdownItem>
            </DropdownButton>
        );
        document.body.append(root);
        await setTimeout(0);

        const dropdown = root.querySelector<DropdownButton>('dropdown-button');
        dropdown.shadowRoot.querySelector('button').click();
        dropdown.querySelector('button').click();
        expect(dropdown.show).toBe(true);

        dropdown.shadowRoot
            .querySelector('.menu')
            .dispatchEvent(
                new MouseEvent('click', { bubbles: true, composed: true })
            );
        expect(dropdown.show).toBe(true);

        const navigate = fn();
        dropdown.querySelector('a').addEventListener('click', navigate);
        const click = new MouseEvent('click', {
            bubbles: true,
            composed: true,
            cancelable: true
        });
        dropdown.querySelector('a').dispatchEvent(click);
        expect(navigate).toHaveBeenCalledTimes(1);
        expect(click.defaultPrevented).toBe(false);
        expect(dropdown.show).toBe(false);
        root.remove();
    });

    it('should isolate instances and close on Escape with focus restored', async () => {
        const root = render(
            <div>
                <DropdownButton caption="First" />
                <DropdownButton caption="Second" />
            </div>
        );
        document.body.append(root);
        await setTimeout(0);

        const [first, second] =
            root.querySelectorAll<DropdownButton>('dropdown-button');
        const firstToggle = first.shadowRoot.querySelector('button');
        const secondToggle = second.shadowRoot.querySelector('button');
        firstToggle.click();
        secondToggle.click();
        expect(first.show).toBe(false);
        expect(second.show).toBe(true);

        const escape = new KeyboardEvent('keydown', {
            key: 'Escape',
            bubbles: true,
            composed: true,
            cancelable: true
        });
        secondToggle.dispatchEvent(escape);
        expect(escape.defaultPrevented).toBe(true);
        expect(second.show).toBe(false);
        expect(second.shadowRoot.activeElement).toBe(secondToggle);
        root.remove();
    });

    it('should remove document listeners when disconnected and restore them on reconnect', async () => {
        const root = render(<DropdownButton caption="Actions" />);
        document.body.append(root);
        await setTimeout(0);

        const dropdown = root.querySelector<DropdownButton>('dropdown-button');
        dropdown.shadowRoot.querySelector('button').click();
        root.remove();
        document.body.click();
        expect(dropdown.show).toBe(true);

        document.body.append(root);
        document.body.click();
        expect(dropdown.show).toBe(false);
        await setTimeout(0);
        expect(
            dropdown.shadowRoot
                .querySelector('button')
                .getAttribute('aria-expanded')
        ).toBe('false');
        expect(
            dropdown.shadowRoot
                .querySelector('.menu')
                .classList.contains('show')
        ).toBe(false);
        root.remove();
    });

    it('should not open a disabled dropdown', async () => {
        const root = render(<DropdownButton caption="Actions" disabled />);
        document.body.append(root);
        await setTimeout(0);
        const dropdown = root.querySelector<DropdownButton>('dropdown-button');
        dropdown.shadowRoot.querySelector('button').click();
        expect(dropdown.show).toBe(false);
        root.remove();
    });
});
