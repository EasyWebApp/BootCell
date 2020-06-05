import { createCell } from 'web-cell';
import { assertLooksLike } from 'snabbdom-looks-like';

import { ButtonGroup, Toolbar } from '../../source/Form/ButtonGroup';

describe('Button Group', () => {
    it('should render an ordinary Button Group defaultly', () => {
        assertLooksLike(
            <ButtonGroup>
                <button />
            </ButtonGroup>,
            <div className="btn-group" role="group">
                <button />
            </div>
        );
    });

    it('should render an sized Button Group with "size" property', () => {
        assertLooksLike(
            <ButtonGroup size="lg" />,
            <div className="btn-group btn-group-lg" role="group" />
        );
    });

    it('should render an vertical Button Group with "vertical" property', () => {
        assertLooksLike(
            <ButtonGroup vertical />,
            <div className="btn-group-vertical" role="group" />
        );
    });

    it('should render a Toolbar within a Button Group', () => {
        assertLooksLike(
            <Toolbar>
                <ButtonGroup />
            </Toolbar>,
            <div className="btn-toolbar" role="toolbar">
                <div className="btn-group" role="group" />
            </div>
        );
    });
});
