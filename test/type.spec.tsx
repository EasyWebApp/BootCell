import { expect } from 'expect';
import { describe, it } from 'node:test';

import { Button, ButtonProps } from '../source/Form/Button';
import { Badge } from '../source/Reminder/Badge';
import { Icon } from '../source/Reminder/Icon';
import { assertLooksLike } from 'dom-renderer/assert';
import {
    BackgroundColor,
    Size,
    Status,
    TextColor,
    ThemeColor
} from '../source/type';

type Rejects<Values, Legacy> =
    Extract<Legacy, NonNullable<Values>> extends never ? true : false;

describe('Bootstrap 6 naming', () => {
    it('should generate native theme classes without color aliases', () => {
        for (const theme of Object.values(Status))
            assertLooksLike(
                <Button theme={theme} />,
                <button className={`btn theme-${theme}`} />
            );
    });

    it('should generate native background and foreground utilities', () => {
        const backgrounds: BackgroundColor[] = [
            'body',
            'black',
            'white',
            '1',
            '2',
            '3',
            '4',
            'transparent',
            'accent',
            'inverse',
            'subtle-primary',
            'muted-accent'
        ];
        const foregrounds: TextColor[] = [
            'body',
            'black',
            'white',
            '1',
            '2',
            '3',
            '4',
            'reset',
            'accent',
            'inverse',
            'emphasis-primary',
            'contrast-accent'
        ];

        for (const color of backgrounds)
            assertLooksLike(
                <Badge bg={color} />,
                <span
                    className={`badge ${Object.hasOwn(Status, color) ? `theme-${color} ` : ''}bg-${color}`}
                />
            );
        for (const color of foregrounds)
            assertLooksLike(
                <Icon name="heart" color={color} />,
                <i className={`bi-heart fg-${color}`} />
            );
    });

    it('should reject legacy names in the exported types', () => {
        const rejected: [
            Rejects<
                ButtonProps['variant'],
                'primary' | 'outline-primary' | 'outline-dark'
            >,
            Rejects<ThemeColor, 'dark' | 'light' | 'tertiary' | 'body'>,
            Rejects<TextColor, 'dark' | 'light' | 'muted'>,
            Rejects<
                BackgroundColor,
                | 'dark'
                | 'light'
                | 'body-tertiary'
                | 'body-secondary'
                | 'primary-subtle'
            >,
            Rejects<Size, 'xxl'>
        ] = [true, true, true, true, true];

        expect(rejected).toEqual([true, true, true, true, true]);
    });
});
