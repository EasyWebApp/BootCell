import { expect } from 'expect';
import { fn } from 'jest-mock';
import { describe, it } from 'node:test';
import { assertLooksLike, render } from '../render';
import { Button, IconButton, isButton } from '../../source/Form/Button';
import { Icon } from '../../source/Reminder/Icon';

describe('Button', () => {
    it('should render an outline Button', () => {
        assertLooksLike(
            <Button variant="outline" theme="primary">
                Test
            </Button>,
            <button className="btn btn-outline theme-primary">Test</button>
        );
    });

    it('should render a solid Button', () => {
        assertLooksLike(
            <Button variant="solid" theme="primary" className="d-block w-100">
                Test
            </Button>,
            <button className="btn btn-solid theme-primary d-block w-100">
                Test
            </button>
        );
    });

    it('should compose native button variants and themes independently', () => {
        const variants = [
            'solid',
            'outline',
            'subtle',
            'text',
            'link'
        ] as const;
        const themes = [
            'primary',
            'secondary',
            'accent',
            'inverse',
            'success',
            'info',
            'warning',
            'danger'
        ] as const;

        for (const variant of variants)
            for (const theme of themes)
                assertLooksLike(
                    <Button variant={variant} theme={theme}>
                        Test
                    </Button>,
                    <button className={`btn btn-${variant} theme-${theme}`}>
                        Test
                    </button>
                );
        assertLooksLike(
            <Button theme="accent">Test</Button>,
            <button className="btn theme-accent">Test</button>
        );
    });

    it('should render a disabled Anchor', () => {
        assertLooksLike(
            <Button href="/test" disabled>
                Test
            </Button>,
            <a
                className="btn disabled"
                href="/test"
                tabIndex={-1}
                role="button"
                aria-disabled="true"
            >
                Test
            </a>
        );
    });

    it('should render a Button with an Icon', () => {
        assertLooksLike(
            <IconButton
                className="m-1"
                name="bootstrap"
                href="https://getbootstrap.com"
            />,
            <a
                className="btn p-1 m-1"
                href="https://getbootstrap.com"
                role="button"
            >
                <Icon name="bootstrap" />
            </a>
        );
    });

    it('should forward click events without firing disabled buttons', () => {
        const onClick = fn();
        const root = render(
            <Button active variant="link" onClick={onClick}>
                Go
            </Button>
        );
        const button = root.querySelector('button');

        expect(button.className).toBe('btn btn-link');
        expect(button.getAttribute('aria-pressed')).toBe('true');
        button.click();
        expect(onClick).toHaveBeenCalledTimes(1);
        render(
            <Button disabled onClick={onClick}>
                Disabled
            </Button>
        )
            .querySelector('button')
            .click();
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('blocks disabled anchor actions as well as native button actions', () => {
        const onClick = fn();
        const anchor = render(
            <Button disabled href="#test" onClick={onClick}>
                Go
            </Button>
        ).querySelector('a');
        const event = new MouseEvent('click', { cancelable: true });
        anchor.dispatchEvent(event);
        expect(event.defaultPrevented).toBe(true);
        expect(onClick).not.toHaveBeenCalled();
    });

    it('recognizes current JSX buttons without legacy VNode fields', () => {
        expect(isButton(<Button />)).toBe(true);
        expect(isButton(<Button href="#test" />)).toBe(true);
        for (const node of [
            null,
            false,
            'text',
            <div className="btn" />,
            <button className="btn-link" />
        ])
            expect(isButton(node)).toBe(false);
    });
});
