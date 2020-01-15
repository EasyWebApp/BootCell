import {
    VNodeChildElement,
    component,
    mixin,
    watch,
    attribute,
    createCell,
    Fragment
} from 'web-cell';
import classNames from 'classnames';
import { uniqueID } from '../utility';

import { NavProps, Nav } from '../Navigator';
import { ListGroup } from './ListGroup';

interface TabItem {
    title: string;
    content?: VNodeChildElement[];
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

const TabTransition = {
    keyframes: [{ opacity: 1 }, { opacity: 0 }],
    options: {
        duration: 250,
        easing: 'linear'
    }
};

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

        const keyframes = [...TabTransition.keyframes];

        await this.tabBody.animate(keyframes, TabTransition.options).finished;

        this.tabBody.style.opacity = '0';

        const {
            dataset: { index }
        } = event.target as HTMLElement;

        await this.setProps({ activeIndex: +index });

        await this.tabBody.animate(keyframes.reverse(), TabTransition.options)
            .finished;

        this.tabBody.style.opacity = '1';
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
        const column = direction === 'column';

        return (
            <Fragment>
                {this.renderHeader()}

                <div
                    className={classNames(
                        'tab-content',
                        'flex-fill',
                        'bg-white',
                        column && 'ml-3'
                    )}
                >
                    {(({ content }, index) => (
                        <section
                            className={classNames(column && 'h-100')}
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
