import 'web-cell/source/utility/polyfill';
import { createCell } from 'web-cell';
import { assertLooksLike } from 'snabbdom-looks-like';

import { HeaderList } from '../../source/Navigator/HeaderList';

const { render } = HeaderList.prototype;

describe('Header List', () => {
    it('should render Header Links with different indents', () => {
        assertLooksLike(
            <div>
                {render({
                    list: [
                        { level: 1, text: 'One', id: 'One' },
                        { level: 2, text: 'Two', id: 'Two' },
                        { level: 3, text: 'Three', id: 'Three' },
                        { level: 2, text: 'Four', id: 'Four' }
                    ],
                    activeIndex: 1
                })}
            </div>,
            <div>
                <a
                    className="d-block pl-2 text-nowrap"
                    style={{
                        fontSize: `1rem`,
                        textIndent: `0rem`,
                        borderLeft: '2px solid',
                        borderLeftColor: 'transparent',
                        transition: '0.25s'
                    }}
                    href="#One"
                >
                    One
                </a>
                <a
                    className="d-block pl-2 text-nowrap"
                    style={{
                        fontSize: `0.9rem`,
                        textIndent: `1rem`,
                        borderLeft: '2px solid',
                        borderLeftColor: 'lightblue',
                        transition: '0.25s'
                    }}
                    href="#Two"
                >
                    Two
                </a>
                <a
                    className="d-block pl-2 text-nowrap"
                    style={{
                        fontSize: `0.8rem`,
                        textIndent: `2rem`,
                        borderLeft: '2px solid',
                        borderLeftColor: 'transparent',
                        transition: '0.25s'
                    }}
                    href="#Three"
                >
                    Three
                </a>
                <a
                    className="d-block pl-2 text-nowrap"
                    style={{
                        fontSize: `0.9rem`,
                        textIndent: `1rem`,
                        borderLeft: '2px solid',
                        borderLeftColor: 'transparent',
                        transition: '0.25s'
                    }}
                    href="#Four"
                >
                    Four
                </a>
            </div>
        );
    });
});
