import {
    VNodeChildElement,
    component,
    mixin,
    watch,
    on,
    createCell,
    Fragment
} from 'web-cell';
import classNames from 'classnames';

import { HTMLProps, uniqueID } from '../utility';
import { CollapseBox } from './Collapse';

interface AccordionItem {
    title: VNodeChildElement;
    content: VNodeChildElement[];
    active?: boolean;
}

export interface AccordionProps extends HTMLProps {
    list: AccordionItem[];
}

@component({
    tagName: 'accordion-list',
    renderTarget: 'children'
})
export class AccordionList extends mixin<AccordionProps>() {
    UID = uniqueID();

    @watch
    list: AccordionItem[] = [];

    @on('click', '.card-header .btn-link')
    toggle(event: MouseEvent) {
        const {
            dataset: { index }
        } = event.target as HTMLElement;

        this.list = this.list.map((item, i) => ({
            ...item,
            active: i === +index
        }));
    }

    connectedCallback() {
        this.classList.add('accordion');

        super.connectedCallback();
    }

    render({ list }: AccordionProps) {
        const { UID } = this;

        return (
            <Fragment>
                {list.map(({ title, content, active }, index) => {
                    const hID = `${UID}_h_${index}`,
                        bID = `${UID}_b_${index}`;

                    return (
                        <section className="card">
                            <header className="card-header" id={hID}>
                                <h2 className="mb-0">
                                    <button
                                        type="button"
                                        className={classNames(
                                            'btn',
                                            'btn-link',
                                            !active && 'collapsed'
                                        )}
                                        data-index={index + ''}
                                        aria-expanded={Boolean(active) + ''}
                                        aria-controls={bID}
                                    >
                                        {title}
                                    </button>
                                </h2>
                            </header>
                            <CollapseBox
                                id={bID}
                                aria-labelledby={hID}
                                key={bID}
                                open={active}
                            >
                                <div className="card-body">{content}</div>
                            </CollapseBox>
                        </section>
                    );
                })}
            </Fragment>
        );
    }
}
