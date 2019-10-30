export enum Status {
    primary = 'primary',
    secondary = 'secondary',
    success = 'success',
    danger = 'danger',
    warning = 'warning',
    info = 'info'
}

export enum Theme {
    light = 'light',
    dark = 'dark'
}

export enum Color {
    body = 'body',
    muted = 'muted',
    white = 'white',
    black = 'black'
}

export type ColorNames = Status | Theme | Color;

export enum Size {
    xl = 'xl',
    lg = 'lg',
    md = 'md',
    sm = 'sm',
    xs = 'xs'
}
