import { createCell } from 'web-cell';
import { assertLooksLike } from '@tech_query/snabbdom-looks-like';

import { ListGroup, ListItem } from '../../source/Content/ListGroup';

describe('Nav', () => {
    it('should render Nav Links with different states', () => {
        assertLooksLike(
            <ListGroup horizontal="lg">
                <ListItem title="Test" href="#test" active>
                    <i>Test</i>
                </ListItem>
                <ListItem title="Example" href="#example" disabled>
                    <i>Example</i>
                </ListItem>
            </ListGroup>,
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
