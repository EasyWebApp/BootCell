import { describe, it } from 'node:test';
import { expect } from 'expect';
import { DOMRenderer } from 'dom-renderer';
import { assertLooksLike, render } from '../render';
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle
} from '../../source/Navigator/Dropdown';
import { DropdownButton } from '../../source/Navigator/Dropdown';

const tick = () => new Promise(resolve => setTimeout(resolve, 0));

describe('Menu', () => {
    it('disposes local handlers on removal and restores them on renderer reuse', async () => {
        const renderer = new DOMRenderer();
        const root = document.createElement('div');
        let toggles = 0;
        const view = () => (
            <Dropdown onToggle={() => toggles++}>
                <DropdownToggle>Menu</DropdownToggle>
                <DropdownMenu />
            </Dropdown>
        );
        document.body.append(root);
        renderer.render(view(), root);
        await tick();
        const toggle = root.querySelector('button');
        toggle.click();
        toggle.click();
        expect(toggles).toBe(2);
        root.remove();
        await tick();
        toggle.click();
        toggle.dispatchEvent(
            new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true })
        );
        expect(toggles).toBe(2);
        document.body.append(root);
        renderer.render(view(), root);
        await tick();
        toggle.click();
        expect(toggles).toBe(3);
        renderer.render(<div />, root);
        toggle.click();
        expect(toggles).toBe(3);
        root.remove();
    });

    it('forwards focus, root-close event and theme through DropdownButton', async () => {
        const root = render(
            <DropdownButton
                caption="Actions"
                theme="danger"
                split
                href="#action"
                rootCloseEvent="mousedown"
                focusFirstItemOnShow={true}
            >
                <DropdownItem href="#item">Item</DropdownItem>
            </DropdownButton>
        );
        document.body.append(root);
        await tick();
        const button = root.querySelector<DropdownButton>('dropdown-button');
        const toggle = button.shadowRoot.querySelector<HTMLButtonElement>(
            '[data-dropdown-toggle]'
        );
        const item = button.querySelector('a');
        expect(toggle.classList.contains('theme-danger')).toBe(true);
        expect(
            button.shadowRoot
                .querySelector('a')
                .classList.contains('theme-danger')
        ).toBe(true);
        toggle.click();
        await tick();
        expect(document.activeElement).toBe(item);
        document.body.click();
        expect(toggle.getAttribute('aria-expanded')).toBe('true');
        document.body.dispatchEvent(
            new MouseEvent('mousedown', { bubbles: true })
        );
        await tick();
        expect(toggle.getAttribute('aria-expanded')).toBe('false');
        root.remove();
        await tick();
    });

    it('applies controlled updates without reinvoking insertion refs', async () => {
        const root = document.createElement('div');
        const renderer = new DOMRenderer();
        const view = (show: boolean) => (
            <Dropdown id="controlled-menu" show={show}>
                <DropdownToggle>Actions</DropdownToggle>
                <DropdownMenu align="end" />
            </Dropdown>
        );
        document.body.append(root);
        renderer.render(view(false), root);
        await tick();
        const toggle = root.querySelector('button');
        renderer.render(view(true), root);
        await tick();
        expect(root.querySelector('button')).toBe(toggle);
        expect(toggle.getAttribute('aria-expanded')).toBe('true');
        expect(root.querySelector('.menu').classList.contains('menu-end')).toBe(
            true
        );
        renderer.render(view(false), root);
        await tick();
        expect(toggle.getAttribute('aria-expanded')).toBe('false');
        root.remove();
        await tick();
    });
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

    it('preserves controlled JSX callback signatures and JSX titles', async () => {
        let requested: boolean;
        const root = render(
            <DropdownButton
                title={<b>Actions</b>}
                show={false}
                onToggle={show => (requested = show)}
            >
                <DropdownItem>Item</DropdownItem>
            </DropdownButton>
        );
        document.body.append(root);
        await tick();
        const button = root.querySelector<DropdownButton>('dropdown-button');
        expect(button.shadowRoot.querySelector('b').textContent).toBe(
            'Actions'
        );
        button.shadowRoot
            .querySelector<HTMLButtonElement>('[data-dropdown-toggle]')
            .click();
        await tick();
        expect(requested).toBe(true);
        expect(
            button.shadowRoot
                .querySelector('[data-dropdown-toggle]')
                .getAttribute('aria-expanded')
        ).toBe('false');
        root.remove();
    });

    it('opens, selects, restores focus and dismisses outside', async () => {
        let selected = '';
        const root = render(
            <Dropdown onSelect={key => (selected = key)}>
                <DropdownToggle>Actions</DropdownToggle>
                <DropdownMenu>
                    <DropdownItem disabled href="/disabled">
                        Disabled
                    </DropdownItem>
                    <DropdownItem eventKey="edit" href="/edit">
                        Edit
                    </DropdownItem>
                    <DropdownItem href="/delete">Delete</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        );
        document.body.append(root);
        await tick();
        const toggle = root.querySelector('button');
        toggle.dispatchEvent(
            new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true })
        );
        expect(document.activeElement.textContent).toBe('Edit');
        const items = root.querySelectorAll<HTMLAnchorElement>('a');
        items[1].dispatchEvent(
            new MouseEvent('click', { bubbles: true, cancelable: true })
        );
        expect(selected).toBe('edit');
        expect(toggle.getAttribute('aria-expanded')).toBe('false');
        toggle.click();
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
        expect(document.activeElement).toBe(toggle);
        toggle.click();
        document.body.click();
        expect(toggle.getAttribute('aria-expanded')).toBe('false');
        root.remove();
        await tick();
    });

    it('implements inside/outside/false autoClose and controlled visibility', async () => {
        for (const autoClose of [true, false, 'inside', 'outside'] as const) {
            const root = render(
                <Dropdown defaultShow autoClose={autoClose}>
                    <DropdownToggle>Actions</DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem>Item</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            );
            document.body.append(root);
            await tick();
            document.body.click();
            expect(
                root.querySelector('button').getAttribute('aria-expanded')
            ).toBe(String(autoClose === false || autoClose === 'inside'));
            root.remove();
            await tick();
        }
        let requested = true;
        const root = render(
            <Dropdown show={false} onToggle={show => (requested = show)}>
                <DropdownToggle>Actions</DropdownToggle>
                <DropdownMenu />
            </Dropdown>
        );
        document.body.append(root);
        await tick();
        root.querySelector('button').click();
        expect(requested).toBe(true);
        expect(root.querySelector('button').getAttribute('aria-expanded')).toBe(
            'false'
        );
        root.remove();
    });

    it('composes split actions, responsive alignment and a linked menu', async () => {
        const button = new DropdownButton();
        button.caption = <b>Actions</b>;
        button.split = true;
        button.href = '/action';
        button.drop = 'start';
        button.align = { md: 'end' };
        document.body.append(button);
        await tick();
        const root = button.shadowRoot;
        const toggle = root.querySelector<HTMLButtonElement>(
            '[data-dropdown-toggle]'
        );
        const menu = root.querySelector<HTMLElement>('.menu');
        expect(root.querySelector('a').getAttribute('href')).toBe('/action');
        expect(root.querySelector('.dropstart')).not.toBeNull();
        expect(menu.classList.contains('md:menu-end')).toBe(true);
        expect(menu.getAttribute('aria-labelledby')).toBe(toggle.id);
        toggle.click();
        await tick();
        expect(menu.classList.contains('show')).toBe(true);
        document.body.click();
        await tick();
        expect(menu.classList.contains('show')).toBe(false);
        button.remove();
        await tick();
    });
});
