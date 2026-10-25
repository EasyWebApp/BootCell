import { observable } from 'mobx';
import {
    FC,
    WebCell,
    WebCellProps,
    attribute,
    component,
    observer,
    on,
    reaction
} from 'web-cell';

export const AccordionItem: FC<WebCellProps<HTMLDetailsElement>> = ({
    className = '',
    children,
    ...props
}) => (
    <details className={`accordion-item ${className}`} {...props}>
        {children}
    </details>
);

export const AccordionHeader: FC<WebCellProps<HTMLElement>> = ({
    className = '',
    children,
    ...props
}) => (
    <summary className={`accordion-header ${className}`} {...props}>
        {children}
        <svg
            className="accordion-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path d="m2 5 6 6 6-6" />
        </svg>
    </summary>
);

export const AccordionBody: FC<WebCellProps<HTMLDivElement>> = ({
    className = '',
    children,
    ...props
}) => (
    <div className={`accordion-body ${className}`} {...props}>
        {children}
    </div>
);

export interface AccordionProps {
    flush?: boolean;
    alwaysOpen?: boolean;
}

export interface Accordion extends WebCell<AccordionProps> {}

@component({
    tagName: 'accordion-box',
    mode: 'open'
})
@observer
export class Accordion extends HTMLElement implements WebCell<AccordionProps> {
    @attribute
    @observable
    accessor flush = false;

    @attribute
    @observable
    accessor alwaysOpen = false;

    connectedCallback() {
        this.classList.add('accordion');
    }

    @reaction(({ flush }) => flush)
    handleFlush(flush: boolean) {
        this.classList.toggle('accordion-flush', flush);
    }

    @on('click', '.accordion-header')
    handleClick(_, currentHeader: HTMLElement) {
        const currentItem = currentHeader.parentElement as HTMLDetailsElement;

        if (!this.alwaysOpen && !currentItem.open)
            for (const item of this.querySelectorAll<HTMLDetailsElement>(
                '.accordion-item[open]'
            ))
                if (item !== currentItem) item.open = false;
    }

    render() {
        return <slot />;
    }
}
