import { describe, it } from 'node:test';
import { assertLooksLike } from 'dom-renderer/assert';

import { FAIcon, FABGIcon } from '../../source/Reminder/FAIcon';

describe('FontAwesome Icon', () => {
    it('should render a Solid-style Icon defaultly', () => {
        assertLooksLike(
            <FAIcon name="home" />,
            <span className="fa-classic fa-solid fa-home" aria-hidden="true" />
        );
    });

    it('should render a Bigger Icon with a Scale', () => {
        assertLooksLike(
            <FAIcon name="home" size="xs" />,
            <span
                className="fa-classic fa-solid fa-home fa-xs"
                aria-hidden="true"
            />
        );
        assertLooksLike(
            <FAIcon name="home" size={2} />,
            <span
                className="fa-classic fa-solid fa-home fa-2x"
                aria-hidden="true"
            />
        );
    });

    it('should use Bootstrap 6 foreground utilities for its color', () => {
        assertLooksLike(
            <FAIcon name="home" color="body" />,
            <span
                className="fa-classic fa-solid fa-home fg-body"
                aria-hidden="true"
            />
        );
    });

    it('should render an Icon with Padding wrapper for List items', () => {
        assertLooksLike(
            <ul className="fa-ul">
                <li>
                    <FAIcon name="home" listItem />
                    Home
                </li>
            </ul>,
            <ul className="fa-ul">
                <li>
                    <span className="fa-li">
                        <span
                            className="fa-classic fa-solid fa-home"
                            aria-hidden="true"
                        />
                    </span>
                    Home
                </li>
            </ul>
        );
    });

    it('should render a Stacked Square Icon', () => {
        assertLooksLike(
            <FABGIcon
                type="square"
                name="github"
                group="brands"
                size={2}
                color="body"
            />,
            <span className="fa-stack fa-2x fg-body">
                <span
                    className="fa-classic fa-solid fa-square fa-stack-2x"
                    aria-hidden="true"
                />
                <span
                    className="fa-brands fa-github fa-inverse fa-stack-1x"
                    aria-hidden="true"
                />
            </span>
        );
    });

    it('should render explicit families and styles without abbreviated aliases', () => {
        for (const family of [
            'classic',
            'duotone',
            'sharp',
            'sharp-duotone'
        ] as const)
            for (const group of ['solid', 'regular', 'light', 'thin'] as const)
                assertLooksLike(
                    <FAIcon name="house" family={family} group={group} />,
                    <span
                        className={`fa-${family} fa-${group} fa-house`}
                        aria-hidden="true"
                    />
                );
        assertLooksLike(
            <FAIcon name="github" group="brands" family="sharp" />,
            <span className="fa-brands fa-github" aria-hidden="true" />
        );
    });

    it('should render explicit width overrides using native v7 classes', () => {
        for (const width of ['auto', 'fixed'] as const)
            assertLooksLike(
                <FAIcon name="house" width={width} />,
                <span
                    className={`fa-classic fa-solid fa-house fa-width-${width}`}
                    aria-hidden="true"
                />
            );
    });

    it('should use logical pull directions and the spin-pulse animation', () => {
        for (const pull of ['start', 'end'] as const)
            assertLooksLike(
                <FAIcon name="spinner" pull={pull} animation="spin-pulse" />,
                <span
                    className={`fa-classic fa-solid fa-spinner fa-spin-pulse fa-pull-${pull}`}
                    aria-hidden="true"
                />
            );
    });
});
