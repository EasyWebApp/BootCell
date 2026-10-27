import { expect } from 'expect';
import { describe, it } from 'node:test';
import { fn } from 'jest-mock';

import { Nav, NavDropdown, NavLink } from '../../source/Navigator/Nav';
import { render } from '../render';

describe('Nav', () => {
    it('should disable styling, keyboard focus, clicks and navigation together', () => {
        const onClick = fn();
        const link = render(
            <NavLink
                disabled
                active
                href="#disabled"
                tabIndex={0}
                onClick={onClick}
            >
                Disabled
            </NavLink>
        ).querySelector('a');
        expect(link.classList.contains('disabled')).toBe(true);
        expect(link.classList.contains('active')).toBe(true);
        expect(link.getAttribute('href')).toBeNull();
        expect(link.getAttribute('aria-disabled')).toBe('true');
        expect(link.tabIndex).toBe(-1);
        const click = new MouseEvent('click', {
            bubbles: true,
            cancelable: true
        });
        link.dispatchEvent(click);
        expect(click.defaultPrevented).toBe(true);
        expect(onClick).not.toHaveBeenCalled();
        const enabled = render(
            <NavLink href="#enabled" tabIndex={2} onClick={onClick}>
                Enabled
            </NavLink>
        ).querySelector('a');
        enabled.click();
        expect(enabled.tabIndex).toBe(2);
        expect(enabled.getAttribute('href')).toBe('#enabled');
        expect(onClick).toHaveBeenCalledTimes(1);
    });
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
