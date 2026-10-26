import { expect } from 'expect';
import { describe, it } from 'node:test';
import { fn } from 'jest-mock';

import { ShareBar } from '../../source/Navigator/ShareBar';
import { ShareModel, ShareTargets } from '../../source/Navigator/ShareModel';
import { render } from '../render';

describe('ShareBar', () => {
    it('encodes all link targets using HTTPS and supplied metadata', () => {
        const model = new ShareModel({
            url: 'https://example.com/?x=a&y=b',
            title: 'A & B'
        });
        for (const target of ShareTargets) {
            if (target === 'Weixin') continue;
            const uri = new URL(model.getURI(target));
            expect(uri.protocol).toBe('https:');
            expect([...uri.searchParams.values()]).toContain(
                'https://example.com/?x=a&y=b'
            );
        }
        expect(new URL(model.getURI('Twitter')).searchParams.get('text')).toBe(
            'A & B'
        );
        expect(() =>
            new ShareModel({ url: 'javascript:alert(1)' }).getURI('QQ')
        ).toThrow(TypeError);
    });

    it('generates QR images locally and clears pending results on dismissal', async () => {
        const model = new ShareModel({ url: 'https://example.com/' });
        await model.showQRCode();
        expect(decodeURIComponent(model.qrCode)).toContain('<svg');
        const pending = model.showQRCode();
        model.closeQRCode();
        await pending;
        expect(model.qrCode).toBeUndefined();
    });

    it('renders accessible vendor links with safe external navigation', () => {
        const bar = new ShareBar();
        bar.url = 'https://example.com/';
        const root = render(bar.renderContent());
        expect(root.querySelectorAll('a')).toHaveLength(6);
        expect(root.querySelector('[aria-label="Weixin"]')).not.toBeNull();
        for (const link of root.querySelectorAll('a'))
            expect(link.rel).toBe('noopener noreferrer');
    });

    it('delegates native sharing and surfaces rejected requests', async () => {
        const original = Object.getOwnPropertyDescriptor(navigator, 'share');
        const share =
            fn<(data: ShareData) => Promise<void>>().mockResolvedValue();
        Object.defineProperty(navigator, 'share', {
            configurable: true,
            value: share
        });
        try {
            const bar = new ShareBar();
            bar.url = 'https://example.com/';
            bar.title = 'Title';
            await bar.share();
            expect(share).toHaveBeenCalledWith({
                url: 'https://example.com/',
                title: 'Title',
                text: ''
            });
            const error = new Error('Share failed');
            share.mockRejectedValue(error);
            let reported: unknown;
            bar.addEventListener('error', (event: CustomEvent) => {
                reported = event.detail;
            });
            await bar.share();
            expect(reported).toBe(error);
            expect(bar.model.error).toBe(error);
        } finally {
            if (original) Object.defineProperty(navigator, 'share', original);
            else Reflect.deleteProperty(navigator, 'share');
        }
    });
});
