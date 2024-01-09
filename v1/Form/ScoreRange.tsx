import {
    WebFieldProps,
    component,
    mixinForm,
    watch,
    attribute,
    on,
    createCell
} from 'web-cell';

export interface ScoreRangeProps extends WebFieldProps {
    max?: number;
    emptyIcon?: string;
    fullIcon?: string;
}

@component({
    tagName: 'score-range',
    style: {
        ':host span': {
            display: 'inline-block',
            fontSize: '1.5rem',
            lineHeight: '1.5rem',
            width: '1.5rem',
            textAlign: 'center',
            cursor: 'pointer',
            '-moz-user-select': 'none',
            '-webkit-user-select': 'none',
            '-ms-user-select': 'none',
            'user-select': 'none'
        },
        ':host(:disabled) span': {
            cursor: 'not-allowed'
        }
    }
})
export class ScoreRange extends mixinForm<ScoreRangeProps>() {
    @attribute
    @watch
    max = 5;

    @attribute
    @watch
    emptyIcon = '☆';

    @attribute
    @watch
    fullIcon = '★';

    @on('click', ':host span')
    handleClick({ target }: MouseEvent) {
        if (!this.state.disabled)
            this.value = (target as HTMLElement).dataset.count;
    }

    render({ max, value, fullIcon, emptyIcon }: ScoreRangeProps) {
        return Array.from(new Array(max), (_, index) => (
            <span data-count={index + 1}>
                {+value > index ? fullIcon : emptyIcon}
            </span>
        ));
    }
}
