export interface HTMLProps {
    id?: string;
    className?: string;
    title?: string;
    tabIndex?: number;
    [key: string]: any;
}

export interface HTMLHyperLinkProps extends HTMLProps {
    href?: string | URL;
    target?: '_self' | '_parent' | '_top' | '_blank';
}
