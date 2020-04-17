import '../polyfill';
import { assertLooksLike } from 'snabbdom-looks-like';
import { createCell } from 'web-cell';

// @ts-ignore
self.navigator.share = () => {};

import { ShareBar } from '../../source/Extra/ShareBar';
import style from '../../source/Extra/ShareBar/index.less';

describe('Share Bar', () => {
    it('should render Vendor Icons', () => {
        self.location.href = 'https://web-cell.dev/WebCell/';

        document.title = 'Test';

        assertLooksLike(
            <ShareBar targets={['Qzone', 'Weixin', 'Twitter']} />,
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
                    <span className="fa-stack">
                        <span
                            aria-hidden="true"
                            className="fas fa-circle fa-stack-2x"
                        />
                        <span
                            aria-hidden="true"
                            className="fab fa-weixin fa-inverse fa-stack-1x"
                        />
                    </span>
                    <img />
                </a>
                <a
                    target="_blank"
                    href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fweb-cell.dev%2FWebCell%2F&amp;text=Test&amp;via=https%3A%2F%2Fweb-cell.dev"
                    className={style.box}
                    style={{ color: 'deepskyblue' }}
                >
                    <span className="fa-stack">
                        <span
                            aria-hidden="true"
                            className="fas fa-circle fa-stack-2x"
                        />
                        <span
                            aria-hidden="true"
                            className="fab fa-twitter fa-inverse fa-stack-1x"
                        />
                    </span>
                </a>
                <button className={style.box}>
                    <span className="fa-stack text-secondary">
                        <span
                            aria-hidden="true"
                            className="fas fa-circle fa-stack-2x"
                        />
                        <span
                            aria-hidden="true"
                            className="fas fa-ellipsis-h fa-inverse fa-stack-1x"
                        />
                    </span>
                </button>
            </aside>
        );
    });
});
