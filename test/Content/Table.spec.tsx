import { expect } from 'expect';
import { describe, it } from 'node:test';

import { Table } from '../../source/Content/Table';
import { assertLooksLike } from 'dom-renderer/assert';
import { render } from '../render';

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
});
