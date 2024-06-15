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

import { CollapseProps, Collapse } from './Collapse';

export const AccordionItem: FC<WebCellProps<HTMLDivElement>> = ({
    className = '',
    children,
    ...props
}) => (
    <div className={`accordion-item ${className}`} {...props}>
        {children}
    </div>
);

export const AccordionHeader: FC<WebCellProps<HTMLHeadingElement>> = ({
    className = '',
    children,
    onClick,
    ...props
}) => (
    <h2 className={`accordion-header ${className}`} {...props}>
        <button className="accordion-button" type="button" onClick={onClick}>
            {children}
        </button>
    </h2>
);

export const AccordionBody: FC<CollapseProps> = ({
    className = '',
    children,
    ...props
}) => (
    <Collapse className={`accordion-collapse ${className}`} {...props}>
        <div className="accordion-body">{children}</div>
    </Collapse>
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
    handleClick(
        _,
        { nextElementSibling: currentCollapse }: HTMLHeadingElement
    ) {
        if (!this.alwaysOpen)
            for (const collapse of this.querySelectorAll<HTMLDivElement>(
                '.accordion-collapse'
            ))
                if (collapse !== currentCollapse) {
                    collapse.classList.remove('show');
                    collapse.previousElementSibling.querySelector(
                        'button'
                    ).ariaExpanded = 'false';
                }
        currentCollapse.classList.toggle('show');
        currentCollapse.previousElementSibling.querySelector(
            'button'
        ).ariaExpanded = 'false';
    }

    render() {
        return <slot />;
    }
}
