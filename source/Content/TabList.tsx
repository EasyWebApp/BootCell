import { component, mixin, watch, attribute, createCell } from 'web-cell';
import classNames from 'classnames';
import { uniqueID } from '../utility';

import { NavProps, Nav } from '../Navigator';
import { ListGroup } from './ListGroup';

interface TabItem {
    title: any;
    content?: any;
    disabled?: boolean;
}

export interface TabListProps {
    mode?: NavProps['itemMode'] | 'list';
    direction?: NavProps['direction'];
    tabAlign?: NavProps['align'];
    tabWidth?: NavProps['itemWidth'];
    list?: TabItem[];
    activeIndex?: number;
}

@component({
    tagName: 'tab-list',
    renderTarget: 'children'
})
export class TabList extends mixin<TabListProps>() {
    UID = uniqueID();

    @attribute
    @watch
    mode: TabListProps['mode'] = 'tabs';

    @attribute
    @watch
    direction: NavProps['direction'] = 'row';

    @attribute
    @watch
    tabAlign: NavProps['align'] = 'start';

    @attribute
    @watch
    tabWidth: NavProps['itemWidth'];

    @watch
    list: TabItem[] = [];

    @watch
    activeIndex = 0;

    handleTabChange = (event: MouseEvent) => {
        const {
            dataset: { index }
        } = event.target as HTMLElement;

        event.preventDefault(), event.stopPropagation();

        this.activeIndex = +index;
    };

    renderHeader() {
        const {
            mode,
            direction,
            tabAlign,
            tabWidth,
            list,
            activeIndex,
            UID
        } = this;

        const tabList = list.map(({ title, disabled }, index) => {
            const bID = `${UID}_b_${index}`,
                active = Boolean(!disabled && index === activeIndex);

            return {
                title,
                disabled,
                id: `${UID}_h_${index}`,
                href: '#' + bID,
                role: 'tab',
                'aria-controls': bID,
                'aria-selected': active + '',
                'data-index': index + ''
            };
        });

        return mode === 'list' ? (
            <ListGroup
                list={tabList}
                activeIndex={activeIndex}
                horizontal={direction === 'row'}
                role="tablist"
                onClick={this.handleTabChange}
            />
        ) : (
            <Nav
                direction={direction}
                align={tabAlign}
                itemMode={mode}
                itemWidth={tabWidth}
                list={tabList}
                activeIndex={activeIndex}
                role="tablist"
                aria-orientation={
                    direction === 'row' ? 'horizontal' : 'vertical'
                }
                onClick={this.handleTabChange}
            />
        );
    }

    render() {
        const { UID, direction, list, activeIndex } = this;

        return (
            <main
                className={`d-flex ${
                    direction === 'row' ? 'flex-column' : 'flex-row'
                }`}
            >
                {this.renderHeader()}

                <div className="tab-content">
                    {list.map(({ content }, index) => (
                        <section
                            className={classNames(
                                'tab-pane',
                                'fade',
                                index === activeIndex && 'active show'
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
