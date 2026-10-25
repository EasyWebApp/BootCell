import { expect } from 'expect';
import { describe, it } from 'node:test';

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
});
