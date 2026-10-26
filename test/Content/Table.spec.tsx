import { expect } from 'expect';
import { describe, it } from 'node:test';
import { DOMRenderer } from 'dom-renderer';

import { InputCell, Table, TableRow } from '../../source/Content/Table';
import { TableSelectionModel } from '../../source/Content/TableSelectionModel';
import { assertLooksLike, render } from '../render';

describe('Table', () => {
    it('should preserve native table sections without a wrapper by default', () => {
        assertLooksLike(
            <Table>
                <thead>
                    <tr>
                        <th>Head</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Cell</td>
                    </tr>
                </tbody>
            </Table>,
            <table className="table">
                <thead>
                    <tr>
                        <th>Head</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Cell</td>
                    </tr>
                </tbody>
            </table>
        );
    });

    it('should render responsive wrappers at all sizes or a breakpoint', () => {
        expect(render(<Table responsive />).firstElementChild.className).toBe(
            'table-responsive'
        );
        expect(
            render(<Table responsive="xl" />).firstElementChild.className
        ).toBe('xl:table-responsive');
        expect(
            render(<Table responsive="2xl" />).firstElementChild.className
        ).toBe('2xl:table-responsive');
    });

    it('should apply table variants and sizing', () => {
        const table = render(
            <Table
                variant="inverse"
                size="sm"
                bordered
                striped
                hover
                caption="top"
            />
        ).querySelector('table');

        expect(table.className).toBe(
            'table theme-inverse table-sm table-striped table-hover table-bordered caption-top'
        );
    });

    it('should support striped columns and borderless tables', () => {
        expect(
            render(<Table striped="columns" borderless />).firstElementChild
                .className
        ).toBe('table table-striped-columns table-borderless');
    });

    it('supports selectable rows and bubbles checked values', () => {
        let selected: unknown;
        const root = render(
            <Table>
                <tbody>
                    <TableRow
                        id="first"
                        checked={false}
                        onCheck={event => {
                            selected = event.detail;
                        }}
                    >
                        <td>First</td>
                    </TableRow>
                </tbody>
            </Table>
        );
        const input = root.querySelector('input');
        input.checked = true;
        input.dispatchEvent(new Event('change', { bubbles: true }));
        expect(selected).toEqual({ checked: true, value: 'first' });
        expect(input.getAttribute('aria-label')).toBe('Select row');
    });

    it('composes editable controls without mixing cell and control props', () => {
        const root = render(
            <InputCell
                as="textarea"
                colSpan={2}
                value="Edit"
                cellProps={{ className: 'align-middle' }}
            />
        );
        expect(root.querySelector('td').colSpan).toBe(2);
        expect(root.querySelector('td').className).toBe('align-middle');
        expect(root.querySelector('textarea').value).toBe('Edit');
    });

    it('maintains all/partial selection when rows change', () => {
        const model = new TableSelectionModel<string>(['a', 'b']);
        expect(model.checked).toBe(false);
        model.toggle('a');
        expect(model.indeterminate).toBe(true);
        model.toggleAll();
        expect(model.checked).toBe(true);
        model.setKeys(['b', 'c']);
        expect([...model.selected]).toEqual(['b']);
        expect(model.indeterminate).toBe(true);
        model.toggleAll(false);
        expect(model.selected.size).toBe(0);
        expect(() => model.toggle('missing')).toThrow(RangeError);
        model.setKeys([]);
        expect(model.checked).toBe(false);
    });

    it('updates the native half-selected property on an existing row', () => {
        const root = document.createElement('div');
        const renderer = new DOMRenderer();
        const tree = (indeterminate: boolean) => (
            <Table>
                <thead>
                    <TableRow
                        type="head"
                        id="all"
                        checked={false}
                        indeterminate={indeterminate}
                    />
                </thead>
            </Table>
        );
        renderer.render(tree(true), root);
        const input = root.querySelector('input');
        expect(input.indeterminate).toBe(true);
        renderer.render(tree(false), root);
        expect(root.querySelector('input')).toBe(input);
        expect(input.indeterminate).toBe(false);
    });
});
