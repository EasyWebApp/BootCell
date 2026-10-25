export interface WeekCalendarOptions {
    date?: Date;
    weekStartsOn?: number;
    startTime?: string;
    endTime?: string;
    hourInterval?: number;
}

export interface TimeSlot {
    start: Date;
    end: Date;
}

export class WeekCalendarModel {
    private static minutes(time: string) {
        const match = /^(\d{2}):(\d{2})$/.exec(time);
        if (!match) throw new RangeError(`Invalid calendar time: ${time}`);

        const hours = +match[1],
            minutes = +match[2];
        if (hours > 24 || minutes > 59 || (hours === 24 && minutes))
            throw new RangeError(`Invalid calendar time: ${time}`);

        return hours * 60 + minutes;
    }

    static hourDiff(start: string, end: string) {
        return (this.minutes(end) - this.minutes(start)) / 60;
    }

    readonly days: Date[];
    readonly rows: TimeSlot[][];

    constructor({
        date = new Date(),
        weekStartsOn = 1,
        startTime = '00:00',
        endTime = '24:00',
        hourInterval = 2
    }: WeekCalendarOptions = {}) {
        if (!Number.isFinite(+date))
            throw new RangeError('Invalid calendar date');
        if (
            !Number.isInteger(weekStartsOn) ||
            weekStartsOn < 0 ||
            weekStartsOn > 6
        )
            throw new RangeError('weekStartsOn must be an integer from 0 to 6');
        if (
            !Number.isFinite(hourInterval) ||
            hourInterval <= 0 ||
            !Number.isInteger(hourInterval * 60)
        )
            throw new RangeError(
                'hourInterval must be a positive whole number of minutes'
            );

        const start = WeekCalendarModel.minutes(startTime),
            end = WeekCalendarModel.minutes(endTime),
            step = hourInterval * 60;
        if (start >= end)
            throw new RangeError('endTime must be after startTime');

        const first = new Date(date);
        first.setHours(0, 0, 0, 0);
        first.setDate(
            first.getDate() - ((first.getDay() - weekStartsOn + 7) % 7)
        );
        this.days = Array.from({ length: 7 }, (_, index) => {
            const day = new Date(first);
            day.setDate(day.getDate() + index);
            return day;
        });
        this.rows = Array.from(
            { length: Math.ceil((end - start) / step) },
            (_, index) =>
                this.days.map(day => {
                    const from = new Date(day),
                        to = new Date(day);
                    from.setMinutes(start + index * step);
                    to.setMinutes(Math.min(start + (index + 1) * step, end));
                    return { start: from, end: to };
                })
        );
    }

    static createHourList(
        startTime = '00:00',
        endTime = '24:00',
        hourInterval = 2
    ) {
        return new this({ startTime, endTime, hourInterval }).rows.map(
            row => row[0].start
        );
    }
}
