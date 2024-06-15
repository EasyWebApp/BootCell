import classNames from 'classnames';
import { JsxChildren } from 'dom-renderer';
import { computed, observable } from 'mobx';
import { WebCell, attribute, component, observer } from 'web-cell';
import {
    Day,
    TimeData,
    changeMonth,
    formatDate,
    splitArray
} from 'web-utility';

import { Badge } from './Reminder';
import { Button, ButtonProps } from './Button';
import { Table, TableProps } from './Content';

export interface DateData {
    date: TimeData;
    content: JsxChildren;
    link?: string;
}

export interface MonthCalendarProps
    extends Omit<TableProps, 'variant' | 'onChange' | 'onSelect'>,
        Pick<ButtonProps, 'variant'> {
    locale?: Navigator['language'];
    value?: DateData[];
    onSelect?: (event: CustomEvent<DateData>) => any;
    onChange?: (event: CustomEvent<Date>) => any;
}

export interface MonthCalendar extends WebCell<MonthCalendarProps> {}

@component({ tagName: 'month-calendar' })
@observer
export class MonthCalendar
    extends HTMLElement
    implements WebCell<MonthCalendarProps>
{
    @attribute
    @observable
    accessor variant: MonthCalendarProps['variant'] = 'primary';

    @attribute
    @observable
    accessor locale: Navigator['language'];

    @observable
    accessor value: DateData[] = [];

    @computed
    get weekFormatter() {
        const { locale = globalThis.navigator?.language } = this;

        return new Intl.DateTimeFormat(locale, { weekday: 'long' });
    }

    @observable
    accessor currentDate = new Date();

    @computed
    get dateGrid() {
        let startDate = new Date(this.currentDate);
        startDate.setDate(1);
        startDate = new Date(+startDate - startDate.getDay() * Day);

        const dateList = Array.from(
            new Array(42),
            (_, index) => new Date(+startDate + index * Day)
        );
        return splitArray(dateList, 7);
    }

    changeMonth(delta: number) {
        this.currentDate = changeMonth(this.currentDate, delta);

        this.emit('change', this.currentDate);
    }

    renderDate = (date: Date) => {
        const { value } = this,
            dateText = formatDate(date, 'YYYY-MM-DD');
        const list = value?.filter(
            ({ date }) => formatDate(date, 'YYYY-MM-DD') === dateText
        );

        return (
            <td
                key={date + ''}
                className={classNames({
                    'opacity-50':
                        date.getMonth() !== this.currentDate.getMonth(),
                    'fw-bold': dateText === formatDate(new Date(), 'YYYY-MM-DD')
                })}
            >
                <time className="d-block" dateTime={date.toJSON()}>
                    {date.getDate()}
                </time>

                {list?.map(item =>
                    typeof item.content === 'object' ? (
                        item.content
                    ) : (
                        <Badge
                            className="d-inline-block text-decoration-none w-100 text-truncate"
                            href={item.link}
                            onClick={() => this.emit('select', item)}
                        >
                            {item.content}
                        </Badge>
                    )
                )}
            </td>
        );
    };

    render() {
        const { style, variant, weekFormatter, currentDate, dateGrid } = this;

        return (
            <Table style={{ tableLayout: 'fixed', ...style }}>
                <caption>
                    <div className="d-flex justify-content-between align-items-center">
                        <Button
                            variant={variant}
                            onClick={() => this.changeMonth(-1)}
                        >
                            &lt;
                        </Button>

                        {formatDate(currentDate, 'YYYY-MM')}

                        <Button
                            variant={variant}
                            onClick={() => this.changeMonth(1)}
                        >
                            &gt;
                        </Button>
                    </div>
                </caption>
                <thead>
                    <tr>
                        {dateGrid[0].map((date, index, { length }) => (
                            <td
                                key={index}
                                className={`bg-${variant} text-white`}
                                style={{ width: `calc(100% / ${length})` }}
                            >
                                {weekFormatter.format(date)}
                            </td>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {dateGrid.map(days => (
                        <tr key={days[0] + ''}>{days.map(this.renderDate)}</tr>
                    ))}
                </tbody>
            </Table>
        );
    }
}
