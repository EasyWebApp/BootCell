import { component, mixin, watch, on, createCell } from 'web-cell';
import classNames from 'classnames';
import { HTMLProps, uniqueID } from '../utility';

interface AccordionItem {
    title: any;
    content: any;
    active?: boolean;
}

interface AccordionProps extends HTMLProps {
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

    render() {
        const { UID, list } = this;

        return (
            <main>
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
                            <div
                                id={bID}
                                className={classNames(
                                    'collapse',
                                    active && 'show'
                                )}
                                aria-labelledby={hID}
                            >
                                <div className="card-body">{content}</div>
                            </div>
                        </section>
                    );
                })}
            </main>
        );
    }
}
