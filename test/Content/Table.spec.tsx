import '../polyfill';
import { assertLooksLike } from 'snabbdom-looks-like';
import { createCell } from 'web-cell';
import classNames from 'classnames';

import { Table, InputCell } from '../../source/Content/Table';
import style from '../../source/Content/Table.module.less';

describe('Table', () => {
    it('should render a Responsive Table defaultly', () => {
        assertLooksLike(
            <Table>
                <tbody />
            </Table>,
            <div className="table-responsive">
                <table className={`table ${style.table}`}>
                    <tbody />
                </table>
            </div>
        );
    });

    it('should render a Responsive Table with options', () => {
        assertLooksLike(
            <Table
                theme="dark"
                center
                border
                striped
                hover
                small
                responsive="xl"
            />,
            <div className="table-responsive-xl">
                <table
                    className={classNames(
                        'table',
                        'table-dark',
                        'table-bordered',
                        'table-striped',
                        'table-hover',
                        'table-sm',
                        style.table,
                        style['cell-center']
                    )}
                />
            </div>
        );
    });

    it('should render an Inputable Table Cell', () => {
        assertLooksLike(
            <InputCell colSpan={2} name="test" required />,
            <td colSpan={2}>
                <input
                    className="form-control border-left-0 border-right-0 border-top-0 rounded-0"
                    name="test"
                    required
                />
            </td>
        );
    });
});
