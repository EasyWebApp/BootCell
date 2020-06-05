import {
    WebCellProps,
    component,
    mixin,
    watch,
    attribute,
    createCell
} from 'web-cell';

interface Header {
    level: number;
    text: string;
    id: string;
}

export interface HeaderListProps extends WebCellProps {
    list?: Header[];
    activeIndex?: number;
}

const observer_map = new WeakMap();

@component({
    tagName: 'header-list',
    renderTarget: 'children'
})
export class HeaderList extends mixin<HeaderListProps>() {
    @watch
    list = [];

    @attribute
    @watch
    activeIndex = 0;

    watch(header: HTMLHeadingElement, index: number) {
        var observer = observer_map.get(header);

        if (observer) return;

        observer = new IntersectionObserver(
            ([{ isIntersecting }]) =>
                isIntersecting && (this.activeIndex = index)
        );
        observer.observe(header);

        observer_map.set(header, observer);
    }

    spy(box: HTMLElement) {
        this.list = Array.from(
            box.querySelectorAll<HTMLHeadingElement>('h1, h2, h3, h4'),
            (header, index) => {
                this.watch(header, index);

                if (!header.id.trim())
                    header.id = header.textContent.trim().replace(/\W+/g, '-');

                return {
                    level: header.tagName[1],
                    text: header.textContent.trim(),
                    id: header.id
                };
            }
        );
    }

    connectedCallback() {
        this.classList.add('sticky-top');

        super.connectedCallback();
    }

    render({ list, activeIndex }: HeaderListProps) {
        return list.map(({ level, id, text }, index) => (
            <a
                className="d-block pl-2 text-nowrap"
                style={{
                    fontSize: `${0.5 + (6 - level) / 10}rem`,
                    textIndent: `${level - 1}rem`,
                    borderLeft: '2px solid',
                    borderLeftColor:
                        index === activeIndex ? 'lightblue' : 'transparent',
                    transition: '0.25s'
                }}
                href={'#' + id}
            >
                {text}
            </a>
        ));
    }
}
