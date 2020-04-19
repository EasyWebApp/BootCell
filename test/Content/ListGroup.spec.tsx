import 'web-cell/source/utility/polyfill';
import { createCell } from 'web-cell';
import { assertLooksLike } from 'snabbdom-looks-like';

import { ListGroup } from '../../source/Content/ListGroup';

describe('Nav', () => {
    it('should render Nav Links with different states', () => {
        assertLooksLike(
            <ListGroup
                activeIndex={0}
                list={[
                    {
                        title: 'Test',
                        href: '#test',
                        content: <i>Test</i>
                    },
                    {
                        title: 'Example',
                        href: '#example',
                        content: <i>Example</i>,
                        disabled: true
                    }
                ]}
                horizontal="lg"
            />,
            <div className="list-group list-group-horizontal-lg">
                <a
                    className="list-group-item list-group-item-action active"
                    href="#test"
                >
                    <i>Test</i>
                </a>
                <a
                    className="list-group-item list-group-item-action disabled"
                    href="#example"
                    tabIndex={-1}
                    aria-disabled="true"
                >
                    <i>Example</i>
                </a>
            </div>
        );
    });
});
