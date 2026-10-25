import { expect } from 'expect';
import { DOMRenderer } from 'dom-renderer';
import { describe, it } from 'node:test';

import {
    DrawerNavbar,
    BannerNavbar,
    Navbar,
    NavbarCollapse,
    NavbarBrand,
    NavbarToggle
} from '../../source/Navigator/Navbar';
import { render } from '../render';

describe('Navbar', () => {
    it('removes local click subscriptions when disposed and restores on renderer reuse', async () => {
        const root = document.createElement('div');
        const renderer = new DOMRenderer();
        let toggles = 0;
        const view = () => (
            <Navbar onToggle={() => toggles++}>
                <NavbarToggle />
                <NavbarCollapse>Content</NavbarCollapse>
            </Navbar>
        );
        document.body.append(root);
        renderer.render(view(), root);
        await new Promise(resolve => setTimeout(resolve, 0));
        const toggle = root.querySelector('button');
        toggle.click();
        toggle.click();
        expect(toggles).toBe(2);
        root.remove();
        await new Promise(resolve => setTimeout(resolve, 0));
        toggle.click();
        expect(toggles).toBe(2);
        document.body.append(root);
        renderer.render(view(), root);
        await new Promise(resolve => setTimeout(resolve, 0));
        toggle.click();
        expect(toggles).toBe(3);
        renderer.render(<div />, root);
        toggle.click();
        expect(toggles).toBe(3);
        root.remove();
    });

    it('applies controlled expanded changes to existing native DOM', async () => {
        const root = document.createElement('div');
        const renderer = new DOMRenderer();
        const view = (expanded: boolean) => (
            <Navbar id="controlled-nav" expanded={expanded}>
                <NavbarToggle />
                <NavbarCollapse>Content</NavbarCollapse>
            </Navbar>
        );
        document.body.append(root);
        renderer.render(view(false), root);
        await new Promise(resolve => setTimeout(resolve, 0));
        const toggle = root.querySelector('button');
        renderer.render(view(true), root);
        await new Promise(resolve => setTimeout(resolve, 0));
        expect(root.querySelector('button')).toBe(toggle);
        expect(toggle.getAttribute('aria-expanded')).toBe('true');
        expect(
            root.querySelector('.navbar-collapse').classList.contains('show')
        ).toBe(true);
        root.remove();
        await new Promise(resolve => setTimeout(resolve, 0));
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
        expect(toggle.querySelector('.navbar-toggler-icon')).not.toBeNull();
    });

    it('wires compositional collapse, selection and controlled updates', async () => {
        let toggled: boolean;
        const root = render(
            <Navbar
                defaultExpanded
                collapseOnSelect
                onToggle={show => (toggled = show)}
            >
                <NavbarToggle />
                <NavbarCollapse>
                    <a className="nav-link" href="#one">
                        One
                    </a>
                </NavbarCollapse>
            </Navbar>
        );
        document.body.append(root);
        await new Promise(resolve => setTimeout(resolve, 0));
        const toggle = root.querySelector<HTMLButtonElement>('button');
        const content = root.querySelector('.navbar-collapse');
        expect(content.classList.contains('show')).toBe(true);
        expect(toggle.getAttribute('aria-controls')).toBe(content.id);
        root.querySelector<HTMLAnchorElement>('a').click();
        expect(toggled).toBe(false);
        expect(content.classList.contains('show')).toBe(false);
        toggle.click();
        document.body.click();
        expect(content.classList.contains('show')).toBe(false);
        root.remove();
    });

    it('preserves boolean callback signatures through JSX rendering', async () => {
        let requested: boolean;
        const root = render(
            <DrawerNavbar
                expanded={false}
                onToggle={show => (requested = show)}
            />
        );
        document.body.append(root);
        await new Promise(resolve => setTimeout(resolve, 0));
        const navbar = root.querySelector<DrawerNavbar>('drawer-navbar');
        navbar.shadowRoot
            .querySelector<HTMLButtonElement>('.navbar-toggler')
            .click();
        expect(requested).toBe(true);
        expect(navbar.visible).toBe(false);
        root.remove();
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

    it('should wire the drawer title and toggle to stable IDs', () => {
        const navbar = new DrawerNavbar();
        navbar.title = 'Test';
        navbar.expand = 'md';
        const root = render(navbar.renderContent());
        const dialog = root.querySelector('dialog');
        const toggle = root.querySelector<HTMLButtonElement>('.navbar-toggler');

        expect(toggle.getAttribute('aria-controls')).toBe(dialog.id);
        expect(dialog.getAttribute('aria-labelledby')).toBe(
            root.querySelector('h5').id
        );
        expect(dialog.classList.contains('md:drawer')).toBe(true);
        expect(root.querySelector('slot')).not.toBeNull();
        toggle.click();
        expect(navbar.open).toBe(true);
        navbar.close(new KeyboardEvent('keyup', { key: 'a' }));
        expect(navbar.open).toBe(true);
        navbar.close(new KeyboardEvent('keyup', { key: 'Escape' }));
        expect(navbar.open).toBe(false);
    });

    it('forwards native attributes and custom toggle content', () => {
        const root = render(
            <Navbar id="main" className="custom" ariaLabel="Main">
                <NavbarToggle>
                    <b>Menu</b>
                </NavbarToggle>
            </Navbar>
        );
        expect(root.querySelector('nav').id).toBe('main');
        expect(root.querySelector('nav').classList.contains('custom')).toBe(
            true
        );
        expect(root.querySelector('nav').getAttribute('aria-label')).toBe(
            'Main'
        );
        expect(root.querySelector('button b').textContent).toBe('Menu');
    });

    it('composes an above-toolbar banner and shared dismissal lifecycle', async () => {
        const navbar = new BannerNavbar();
        navbar.narrow = true;
        navbar.direction = 'right';
        navbar.brand = <b>Brand</b>;
        document.body.append(navbar);
        await new Promise(resolve => setTimeout(resolve, 0));
        const root = navbar.shadowRoot;
        expect(
            root.querySelector('.navbar-collapse').nextElementSibling.tagName
        ).toBe('NAV');
        const toggle = root.querySelector<HTMLButtonElement>('button');
        toggle.click();
        await new Promise(resolve => setTimeout(resolve, 0));
        expect(navbar.visible).toBe(true);
        expect(root.querySelector<HTMLElement>('.navbar-collapse').hidden).toBe(
            false
        );
        document.body.click();
        await new Promise(resolve => setTimeout(resolve, 0));
        expect(navbar.visible).toBe(false);
        navbar.remove();
        navbar.open = true;
        document.body.click();
        expect(navbar.visible).toBe(true);
    });
});
