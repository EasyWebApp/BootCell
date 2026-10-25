import { expect } from 'expect';
import { fn } from 'jest-mock';
import { describe, it } from 'node:test';

import {
    Pager,
    Pagination,
    PaginationItem
} from '../../source/Navigator/Pagination';
import { render } from '../render';

describe('Pagination', () => {
    it('should render sized pagination with active and disabled items', () => {
        const root = render(
            <Pagination size="lg">
                <PaginationItem active>1</PaginationItem>
                <PaginationItem disabled>2</PaginationItem>
            </Pagination>
        );
        expect(
            root.querySelector('ol').classList.contains('pagination-lg')
        ).toBe(true);
        expect(root.querySelector('li').getAttribute('aria-current')).toBe(
            'page'
        );
        expect(
            root.querySelectorAll('li')[1].classList.contains('disabled')
        ).toBe(true);
    });

    it('should render only the current page when there is a single page', () => {
        const root = render(
            <Pager pageSize={10} pageIndex={1} pageCount={1} />
        );
        expect(root.querySelectorAll('.page-item')).toHaveLength(1);
        expect(root.querySelector('.page-item.active').textContent).toBe('1');
        expect(root.querySelectorAll('input')).toHaveLength(2);
    });

    it('should render neighbors, end links and ellipses for a middle page', () => {
        const root = render(
            <Pager pageSize={10} pageIndex={5} pageCount={10} />
        );
        expect(
            Array.from(
                root.querySelectorAll('.page-item'),
                node => node.textContent
            )
        ).toEqual(['1', '...', '4', '5', '6', '...', '10']);
    });

    it('should notify page-link selection without browser navigation', () => {
        const onChange = fn();
        const root = render(
            <Pager
                pageSize={10}
                pageIndex={2}
                pageCount={3}
                onChange={onChange}
            />
        );
        const event = new MouseEvent('click', {
            bubbles: true,
            cancelable: true
        });
        const link = root.querySelector('a');
        const url = new URL(link.href);

        expect(url.searchParams.get('pageSize')).toBe('10');
        expect(url.searchParams.get('pageIndex')).toBe('1');

        link.dispatchEvent(event);
        expect(event.defaultPrevented).toBe(true);
        expect(onChange).toHaveBeenCalledWith({ pageSize: 10, pageIndex: 1 });
    });

    it('should notify changes to the page size and index controls', () => {
        const onChange = fn();
        const root = render(
            <Pager
                pageSize={10}
                pageIndex={2}
                pageCount={3}
                onChange={onChange}
            />
        );
        const inputs = root.querySelectorAll('input');

        inputs[0].value = '20';
        inputs[0].dispatchEvent(new Event('change', { bubbles: true }));
        inputs[1].value = '3';
        inputs[1].dispatchEvent(new Event('change', { bubbles: true }));

        expect(onChange.mock.calls).toEqual([
            [{ pageSize: 20, pageIndex: 2 }],
            [{ pageSize: 10, pageIndex: 3 }]
        ]);
    });
});
