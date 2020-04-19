import 'web-cell/source/utility/polyfill';
import { assertLooksLike } from 'snabbdom-looks-like';
import { createCell } from 'web-cell';

import { Icon, BGIcon } from '../../source/Reminder/Icon';

describe('Icon', () => {
    it('should render a Solid-style Icon defaultly', () => {
        assertLooksLike(
            <Icon name="home" />,
            <span className="fas fa-home" aria-hidden="true" />
        );
    });

    it('should render a Bigger Icon with a Scale', () => {
        assertLooksLike(
            <Icon name="home" size="xs" />,
            <span className="fas fa-home fa-xs" aria-hidden="true" />
        );
        assertLooksLike(
            <Icon name="home" size={2} />,
            <span className="fas fa-home fa-2x" aria-hidden="true" />
        );
    });

    it('should render an Icon with Padding wrapper for List items', () => {
        assertLooksLike(
            <ul className="fa-ul">
                <li>
                    <Icon name="home" listItem />
                    Home
                </li>
            </ul>,
            <ul className="fa-ul">
                <li>
                    <span className="fa-li">
                        <span className="fas fa-home" />
                    </span>
                    Home
                </li>
            </ul>
        );
    });

    it('should render a Stacked Square Icon', () => {
        assertLooksLike(
            <BGIcon type="square" name="github" size={2} color="dark" />,
            <span className="fa-stack fa-2x text-dark">
                <span className="fas fa-square fa-stack-2x" />
                <span className="fas fa-github fa-inverse fa-stack-1x" />
            </span>
        );
    });
});
