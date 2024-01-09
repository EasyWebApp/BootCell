type Subtle<T extends string> = `${T}${'' | '-subtle'}`;

export type Color =
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark';

export type BackgroundColor =
    | Subtle<Color>
    | `body${'' | '-secondary' | '-tertiary'}`
    | 'black'
    | 'white'
    | 'transparent';

export type Size = 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export type PositionY = 'top' | 'bottom';
