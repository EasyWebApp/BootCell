import { expect } from 'expect';
import { fn } from 'jest-mock';
import { describe, it } from 'node:test';
import { assertLooksLike, render } from '../render';
import { Button, IconButton } from '../../source/Form/Button';
import { Icon } from '../../source/Reminder/Icon';

describe('Button', () => {
    it('should render an outline Button', () => {
        assertLooksLike(
            <Button variant="outline-primary">Test</Button>,
            <button className="btn btn-outline theme-primary">Test</button>
        );
    });

    it('should render a solid Button', () => {
        assertLooksLike(
            <Button variant="primary" className="d-block w-100">
                Test
            </Button>,
            <button className="btn btn-solid theme-primary d-block w-100">
                Test
            </button>
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
});
