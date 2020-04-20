import 'web-cell/source/utility/polyfill';
import { assertLooksLike } from 'snabbdom-looks-like';
import { createCell } from 'web-cell';

// @ts-ignore
self.navigator.share = () => {};

import { ShareBar } from '../../source/Extra/ShareBar';
import style from '../../source/Extra/ShareBar/index.less';

import { BGIcon } from '../../source/Reminder/Icon';

describe('Share Bar', () => {
    it('should render Vendor Icons', () => {
        document.title = 'Test';

        assertLooksLike(
            <ShareBar
                targets={['Qzone', 'Weixin', 'Twitter']}
                URL="https://web-cell.dev/WebCell/"
            />,
            <aside className="d-inline-flex flex-row">
                <a
                    target="_blank"
                    href="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=https%3A%2F%2Fweb-cell.dev%2FWebCell%2F&amp;title=Test&amp;desc=&amp;summary=&amp;site=https%3A%2F%2Fweb-cell.dev&amp;pics="
                    className={style.box}
                    style={{}}
                >
                    <span
                        className={style.icon}
                        style={{ background: 'orange' }}
                    >
                        Z
                    </span>
                </a>
                <a
                    target="_blank"
                    className={style.box}
                    style={{ color: 'green' }}
                >
                    <BGIcon type="circle" group="brands" name="weixin" />
                    <img />
                </a>
                <a
                    target="_blank"
                    href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fweb-cell.dev%2FWebCell%2F&amp;text=Test&amp;via=https%3A%2F%2Fweb-cell.dev"
                    className={style.box}
                    style={{ color: 'deepskyblue' }}
                >
                    <BGIcon type="circle" group="brands" name="twitter" />
                </a>
                <button className={style.box}>
                    <BGIcon type="circle" name="ellipsis-h" color="secondary" />
                </button>
            </aside>
        );
    });
});
