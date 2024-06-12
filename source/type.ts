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

export type Color =
    | Exclude<keyof typeof Status, 'tertiary'>
    | keyof typeof Theme;

export type BackgroundColor =
    | Subtle<Color>
    | `body${'' | '-emphasis' | '-secondary' | '-tertiary'}`
    | 'black'
    | 'white'
    | 'transparent';

export type Size = 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export type PositionY = 'top' | 'bottom';
