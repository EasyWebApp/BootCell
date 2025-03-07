import { JsxChildren } from 'dom-renderer';
import { observable } from 'mobx';
import {
    attribute,
    component,
    formField,
    observer,
    WebCellProps,
    WebField
} from 'web-cell';

export interface RangeInputProps extends WebCellProps<HTMLInputElement> {
    icon?: JsxChildren | ((itemValue: number) => JsxChildren);
}

export interface RangeInput extends WebField<RangeInputProps> {}

@component({ tagName: 'range-input', mode: 'open' })
@formField
@observer
export class RangeInput
    extends HTMLElement
    implements WebField<RangeInputProps>
{
    @attribute
    @observable
    accessor type = 'range';

    @attribute
    @observable
    accessor min: number | undefined;

    @attribute
    @observable
    accessor max: number | undefined;

    @attribute
    @observable
    accessor step = 1;

    @observable
    accessor icon: RangeInputProps['icon'] | undefined;

    connectedCallback() {
        this.classList.add('d-inline-block', 'position-relative');
    }

    handleChange = ({ currentTarget }: Event) => {
        this.value = (currentTarget as HTMLInputElement).value;

        this.emit('change');
    };

    renderItem(index: number) {
        const { icon, step, value } = this;
        const fullValue = step * index;
        const itemValue = Math.max(Math.min(+value - fullValue, step), 0);

        return (
            <li key={index} className="text-center">
                {typeof icon === 'function' ? icon(itemValue) : icon}
            </li>
        );
    }

    render() {
        const { icon, min, max = icon ? 5 : 100, value = min || 0 } = this;

        return (
            <>
                <link
                    rel="stylesheet"
                    href="https://unpkg.com/bootstrap@5.3.3/dist/css/bootstrap.min.css"
                />
                <input
                    className={icon ? 'opacity-0' : ''}
                    style={{ margin: '0 -0.5rem', cursor: 'pointer' }}
                    type="range"
                    min={min?.toString()}
                    max={max?.toString()}
                    value={value?.toString()}
                    onChange={this.handleChange}
                />
                <ol className="list-unstyled user-select-none position-absolute start-0 top-0 w-100 h-100 pe-none d-flex justify-content-around">
                    {Array.from({ length: max }, (_, index) =>
                        this.renderItem(index)
                    )}
                </ol>
            </>
        );
    }
}
