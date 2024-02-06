import { computed, observable } from 'mobx';
import { WebCell, attribute, component, observer } from 'web-cell';

import { Status } from './type';

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

export interface CountDown extends WebCell<CountDownProps> {}

@component({ tagName: 'count-down' })
@observer
export class CountDown extends HTMLElement implements WebCell<CountDownProps> {
    @attribute
    @observable
    accessor endTime: CountDownProps['endTime'] = Date.now();

    @observable
    accessor rest = 0;

    @observable
    accessor units: TimeUnit[] = [
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

    @computed
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
                        key={value}
                        className={`list-inline-item display-4 bg-${colors[index]} d-inline-flex align-items-center justify-content-center rounded-5`}
                        style={{ width: '5.5rem', height: '5.5rem' }}
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
