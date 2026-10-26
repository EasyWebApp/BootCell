import { expect } from 'expect';
import { describe, it } from 'node:test';
import { runInAction } from 'mobx';

import { Nav, NavDropdown, NavLink } from '../../source/Navigator/Nav';
import { render } from '../render';

describe('Nav', () => {
    it('should render active links with native attributes', () => {
        const link = render(
            <NavLink active href="#test" ariaDisabled="true">
                Test
            </NavLink>
        ).querySelector('a');

        expect(link.classList.contains('active')).toBe(true);
        expect(link.getAttribute('href')).toBe('#test');
        expect(link.getAttribute('aria-disabled')).toBe('true');
        expect(link.textContent).toBe('Test');
    });

    for (const variant of ['tabs', 'pills', 'underline'] as const)
        it(`should initialize a ${variant} custom navigation element`, async () => {
            const nav = new Nav();
            nav.variant = variant;
            nav.fill = true;
            nav.justify = true;
            // Invoke the WebCell lifecycle on a detached element to avoid resource loads.
            await nav.connectedCallback();

            expect(nav.classList.contains(`nav-${variant}`)).toBe(true);
            expect(nav.classList.contains('nav-fill')).toBe(true);
            expect(nav.classList.contains('nav-justified')).toBe(true);
            expect(nav.role).toBe('tablist');
            expect(nav.shadowRoot.querySelector('slot')).not.toBeNull();
        });

    it('should compose dropdown navigation with projected children', () => {
        const tree = (
            <NavDropdown title="More">
                <a href="#sample">Sample</a>
            </NavDropdown>
        );
        expect(tree.tagName).toBe('dropdown-button');
        expect(tree.props).toMatchObject({
            boxClass: 'nav-item',
            buttonClass: 'nav-link',
            caption: 'More'
        });
        expect(tree.children[0].props.href).toBe('#sample');
    });

    it('prevents disabled links from navigating or invoking actions', () => {
        let clicked = false;
        const root = render(
            <NavLink
                href="#test"
                disabled
                onClick={() => {
                    clicked = true;
                }}
            >
                Disabled
            </NavLink>
        );
        const link = root.querySelector('a');
        const event = new MouseEvent('click', {
            cancelable: true,
            bubbles: true
        });
        link.dispatchEvent(event);
        expect(event.defaultPrevented).toBe(true);
        expect(clicked).toBe(false);
        expect(link.tabIndex).toBe(-1);
    });

    it('supports legacy layout through native utilities without stale classes', async () => {
        const nav = new Nav();
        nav.className = 'custom';
        runInAction(() => {
            nav.variant = 'pills';
            nav.direction = 'column';
            nav.align = 'end';
            nav.scrollable = true;
        });
        await nav.connectedCallback();
        expect(nav.className).toContain('flex-column');
        expect(nav.className).toContain('overflow-x-auto');
        runInAction(() => {
            nav.variant = 'tabs';
            nav.direction = 'row';
            nav.align = 'center';
        });
        await new Promise(resolve => setTimeout(resolve, 0));
        expect(nav.classList.contains('nav-pills')).toBe(false);
        expect(nav.classList.contains('flex-column')).toBe(false);
        expect(nav.classList.contains('nav-tabs')).toBe(true);
        expect(nav.classList.contains('custom')).toBe(true);
    });
});
