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

export type CommonColors = keyof typeof Status | keyof typeof Theme;
export type TextColors = CommonColors | keyof typeof Color;
export type BackgroundColors = CommonColors | 'white' | 'transparent';

export enum Size {
    xl = 1200,
    lg = 992,
    md = 768,
    sm = 576,
    xs = 0
}

export enum Position {
    left = 'left',
    right = 'right',
    top = 'top',
    bottom = 'bottom'
}

export enum JustityType {
    start = 'start',
    center = 'center',
    end = 'end',
    between = 'between',
    around = 'around'
}
