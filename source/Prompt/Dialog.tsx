import { Defer } from 'iterable-observer';
import { observable } from 'mobx';
import { FC, observer } from 'web-cell';

export class DialogClose extends Error {
    constructor(message = 'Dialog closed') {
        super(message);
    }
}

export interface DialogProps<T = any> {
    defer?: Defer<T>;
}

export class Dialog<T = any> {
    @observable
    accessor defer: Defer<T> | undefined;

    Component: FC;

    constructor(Factory: FC<DialogProps<T>>) {
        this.Component = observer(() => <Factory defer={this.defer} />);
    }

    open() {
        this.defer = new Defer();

        this.defer.promise.finally(() => (this.defer = undefined));

        return this.defer.promise;
    }
}
