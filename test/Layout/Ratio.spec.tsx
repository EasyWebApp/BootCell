import { expect } from 'expect';
import { describe, it } from 'node:test';

import { Ratio } from '../../source/Layout/Ratio';
import { render } from '../render';

describe('Ratio', () => {
    it('should wrap embedded frames using a named ratio', () => {
        const root = render(
            <Ratio aspectRatio="16x9">
                <iframe src="test.html" loading="lazy" />
            </Ratio>
        );
        expect(root.firstElementChild.className).toBe('ratio ratio-16x9');
        expect(root.querySelector('iframe').getAttribute('src')).toBe(
            'test.html'
        );
        expect(root.querySelector('iframe').loading).toBe('lazy');
    });

    it('should preserve video children and custom ratios', () => {
        expect(
            render(
                <Ratio aspectRatio="4x3">
                    <video src="test.mp4" />
                </Ratio>
            ).firstElementChild.className
        ).toBe('ratio ratio-4x3');

        const root = render(
            <Ratio aspectRatio={0.75} style={{ color: 'red' }}>
                <video src="test.mp4" />
            </Ratio>
        );
        const box = root.querySelector('div');

        expect(box.style.getPropertyValue('--bs-aspect-ratio')).toBe('75%');
        expect(box.style.color).toBe('red');
        expect(root.querySelector('video').getAttribute('src')).toBe(
            'test.mp4'
        );
    });
});
