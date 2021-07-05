import { assertLooksLike } from '@tech_query/snabbdom-looks-like';
import { createCell } from 'web-cell';
import classNames from 'classnames';

import { Table, TableRow, InputCell } from '../../source/Content/Table';
import style from '../../source/Content/Table.module.less';
import { Field } from '../../source/Form/Field';

describe('Table', () => {
    it('should render a Responsive Table defaultly', () => {
        assertLooksLike(
            <Table>
                <TableRow type="head">
                    <th></th>
                </TableRow>
                <TableRow>
                    <td></td>
                </TableRow>
            </Table>,
            <div className="table-responsive">
                <table className={`table ${style.table}`}>
                    <thead>
                        <tr data-type="head">
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr data-type="body">
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    });

    it('should render a Checkable Table', () => {
        assertLooksLike(
            <Table>
                <TableRow type="head" id="all" checked={false}>
                    <th></th>
                </TableRow>
                <TableRow id="row-1" checked>
                    <td></td>
                </TableRow>
            </Table>,
            <div className="table-responsive">
                <table className={`table ${style.table}`}>
                    <thead>
                        <tr data-type="head" id="all">
                            <th className={style['row-checker']}>
                                <Field
                                    type="checkbox"
                                    id="all-check"
                                    name="table-row"
                                    value="all"
                                    checked={false}
                                />
                            </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr data-type="body" id="row-1">
                            <td className={style['row-checker']}>
                                <Field
                                    type="checkbox"
                                    id="row-1-check"
                                    name="table-row"
                                    value="row-1"
                                    checked
                                />
                            </td>
                            <td></td>
                        </tr>
                    </tbody>
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
