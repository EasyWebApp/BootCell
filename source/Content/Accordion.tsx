import { WebCellProps, createCell, delegate } from 'web-cell';
import { uniqueID } from 'web-utility/source/data';
import classNames from 'classnames';

import { Button } from '../Form/Button';
import './Collapse';
import { CollapseBox } from './Collapse';

export interface AccordionPanelProps extends WebCellProps {
    active?: boolean;
}

export function AccordionPanel({
    id = uniqueID(),
    active,
    title,
    defaultSlot
}: AccordionPanelProps) {
    const hID = `accordion_h_${id}`,
        bID = `accordion_b_${id}`;

    return (
        <section className="card">
            <header className="card-header" id={hID}>
                <h2 className="mb-0">
                    <Button
                        color="link"
                        className={active ? '' : 'collapsed'}
                        aria-expanded={!!active + ''}
                        aria-controls={bID}
                    >
                        {title}
                    </Button>
                </h2>
            </header>
            <collapse-box
                id={bID}
                aria-labelledby={hID}
                key={bID}
                open={active}
            >
                <div className="card-body">{defaultSlot}</div>
            </collapse-box>
        </section>
    );
}

export interface AccordionProps extends WebCellProps {}

const AllHeaders = '.card-header .btn';

function switchAccordion(
    { currentTarget }: FocusEvent,
    target: HTMLButtonElement
) {
    for (const header of (currentTarget as HTMLDivElement).querySelectorAll(
        AllHeaders
    )) {
        const active = header === target;

        if (active) header.classList.remove('collapsed');
        else header.classList.add('collapsed');

        header.setAttribute('aria-expanded', active + '');
        (header.closest('.card-header')
            .nextElementSibling as CollapseBox).open = active;
    }
}

export function Accordion({ className, defaultSlot, ...rest }: AccordionProps) {
    return (
        <div
            className={classNames('accordion', className)}
            onFocusIn={delegate(AllHeaders, switchAccordion)}
            {...rest}
        >
            {defaultSlot}
        </div>
    );
}
