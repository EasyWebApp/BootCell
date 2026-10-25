import { expect } from 'expect';
import { describe, it } from 'node:test';

import { ListGroup, ListGroupItem } from '../../source/Content/ListGroup';
import { render } from '../render';

describe('ListGroup', () => {
    it('should render horizontal links with active and disabled states', () => {
        const root = render(
            <ListGroup horizontal="lg">
                <ListGroupItem href="#test" active>
                    Test
                </ListGroupItem>
                <ListGroupItem href="#example" disabled>
                    Example
                </ListGroupItem>
            </ListGroup>
        );
        const links = root.querySelectorAll('a');

        expect(root.firstElementChild.className).toBe(
            'list-group lg:list-group-horizontal'
        );
        expect(links[0].className).toBe(
            'list-group-item list-group-item-action active'
        );
        expect(links[0].getAttribute('aria-current')).toBe('true');
        expect(links[1].className).toBe(
            'list-group-item list-group-item-action disabled pe-none'
        );
        expect(links[1].getAttribute('aria-disabled')).toBe('true');
        expect(links[1].textContent).toBe('Example');
    });

    it('should support numbered flush lists and item variants', () => {
        const root = render(
            <ListGroup numbered variant="flush">
                <ListGroupItem variant="success">Done</ListGroupItem>
            </ListGroup>
        );
        expect(root.firstElementChild.className).toBe(
            'list-group list-group-flush list-group-numbered'
        );
        expect(root.querySelector('a').className).toBe(
            'list-group-item theme-success'
        );
        expect(root.querySelector('a').hasAttribute('href')).toBe(false);
    });
});
