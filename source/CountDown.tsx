import { component, mixin, attribute, watch, createCell } from 'web-cell';

import { Status } from './utility';
import style from './CountDown.less';

interface TimeUnit {
    scale: number;
    label: string;
}

interface TimeSection {
    value: number;
    label: string;
}

const colors = Object.keys(Status).slice(0, 4);

export interface CountDownProps {
    endTime?: string | Date | number;
}

@component({
    tagName: 'count-down',
    renderTarget: 'children'
})
export class CountDown extends mixin<CountDownProps>() {
    @attribute
    @watch
    endTime: CountDownProps['endTime'] = Date.now();

    @watch
    rest = 0;

    @watch
    units: TimeUnit[] = [
        {
            scale: 24,
            label: 'D'
        },
        {
            scale: 60,
            label: 'h'
        },
        {
            scale: 60,
            label: 'm'
        },
        {
            scale: 1000,
            label: 's'
        }
    ];

    get timeSections() {
        var { rest } = this;

        return this.units.reduce((list, { label }, index, units) => {
            const scale = units
                .slice(index)
                .map(({ scale }) => scale)
                .reduce((sum: number, scale: number) => sum * scale, 1);

            const value = ~~(rest / scale);

            rest -= value * scale;

            list.push({ value, label });

            return list;
        }, [] as TimeSection[]);
    }

    private timer: number;

    tick = () => {
        const rest = (this.endTime as number) - Date.now();

        if (rest > 0) {
            this.rest = rest;

            if (!this.timer) this.timer = self.setInterval(this.tick, 1000);
        } else if (this.timer) clearInterval(this.timer);
    };

    connectedCallback() {
        if (typeof this.endTime !== 'number')
            this.endTime = new Date(this.endTime).valueOf();

        this.tick();
    }

    disconnectedCallback() {
        clearInterval(this.timer);
    }

    render() {
        return (
            <ol className="list-inline text-white">
                {this.timeSections.map(({ value, label }, index) => (
                    <li
                        className={`list-inline-item display-4 bg-${colors[index]} ${style.section}`}
                    >
                        <small>
                            {(value + '').padStart(2, '0')}
                            <sub>{label}</sub>
                        </small>
                    </li>
                ))}
            </ol>
        );
    }
}
