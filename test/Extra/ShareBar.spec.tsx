import '../polyfill';
import { assertLooksLike } from 'snabbdom-looks-like';
import { createCell } from 'web-cell';

import { ShareBar } from '../../source/Extra/ShareBar';
import style from '../../source/Extra/ShareBar/index.less';

describe('Share Bar', () => {
    it('should render Vendor Icons', () => {
        assertLooksLike(
            <ShareBar
                targets={['Qzone', 'Weixin', 'Google']}
                URL="https://web-cell.dev/"
            />,
            <aside className="d-inline-flex flex-row">
                <a
                    target="_blank"
                    href="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=https%3A%2F%2Fweb-cell.dev%2F&amp;title=&amp;desc=&amp;summary=&amp;site=&amp;pics="
                    className={style.box}
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
                    href="https://plus.google.com/share?url=https://web-cell.dev/"
                    className={style.box}
                    style={{ color: 'red' }}
                >
                    <span className="fa-stack">
                        <span
                            aria-hidden="true"
                            className="fas fa-circle fa-stack-2x"
                        />
                        <span
                            aria-hidden="true"
                            className="fab fa-google fa-inverse fa-stack-1x"
                        />
                    </span>
                </a>
            </aside>
        );
    });
});
