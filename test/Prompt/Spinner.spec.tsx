import 'web-cell/source/utility/polyfill';
import { createCell } from 'web-cell';
import { assertLooksLike } from 'snabbdom-looks-like';

import { Spinner, SpinnerBox } from '../../source/Prompt/Spinner';
import { Button } from '../../source/Form/Button';
import style from '../../source/Prompt/Spinner.less';

describe('Spinner', () => {
    it('should render a single Border Spinner by default', () => {
        assertLooksLike(
            <Spinner />,
            <div className="spinner-border" role="status" aria-hidden="false">
                <span className="sr-only">Loading...</span>
            </div>
        );
    });

    it('should render an Embeded Spinner', () => {
        assertLooksLike(
            <Button disabled>
                <Spinner embed>Pending...</Spinner>
            </Button>,
            <button className="btn btn-primary" type="button" disabled>
                <div
                    className="spinner-border"
                    role="status"
                    aria-hidden="true"
                />
                Pending...
            </button>
        );
    });

    it('should render Slots & Cover', () => {
        assertLooksLike(
            <SpinnerBox className="test" cover>
                test
            </SpinnerBox>,
            <div className={`${style['spinner-box']} test`}>
                test
                <div className={`${style['spinner-cover']} ${style['active']}`}>
                    <Spinner />
                </div>
            </div>
        );
    });
});
