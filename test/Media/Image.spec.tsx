import { expect } from 'expect';
import { describe, it } from 'node:test';

import { Image } from '../../source/Media/Image';
import { render } from '../render';

describe('Image', () => {
    it('should render a thumbnail and preserve native image properties', () => {
        const image = render(
            <Image thumbnail src="test.png" alt="Test" loading="lazy" />
        ).querySelector('img');

        expect(image.className).toBe('img-thumbnail');
        expect(image.getAttribute('src')).toBe('test.png');
        expect(image.alt).toBe('Test');
        expect(image.loading).toBe('lazy');
    });

    it('should compose fluid and rounded styles with custom classes', () => {
        expect(
            render(<Image fluid rounded className="test" />).firstElementChild
                .className
        ).toBe('img-fluid rounded test');
        expect(
            render(<Image roundedCircle />).firstElementChild.className
        ).toBe('rounded-circle');
    });
});
