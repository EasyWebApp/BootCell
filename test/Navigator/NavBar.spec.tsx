import { expect } from 'expect';
import { after, before, describe, it } from 'node:test';
import { fn } from 'jest-mock';
import { runInAction } from 'mobx';
import { setTimeout } from 'node:timers/promises';

import {
    DrawerNavbar,
    Navbar,
    NavbarBrand,
    NavbarToggle
} from '../../source/Navigator/Navbar';
import { Drawer } from '../../source/Layout/Drawer';
import { render } from '../render';

describe('Navbar', () => {
    const observerDescriptor = Object.getOwnPropertyDescriptor(
        globalThis,
        'ResizeObserver'
    );
    class TestResizeObserver implements ResizeObserver {
        static instances: TestResizeObserver[] = [];
        observe = fn<ResizeObserver['observe']>();
        unobserve = fn<ResizeObserver['unobserve']>();
        disconnect = fn<ResizeObserver['disconnect']>();
        constructor(readonly callback: ResizeObserverCallback) {
            TestResizeObserver.instances.push(this);
        }
    }

    before(() =>
        Object.defineProperty(globalThis, 'ResizeObserver', {
            configurable: true,
            value: TestResizeObserver
        })
    );
    after(() => {
        if (observerDescriptor)
            Object.defineProperty(
                globalThis,
                'ResizeObserver',
                observerDescriptor
            );
        else Reflect.deleteProperty(globalThis, 'ResizeObserver');
    });

    it('should render a native toggle with ARIA properties', () => {
        const toggle = render(
            <NavbarToggle
                aria-controls="test"
                ariaExpanded="true"
                ariaLabel="Toggle navigation"
            />
        ).querySelector('button');

        expect(toggle.type).toBe('button');
        expect(toggle.getAttribute('aria-controls')).toBe('test');
        expect(toggle.getAttribute('aria-expanded')).toBe('true');
        expect(toggle.classList.contains('btn-icon')).toBe(true);
        expect(toggle.style.backgroundColor).toBe('transparent');
        expect(toggle.style.borderRadius).not.toBe('');
        expect(toggle.querySelector('.navbar-toggler-icon')).not.toBeNull();
    });

    it('should compose a brand, theme and responsive layout', () => {
        const root = render(
            <Navbar
                variant="dark"
                bg="inverse"
                expand="2xl"
                fixed="top"
                sticky="bottom"
            >
                <NavbarBrand href=".">Test</NavbarBrand>
            </Navbar>
        );
        const nav = root.querySelector('nav');

        expect(nav.classList.contains('bg-inverse')).toBe(true);
        expect(nav.classList.contains('2xl:navbar-expand')).toBe(true);
        expect(nav.classList.contains('fixed-top')).toBe(true);
        expect(nav.classList.contains('sticky-bottom')).toBe(true);
        expect(nav.getAttribute('data-bs-theme')).toBe('dark');
        expect(nav.querySelector('a').textContent).toBe('Test');
    });

    it('should keep sticky positioning on the block host rather than inside its own containing block', () => {
        const navbar = new DrawerNavbar();
        navbar.sticky = 'top';
        const root = render(navbar.render());
        expect(root.querySelector('style').textContent).toContain(
            ':host([sticky="top"]) { top: 0; }'
        );
        expect(root.querySelector('nav').classList.contains('sticky-top')).toBe(
            false
        );
    });

    it('should wire the drawer title and toggle to stable IDs', async () => {
        const navbar = new DrawerNavbar();
        navbar.title = 'Test';
        navbar.expand = 'md';
        const root = render(navbar.renderContent());
        document.body.append(root);
        await setTimeout(0);

        const drawer = root.querySelector('drawer-box') as Drawer,
            { dialog } = drawer;
        const toggle = root.querySelector<HTMLButtonElement>('.navbar-toggler');

        expect(toggle.getAttribute('aria-controls')).toBe(dialog.id);
        expect(dialog.getAttribute('aria-labelledby')).toBe(
            root.querySelector('h5').id
        );
        expect(dialog.classList.contains('drawer')).toBe(true);
        expect(drawer.shadowRoot.querySelector('slot')).not.toBeNull();
        toggle.click();
        expect(navbar.open).toBe(true);
        navbar.close(new KeyboardEvent('keyup', { key: 'a' }));
        expect(navbar.open).toBe(true);
        navbar.close(new KeyboardEvent('keyup', { key: 'Escape' }));
        expect(navbar.open).toBe(false);
        root.remove();
    });

    it('should synchronize toggle, dismiss, backdrop, Escape and native close with drawer state', async () => {
        const root = render(<DrawerNavbar title="Test" />);
        document.body.append(root);
        await setTimeout(0);

        const navbar = root.querySelector<DrawerNavbar>('drawer-navbar');
        const toggle =
            navbar.shadowRoot.querySelector<HTMLButtonElement>(
                '.navbar-toggler'
            );
        const drawer = navbar.shadowRoot.querySelector<Drawer>('drawer-box');
        const { dialog } = drawer;
        Object.assign(dialog, {
            showModal: fn(() => (dialog.open = true)),
            close: fn(() => {
                dialog.open = false;
                dialog.dispatchEvent(new Event('close'));
            })
        });

        const expectOpen = (open: boolean) => {
            expect(navbar.open).toBe(open);
            expect(drawer.show).toBe(open);
            expect(dialog.open).toBe(open);
            expect(toggle.getAttribute('aria-expanded')).toBe(String(open));
        };
        const open = async () => {
            toggle.click();
            await setTimeout(0);
            expectOpen(true);
        };

        await open();
        toggle.click();
        await setTimeout(0);
        expectOpen(false);

        await open();
        drawer
            .querySelector<HTMLButtonElement>('[data-bs-dismiss="drawer"]')
            .click();
        await setTimeout(0);
        expectOpen(false);

        await open();
        dialog.click();
        await setTimeout(0);
        expectOpen(false);

        await open();
        dialog.dispatchEvent(new Event('cancel', { cancelable: true }));
        await setTimeout(0);
        expectOpen(false);

        await open();
        dialog.close();
        await setTimeout(0);
        expectOpen(false);
        root.remove();
    });

    it('should use the toggler container-query result to expand inline and close an open drawer', async () => {
        const root = render(
            <DrawerNavbar title="Test" expand="md">
                <a href="#page">Page</a>
            </DrawerNavbar>
        );
        document.body.append(root);
        await setTimeout(0);
        const navbar = root.querySelector<DrawerNavbar>('drawer-navbar');
        const toggle =
            navbar.shadowRoot.querySelector<HTMLButtonElement>(
                '.navbar-toggler'
            );
        const drawer = navbar.shadowRoot.querySelector<Drawer>('drawer-box');
        Object.assign(drawer.dialog, {
            showModal: fn(() => (drawer.dialog.open = true)),
            close: fn(() => (drawer.dialog.open = false))
        });
        toggle.click();
        await setTimeout(0);
        expect(navbar.open).toBe(true);

        toggle.style.display = 'none';
        navbar.syncLayout();
        await setTimeout(0);
        expect(navbar.open).toBe(false);
        expect(navbar.shadowRoot.querySelector('drawer-box')).toBeNull();
        expect(
            navbar.shadowRoot.querySelector('.navbar-content slot')
        ).not.toBeNull();
        expect(navbar.querySelector('a').textContent).toBe('Page');

        toggle.style.display = 'inline-flex';
        navbar.syncLayout();
        await setTimeout(0);
        expect(navbar.shadowRoot.querySelector('drawer-box')).not.toBeNull();
        expect(navbar.shadowRoot.querySelector('.navbar-content')).toBeNull();

        runInAction(() => (navbar.expand = true));
        await setTimeout(0);
        expect(
            navbar.shadowRoot.querySelector('.navbar-content')
        ).not.toBeNull();
        root.remove();
    });

    it('should disconnect layout observers and recreate them on reconnect', async () => {
        const root = render(<DrawerNavbar title="Test" expand />);
        document.body.append(root);
        await setTimeout(0);
        const navbar = root.querySelector<DrawerNavbar>('drawer-navbar');
        const first = TestResizeObserver.instances.at(-1);
        expect(first.observe).toHaveBeenCalledTimes(2);
        root.remove();
        expect(first.disconnect).toHaveBeenCalledTimes(1);

        document.body.append(root);
        await setTimeout(0);
        const second = TestResizeObserver.instances.at(-1);
        expect(second).not.toBe(first);
        expect(second.observe).toHaveBeenCalledTimes(2);
        runInAction(() => (navbar.expand = false));
        await setTimeout(0);
        expect(navbar.shadowRoot.querySelector('drawer-box')).not.toBeNull();
        root.remove();
        expect(second.disconnect).toHaveBeenCalledTimes(1);
    });
});
