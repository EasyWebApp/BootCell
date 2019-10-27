import { component, mixin, watch, createCell } from 'web-cell';
import classNames from 'classnames';
import { uniqueID } from '../utility';
import { NavProps, Nav } from '../Navigator';

interface TabItem {
    title: any;
    content?: any;
    active?: boolean;
    disabled?: boolean;
}

@component({
    tagName: 'tab-list',
    renderTarget: 'children'
})
export class TabList extends mixin() {
    UID = uniqueID();

    @watch
    mode: NavProps['itemMode'] = 'tabs';

    @watch
    direction: NavProps['direction'] = 'row';

    @watch
    tabAlign: NavProps['align'] = 'start';

    @watch
    tabWidth: NavProps['itemWidth'];

    @watch
    list: TabItem[] = [];

    handleTabChange = (event: MouseEvent) => {
        const {
            dataset: { index }
        } = event.target as HTMLElement;

        event.preventDefault(), event.stopPropagation();

        this.list = this.list.map(({ title, content, disabled }, i) => ({
            title,
            content,
            disabled,
            active: i === +index
        }));
    };

    render() {
        const { UID, mode, direction, tabAlign, tabWidth, list } = this;

        return (
            <main>
                <Nav
                    direction={direction}
                    align={tabAlign}
                    itemMode={mode}
                    itemWidth={tabWidth}
                    list={list.map(({ title, active, disabled }, index) => {
                        active = Boolean(!disabled && active);

                        const bID = `${UID}_b_${index}`;

                        return {
                            title,
                            active,
                            disabled,
                            id: `${UID}_h_${index}`,
                            href: '#' + bID,
                            role: 'tab',
                            'aria-controls': bID,
                            'aria-selected': active + '',
                            'data-index': index + ''
                        };
                    })}
                    onClick={this.handleTabChange}
                />

                <div className="tab-content">
                    {list.map(({ active, content }, index) => (
                        <section
                            className={classNames(
                                'tab-pane',
                                'fade',
                                active && 'active show'
                            )}
                            id={`${UID}_b_${index}`}
                            role="tabpanel"
                            aria-labelledby={`${UID}_h_${index}`}
                        >
                            {content}
                        </section>
                    ))}
                </div>
            </main>
        );
    }
}
