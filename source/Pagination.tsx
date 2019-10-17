import { createCell, component, mixin, watch, on } from 'web-cell';
import classNames from 'classnames';

@component({
    tagName: 'page-box',
    renderTarget: 'children'
})
export class Pagination extends mixin() {
    @watch
    current = 1;

    @watch
    total = 1;

    @on('click', '.page-link')
    onClick(event: MouseEvent) {
        event.preventDefault();

        const current = (event.target as HTMLElement).textContent.trim();

        switch (current) {
            case '<':
                this.current--;
                break;
            case '>':
                this.current++;
                break;
            default:
                this.current = parseInt(current);
        }

        this.emit('change', this.current, { bubbles: true, composed: true });
    }

    render() {
        const { current, total } = this;

        return (
            <ul className="pagination justify-content-center">
                <li
                    className={classNames(
                        'page-item',
                        current === 1 && 'disabled'
                    )}
                >
                    <a className="page-link" aria-disabled={current === 1}>
                        &lt;
                    </a>
                </li>
                {total < 2 ? null : (
                    <li className="page-item">
                        <a className="page-link">1</a>
                    </li>
                )}
                <li className="page-item active" aria-current="page">
                    <a className="page-link">
                        {current} <span className="sr-only">(current)</span>
                    </a>
                </li>
                {total < 3 ? null : (
                    <li className="page-item">
                        <a className="page-link">{total}</a>
                    </li>
                )}
                <li
                    className={classNames(
                        'page-item',
                        current === total && 'disabled'
                    )}
                >
                    <a className="page-link" aria-disabled={current === total}>
                        >
                    </a>
                </li>
            </ul>
        );
    }
}
