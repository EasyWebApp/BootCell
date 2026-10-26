import { action, observable } from 'mobx';
import { toString } from 'qrcode';

export interface ContentMeta {
    url?: string;
    title?: string;
    description?: string;
    summary?: string;
    source?: string;
    image?: string;
    appKey?: string;
}

export const ShareTargets = [
    'Qzone',
    'QQ',
    'Weixin',
    'Weibo',
    'Douban',
    'Facebook',
    'Twitter'
] as const;
export type VendorName = (typeof ShareTargets)[number];

export class ShareModel {
    @observable accessor qrCode: string | undefined;
    @observable accessor error: Error | undefined;
    private request = 0;

    constructor(readonly meta: ContentMeta = {}) {}

    get data() {
        const url = new URL(this.meta.url || globalThis.location.href);
        if (!['http:', 'https:'].includes(url.protocol))
            throw new TypeError('Share URLs must use HTTP or HTTPS');
        const summary =
            this.meta.summary ??
            document.querySelector<HTMLMetaElement>('meta[name="description"]')
                ?.content ??
            '';
        return {
            url: url.href,
            title: this.meta.title ?? document.title,
            summary,
            source: this.meta.source ?? url.origin,
            description: this.meta.description ?? summary,
            image: this.meta.image ?? '',
            appKey: this.meta.appKey ?? ''
        };
    }

    getURI(target: Exclude<VendorName, 'Weixin'>) {
        const { url, title, summary, source, description, image, appKey } =
            this.data;
        let endpoint: string, parameters: Record<string, string>;
        switch (target) {
            case 'Qzone':
                endpoint =
                    'https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey';
                parameters = {
                    url,
                    title,
                    desc: description,
                    summary,
                    site: source,
                    pics: image
                };
                break;
            case 'QQ':
                endpoint = 'https://connect.qq.com/widget/shareqq/index.html';
                parameters = {
                    url,
                    title,
                    source,
                    desc: description,
                    pics: image,
                    summary
                };
                break;
            case 'Weibo':
                endpoint = 'https://service.weibo.com/share/share.php';
                parameters = { url, title, pic: image, appkey: appKey };
                break;
            case 'Douban':
                endpoint = 'https://shuo.douban.com/!service/share';
                parameters = {
                    href: url,
                    name: title,
                    text: description,
                    image,
                    starid: '0',
                    aid: '0',
                    style: '11'
                };
                break;
            case 'Facebook':
                endpoint = 'https://www.facebook.com/sharer/sharer.php';
                parameters = { u: url };
                break;
            case 'Twitter':
                endpoint = 'https://twitter.com/intent/tweet';
                parameters = { url, text: title, via: source };
                break;
            default:
                throw new RangeError(`Unsupported share target: ${target}`);
        }
        return `${endpoint}?${new URLSearchParams(parameters)}`;
    }

    async showQRCode() {
        this.clearError();
        const request = ++this.request;
        const svg = await toString(this.data.url, {
            type: 'svg',
            errorCorrectionLevel: 'M'
        });
        if (request === this.request)
            this.setQRCode(
                `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
            );
    }

    @action private setQRCode(value: string | undefined) {
        this.qrCode = value;
    }

    @action closeQRCode() {
        this.request++;
        this.qrCode = undefined;
    }

    @action reportError(error: unknown) {
        this.error = error instanceof Error ? error : new Error(String(error));
        return this.error;
    }

    @action private clearError() {
        this.error = undefined;
    }

    async share() {
        this.clearError();
        if (typeof navigator.share !== 'function')
            throw new Error('Web Share is not supported in this browser');
        const { url, title, summary } = this.data;
        await navigator.share({ url, title, text: summary });
    }
}
