import 'web-cell/source/utility/polyfill';
import { createCell } from 'web-cell';
import { assertLooksLike } from 'snabbdom-looks-like';

import { FileInput } from '../../source/Form/FileInput';
import style from '../source/Form/FileInput.less';

const render = FileInput.prototype.render.bind({ onChange: () => {} });

describe('File Input', () => {
    it('should render File input while the value is empty', () => {
        assertLooksLike(
            render({ name: 'file', required: true }),
            <div className={style.fileBox}>
                <input type="file" name="file" required={true} />
            </div>
        );
    });

    it('should render Preview Image after File selected', () => {
        const value = 'blob:https://test.net/example';

        assertLooksLike(
            render({ name: 'file', required: true, value }),
            <div
                className={`${style.fileBox} ${style.active}`}
                style={{ backgroundImage: `url(${value})` }}
            >
                <input type="file" name="file" required={false} />
            </div>
        );
    });

    it('should render Hidden Input & Preview Image while Value passed in', () => {
        const value = 'https://test.net/example.png';

        assertLooksLike(
            render({ name: 'file', required: true, value }),
            <div
                className={`${style.fileBox} ${style.active}`}
                style={{ backgroundImage: `url(${value})` }}
            >
                <input type="hidden" name="file" />
            </div>
        );
    });
});
