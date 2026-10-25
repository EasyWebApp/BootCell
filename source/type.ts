type Subtle<T extends string> = `${T}${'' | '-subtle'}`;

export enum Status {
    primary = 'primary',
    secondary = 'secondary',
    tertiary = 'tertiary',
    success = 'success',
    info = 'info',
    warning = 'warning',
    danger = 'danger'
}

export enum Theme {
    light = 'light',
    dark = 'dark'
}

export type BasicColor = 'body' | 'black' | 'white';

export type TextColor =
    | BasicColor
    | Exclude<keyof typeof Status, 'tertiary'>
    | keyof typeof Theme;

export type BackgroundColor =
    | Subtle<TextColor>
    | `body-${'emphasis' | 'secondary' | 'tertiary'}`
    | BasicColor
    | 'transparent';

export function themeClassName(color: string) {
    switch (color) {
        case 'dark':
        case 'black':
            return 'theme-inverse';
        case 'light':
        case 'white':
        case 'body':
        case 'tertiary':
            return 'theme-secondary';
        default:
            return `theme-${color}`;
    }
}

export function foregroundClassName(color: string) {
    switch (color) {
        case 'dark':
            return 'fg-body';
        case 'light':
            return 'fg-white';
        case 'muted':
            return 'fg-secondary';
        default:
            return `fg-${color}`;
    }
}

export function backgroundClassName(color: BackgroundColor) {
    switch (color) {
        case 'body-tertiary':
        case 'light':
            return 'bg-1';
        case 'body-secondary':
            return 'bg-2';
        case 'body-emphasis':
        case 'body':
            return 'bg-body';
        case 'dark':
            return 'theme-inverse';
        default:
            return `bg-${color}`;
    }
}

export type Size = 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export type PositionY = 'top' | 'bottom';
