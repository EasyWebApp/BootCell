import {
    VNodeChildElement,
    WebCellProps,
    component,
    mixin,
    watch,
    attribute,
    createCell,
    Fragment
} from 'web-cell';
import { uniqueID } from 'web-utility/source/data';
import { transitOut, transitIn } from 'web-utility/source/animation';
import classNames from 'classnames';

import { NavProps, NavLink, Nav } from '../Navigator/Nav';
import { ListItem, ListGroup } from './ListGroup';

interface TabItem {
    title: string;
    content?: VNodeChildElement | VNodeChildElement[];
    disabled?: boolean;
}

export interface TabListProps extends WebCellProps {
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

    connectedCallback() {
        this.classList.add(
            'd-flex',
            'w-100',
            this.direction === 'row' ? 'flex-column' : 'flex-row'
        );
        super.connectedCallback();
    }

    private tabBody: HTMLElement;

    handleTabChange = async (event: MouseEvent) => {
        event.preventDefault(), event.stopPropagation();

        if (!this.tabBody) return;

        await transitOut(this.tabBody, 'show');

        const {
            dataset: { index }
        } = event.target as HTMLElement;

        await this.setProps({ activeIndex: +index });

        await transitIn(this.tabBody, 'show');
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
        const Tab = mode === 'list' ? ListItem : NavLink;

        const tabList = list.map(({ title, disabled }, index) => {
            const bID = `${UID}_b_${index}`,
                active = Boolean(!disabled && index === activeIndex);
            const props = {
                disabled,
                active,
                id: `${UID}_h_${index}`,
                href: '#' + bID,
                role: 'tab',
                'aria-controls': bID,
                'aria-selected': active + '',
                'data-index': index + ''
            };
            return <Tab {...props}>{title}</Tab>;
        });

        return mode === 'list' ? (
            <ListGroup
                horizontal={direction === 'row'}
                role="tablist"
                onClick={this.handleTabChange}
            >
                {tabList}
            </ListGroup>
        ) : (
            <Nav
                direction={direction}
                align={tabAlign}
                itemMode={mode}
                itemWidth={tabWidth}
                aria-orientation={
                    direction === 'row' ? 'horizontal' : 'vertical'
                }
                onClick={this.handleTabChange}
            >
                {tabList}
            </Nav>
        );
    }

    render() {
        const { UID, direction, list, activeIndex } = this;
        const column = direction === 'column';

        return (
            <Fragment>
                {this.renderHeader()}

                <div
                    className={classNames(
                        'tab-content',
                        'flex-fill',
                        column ? 'ml-3' : 'pt-2'
                    )}
                >
                    {(({ content }, index) => (
                        <section
                            className={classNames(
                                'fade',
                                'show',
                                column && 'h-100'
                            )}
                            ref={(tag: HTMLElement) => (this.tabBody = tag)}
                            id={`${UID}_b_${index}`}
                            role="tabpanel"
                            aria-labelledby={`${UID}_h_${index}`}
                        >
                            {content}
                        </section>
                    ))(list[activeIndex], activeIndex)}
                </div>
            </Fragment>
        );
    }
}
