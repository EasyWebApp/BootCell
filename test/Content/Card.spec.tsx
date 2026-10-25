import { expect } from 'expect';
import { describe, it } from 'node:test';

import {
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    CardTitle,
    CardImg
} from '../../source/Content/Card';
import { NavLink } from '../../source/Navigator/Nav';
import { assertLooksLike, render } from '../render';

describe('Card', () => {
    it('should compose an image, title and body', () => {
        const root = render(
            <Card>
                <CardImg src="test.png" variant="top" />
                <CardBody>
                    <CardTitle>Test</CardTitle>Content
                </CardBody>
            </Card>
        );

        expect(root.querySelector('.card > img').getAttribute('src')).toBe(
            'test.png'
        );
        expect(root.querySelector('img').className).toBe('card-img-top ');
        expect(root.querySelector('.card-body h5').textContent).toBe('Test');
        expect(root.querySelector('.card-body').textContent).toBe(
            'TestContent'
        );
    });

    it('should preserve header, body and footer order', () => {
        assertLooksLike(
            <Card>
                <CardHeader>Head</CardHeader>
                <CardBody>Content</CardBody>
                <CardFooter>Foot</CardFooter>
            </Card>,
            <div className="card">
                <div className="card-header">Head</div>
                <div className="card-body">Content</div>
                <div className="card-footer">Foot</div>
            </div>
        );
    });

    it('should wrap children in a body when requested', () => {
        assertLooksLike(
            <Card body>Content</Card>,
            <div className="card">
                <div className="card-body">Content</div>
            </div>
        );
    });

    it('should allow navigation inside the header', () => {
        const root = render(
            <Card>
                <CardHeader>
                    <NavLink href="#test">Link</NavLink>
                </CardHeader>
            </Card>
        );

        expect(root.querySelector('.card-header > .nav-link').textContent).toBe(
            'Link'
        );
    });

    it('should apply theme, foreground and border utilities', () => {
        const card = render(
            <Card bg="dark" text="white" border="primary" className="test" />
        ).firstElementChild;

        expect(card.className).toBe(
            'card theme-inverse fg-white border-primary test'
        );
    });
});
