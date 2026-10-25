export enum Status {
    primary = 'primary',
    secondary = 'secondary',
    success = 'success',
    info = 'info',
    warning = 'warning',
    danger = 'danger',
    accent = 'accent',
    inverse = 'inverse'
}

export enum Theme {
    light = 'light',
    dark = 'dark'
}

export type BasicColor = 'body' | 'black' | 'white';

export type ThemeColor = keyof typeof Status;

type LayerColor = '1' | '2' | '3' | '4';

export type TextColor =
    | BasicColor
    | LayerColor
    | ThemeColor
    | `${'emphasis' | 'contrast'}-${ThemeColor}`
    | 'reset';

export type BackgroundColor =
    | ThemeColor
    | `${'subtle' | 'muted'}-${ThemeColor}`
    | BasicColor
    | LayerColor
    | 'transparent';

export type Size = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export type PositionY = 'top' | 'bottom';
