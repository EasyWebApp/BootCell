import 'core-js/es/object';
import 'core-js/es/array';
import { Window } from 'happy-dom';

const window = new Window();

for (const key of [
    'self',
    'document',
    'HTMLElement',
    'HTMLUnknownElement',
    'customElements'
]) {
    // @ts-ignore
    global[key] = window[key];
}
