import {
    WebCellProps,
    VNode,
    component,
    mixin,
    watch,
    attribute,
    on,
    createCell,
    Fragment
} from 'web-cell';
import classNames from 'classnames';
import { uniqueID } from 'web-utility/source/data';
import { transitOut, transitIn } from 'web-utility/source/animation';

import { NavProps, isNavLink, Nav } from '../Navigator/Nav';
import { isListItem, ListGroup } from './ListGroup';
import { Stepper, isStep } from '../Navigator/Stepper';

export function TabPanel({ className, defaultSlot, ...rest }: WebCellProps) {
    return (
        <div
            {...rest}
            className={classNames('bs-stepper-pane', className)}
            role="tabpanel"
        >
            {defaultSlot}
        </div>
    );
}

export interface TabViewProps extends WebCellProps {
    mode?: NavProps['itemMode'] | 'list' | 'step';
    direction?: NavProps['direction'];
    tabAlign?: NavProps['align'];
    tabWidth?: NavProps['itemWidth'];
    tabScroll?: boolean;
    tabColor?: NavProps['background'];
    linear?: boolean;
    activeIndex?: number;
}

const HeaderSelector = {
    nav: '.nav-link',
    list: '.list-group-item',
    step: '.bs-stepper-header .step'
};
const AllHeaders = Object.values(HeaderSelector) + '';

@component({
    tagName: 'tab-view',
    renderTarget: 'children'
})
export class TabView extends mixin<TabViewProps>() {
    static isHeader(node: VNode) {
        return isNavLink(node) || isListItem(node) || isStep(node);
    }

    @attribute
    @watch
    mode: TabViewProps['mode'] = 'tabs';

    @attribute
    @watch
    direction: NavProps['direction'] = 'row';

    @attribute
    @watch
    tabAlign: NavProps['align'] = 'start';

    @attribute
    @watch
    tabWidth: NavProps['itemWidth'];

    @attribute
    @watch
    tabScroll = false;

    @attribute
    @watch
    tabColor: NavProps['background'];

    @attribute
    @watch
    linear = false;

    @attribute
    @watch
    set activeIndex(activeIndex: number) {
        this.setProps({ activeIndex }).then(() => this.turnTo(activeIndex));
    }

    get type() {
        const firstTab = this.defaultSlot[0] as VNode;

        return isListItem(firstTab)
            ? 'list'
            : isStep(firstTab)
            ? 'step'
            : 'nav';
    }

    get headers() {
        return [...this.querySelectorAll<HTMLElement>(AllHeaders)];
    }

    get bodies() {
        return [...this.querySelectorAll<HTMLDivElement>('.bs-stepper-pane')];
    }

    async turnTo(index = 0) {
        const { headers, bodies, linear } = this;

        const oldIndex = headers.findIndex(header =>
            header.classList.contains('active')
        );
        const { [index]: newHeader, [oldIndex]: oldHeader } = headers;
        const { [index]: newBody, [oldIndex]: oldBody } = bodies;

        if (oldHeader && oldBody) {
            await transitOut(oldBody, 'active');
            oldBody.classList.remove('fade');
            oldHeader.classList.remove('active');
            oldHeader.setAttribute('aria-selected', 'false');
            if (linear) oldHeader.querySelector('button').disabled = true;
        }
        if (newHeader && newBody) {
            newBody.classList.add('fade');
            await transitIn(newBody, 'active');
            newHeader.classList.add('active');
            newHeader.setAttribute('aria-selected', 'true');
            if (linear) newHeader.querySelector('button').disabled = false;
        }
    }

    @on('click', AllHeaders)
    handleClick(event: MouseEvent) {
        event.preventDefault(), event.stopPropagation();
    }

    @on('focusin', AllHeaders)
    handleFocus(event: FocusEvent, target: HTMLElement) {
        event.preventDefault(), event.stopPropagation();

        this.activeIndex = [
            ...target.parentElement.querySelectorAll(AllHeaders)
        ].indexOf(target);
    }

    @on('submit', '.bs-stepper .bs-stepper-pane form')
    handleSubmit(event: Event, form: HTMLFormElement) {
        this.activeIndex++;
    }

    @on('reset', '.bs-stepper .bs-stepper-pane form')
    handleReset(event: Event, form: HTMLFormElement) {
        this.activeIndex--;
    }

    connectedCallback() {
        if (!this.id.trim()) this.id = uniqueID();

        super.connectedCallback();
    }

    updatedCallback() {
        const { type, direction, classList, linear, activeIndex } = this;
        const step = type === 'step',
            row = direction === 'row';

        classList.add(...(step ? ['bs-stepper'] : ['d-flex', 'w-100']));
        if (!step) {
            classList.toggle('flex-column', row);
            classList.toggle('flex-row', !row);
        } else {
            classList.toggle('vertical', !row);
            classList.toggle('linear', linear);
        }
        this.fixAttributes();

        if (typeof activeIndex !== 'number') this.activeIndex = 0;
    }

    fixAttributes() {
        const { headers, bodies, id, linear } = this;

        for (const navItem of this.querySelectorAll('.nav-item'))
            navItem.setAttribute('role', 'presentation');

        for (
            let i = 0, head: HTMLElement, body: HTMLElement;
            (body = bodies.shift()), (head = headers.shift());
            i++
        ) {
            if (!head.id) head.id = `${id}-head-${i}`;
            if (!body.id) body.id = `${id}-body-${i}`;

            const hID = head.id,
                bID = body.id;

            if (
                head instanceof HTMLAnchorElement ||
                head instanceof HTMLAreaElement
            )
                head.href = '#' + bID;

            head.setAttribute('role', 'tab');
            head.setAttribute('aria-selected', 'false');
            head.setAttribute('aria-controls', bID);
            if (linear) head.querySelector('button').disabled = true;

            body.setAttribute('role', 'tabpanel');
            body.setAttribute('aria-labelledby', hID);
        }
    }

    render({
        direction,
        tabAlign,
        mode,
        tabWidth,
        tabScroll,
        tabColor
    }: TabViewProps) {
        const { type, defaultSlot } = this,
            row = direction === 'row';

        const bodyClass =
                type !== 'step'
                    ? classNames(
                          'tab-content',
                          'flex-fill',
                          row ? 'pt-2' : 'ml-3'
                      )
                    : 'bs-stepper-content',
            orientation = row ? 'horizontal' : 'vertical';

        const [heads, bodies] = defaultSlot.reduce(
            ([heads, bodies], node: VNode) => {
                if (TabView.isHeader(node)) heads.push(node);
                else bodies.push(node);

                return [heads, bodies];
            },
            [[], []]
        );

        return (
            <Fragment>
                {type === 'nav' ? (
                    <Nav
                        direction={direction}
                        align={tabAlign}
                        itemMode={mode as NavProps['itemMode']}
                        itemWidth={tabWidth}
                        scrollable={tabScroll}
                        background={tabColor}
                        aria-orientation={orientation}
                    >
                        {heads}
                    </Nav>
                ) : type === 'list' ? (
                    <ListGroup
                        horizontal={row}
                        role="tablist"
                        aria-orientation={orientation}
                    >
                        {heads}
                    </ListGroup>
                ) : (
                    <Stepper aria-orientation={orientation}>{heads}</Stepper>
                )}

                <div className={bodyClass}>{bodies}</div>
            </Fragment>
        );
    }
}
