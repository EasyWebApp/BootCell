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

import { Icon } from '../Reminder/Icon';

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
        <Icon
            className="accordion-icon"
            name="chevron-down"
            aria-hidden="true"
        />
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
