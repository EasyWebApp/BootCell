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

export type Size = 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export type PositionY = 'top' | 'bottom';
