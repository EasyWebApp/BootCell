import { VNode } from 'dom-renderer';
import { expect } from 'expect';
import { fn } from 'jest-mock';
import { describe, it } from 'node:test';

import { assertLooksLike } from './render';

describe('assertLooksLike', () => {
    it('should allow additional actual attributes and nested properties', () => {
        assertLooksLike(
            <input id="name" required data-meta={{ first: 1, second: 2 }} />,
            <input data-meta={{ first: 1 }} />
        );
        expect(() => assertLooksLike(<input />, <input required />)).toThrow();
    });

    it('should ignore unspecified and undefined expected values, but not false or null', () => {
        assertLooksLike(<input required />, <input required={undefined} />);

        expect(() =>
            assertLooksLike(<input required />, <input required={false} />)
        ).toThrow();
        expect(() =>
            assertLooksLike(
                new VNode({ props: { value: 1 } }),
                new VNode({ props: { value: null } })
            )
        ).toThrow();
    });

    it('should normalize JSX attribute aliases without rendering', () => {
        assertLooksLike(
            <label htmlFor="name" ariaHidden="true" className=" a   b " />,
            <label for="name" aria-hidden="true" className="a b" />
        );
        expect(() =>
            assertLooksLike(<label htmlFor="other" />, <label for="name" />)
        ).toThrow();
    });

    it('should compare specified className values, not just class subsets', () => {
        expect(() =>
            assertLooksLike(<div className="a b" />, <div className="a" />)
        ).toThrow();

        assertLooksLike(<div className="a b" />, <div />);

        expect(() =>
            assertLooksLike(<div className="a b" />, <div className="b a" />)
        ).toThrow();
    });

    it('should recursively match only the expected array entries, like the original package', () => {
        assertLooksLike(
            <div data-items={[{ id: 1, extra: true }, { id: 2 }]} />,
            <div data-items={[{ id: 1 }]} />
        );
        expect(() =>
            assertLooksLike(
                <div data-items={[{ id: 1 }]} />,
                <div data-items={[{ id: 2 }]} />
            )
        ).toThrow();
    });

    it('should partially match styles and preserve property-only values', () => {
        assertLooksLike(
            <input value="Test" style={{ color: 'red', width: '1rem' }} />,
            <input value="Test" style={{ color: 'red' }} />
        );
        expect(() =>
            assertLooksLike(<input value="A" />, <input value="B" />)
        ).toThrow();
        expect(() =>
            assertLooksLike(
                <div style={{ color: 'red' }} />,
                <div style={{ color: 'blue' }} />
            )
        ).toThrow();
    });

    it('should compare tags, text, child counts and child order strictly', () => {
        expect(() => assertLooksLike(<div />, <span />)).toThrow();
        expect(() => assertLooksLike(<div>A</div>, <div>B</div>)).toThrow();
        expect(() => assertLooksLike(<div>A</div>, <div />)).toThrow();
        expect(() => assertLooksLike(<div />, <div>A</div>)).toThrow();
        expect(() =>
            assertLooksLike(
                <div>
                    <a />
                    <b />
                </div>,
                <div>
                    <b />
                    <a />
                </div>
            )
        ).toThrow();
    });

    it('should compare fragments and primitive text', () => {
        assertLooksLike(
            <>
                <span>A</span>
                <span>B</span>
            </>,
            <>
                <span>A</span>
                <span>B</span>
            </>
        );
        assertLooksLike('A', 'A');

        expect(() => assertLooksLike('A', 'B')).toThrow();
        expect(() => assertLooksLike('A', <span>A</span>)).toThrow();
    });

    it('should ignore runtime metadata and avoid invoking refs or lifecycle callbacks', () => {
        const ref = fn();
        const actual = (
            <div key="a" ref={ref}>
                <span />
            </div>
        );
        actual.node = document.createElement('div');

        assertLooksLike(
            actual,
            <div key="b">
                <span />
            </div>
        );
        expect(ref).not.toHaveBeenCalled();
        expect(actual.node).toBeInstanceOf(HTMLDivElement);
    });

    it('should preserve input trees and distinguish customized built-in element types', () => {
        const actual = <button is="special-button" className=" a  b " />;
        const expected = <button is="special-button" className="a b" />;
        const originalProps = { ...actual.props };

        assertLooksLike(actual, expected);

        expect(actual.props).toEqual(originalProps);
        expect(() =>
            assertLooksLike(actual, <button is="other-button" />)
        ).toThrow();
    });

    it('should ignore omitted events but compare explicitly expected handlers by identity', () => {
        const onClick = fn();
        assertLooksLike(<button onClick={onClick} />, <button />);
        assertLooksLike(
            <button onClick={onClick} />,
            <button onClick={onClick} />
        );
        expect(() =>
            assertLooksLike(
                <button onClick={onClick} />,
                <button onClick={fn()} />
            )
        ).toThrow();
    });
});
