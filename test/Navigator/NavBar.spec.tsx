import { expect } from 'expect';
import { describe, it } from 'node:test';
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
        expect(dialog.classList.contains('md:drawer')).toBe(true);
        expect(drawer.shadowRoot.querySelector('slot')).not.toBeNull();
        toggle.click();
        expect(navbar.open).toBe(true);
        navbar.close(new KeyboardEvent('keyup', { key: 'a' }));
        expect(navbar.open).toBe(true);
        navbar.close(new KeyboardEvent('keyup', { key: 'Escape' }));
        expect(navbar.open).toBe(false);
        root.remove();
    });
});
