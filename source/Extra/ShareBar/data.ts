import { encodeQRC } from '../../utility/QRCode';

export interface ContentMeta {
    URL: string;
    title?: string;
    description?: string;
    summary?: string;
    source?: string;
    image?: string;
    appKey?: string;
}

export const URI_map = {
    Qzone: {
        color: 'orange',
        icon: 'Z',
        getURI: ({
            URL,
            title = '',
            description = '',
            summary = '',
            source = '',
            image = ''
        }: ContentMeta) =>
            'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?' +
            new URLSearchParams({
                url: URL,
                title,
                desc: description,
                summary,
                site: source,
                pics: image
            })
    },
    QQ: {
        color: 'deepskyblue',
        getURI: ({
            URL,
            title = '',
            description = '',
            summary = '',
            source = '',
            image = ''
        }: ContentMeta) =>
            'http://connect.qq.com/widget/shareqq/index.html?' +
            new URLSearchParams({
                url: URL,
                title,
                source,
                desc: description,
                pics: image,
                summary
            })
    },
    Weixin: {
        color: 'green',
        getURI: ({ URL }: ContentMeta) => encodeQRC(URL)
    },
    Weibo: {
        color: 'red',
        getURI: ({ URL, title = '', image = '', appKey = '' }: ContentMeta) =>
            'https://service.weibo.com/share/share.php?' +
            new URLSearchParams({
                url: URL,
                title,
                pic: image,
                appkey: appKey
            })
    },
    Douban: {
        color: 'green',
        icon: '豆',
        getURI: ({
            URL,
            title = '',
            description = '',
            image = ''
        }: ContentMeta) =>
            'http://shuo.douban.com/!service/share?' +
            new URLSearchParams({
                href: URL,
                name: title,
                text: description,
                image,
                starid: '0',
                aid: '0',
                style: '11'
            })
    },
    Linkedin: {
        color: 'dodgerblue',
        getURI: ({ URL, title = '', summary = '', source = '' }: ContentMeta) =>
            'http://www.linkedin.com/shareArticle?' +
            new URLSearchParams({
                url: URL,
                title,
                summary,
                source,
                mini: 'true',
                ro: 'true',
                armin: 'armin'
            })
    },
    Facebook: {
        color: 'blue',
        getURI: ({ URL }: ContentMeta) =>
            'https://www.facebook.com/sharer/sharer.php?u=' + URL
    },
    Twitter: {
        color: 'deepskyblue',
        getURI: ({ URL, title = '', source = '' }: ContentMeta) =>
            'https://twitter.com/intent/tweet?' +
            new URLSearchParams({
                url: URL,
                text: title,
                via: source
            })
    },
    Google: {
        color: 'red',
        getURI: ({ URL }: ContentMeta) =>
            'https://plus.google.com/share?url=' + URL
    }
};

export type VendorName = keyof typeof URI_map;
