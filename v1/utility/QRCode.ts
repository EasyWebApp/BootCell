import { Encoder } from '@nuintun/qrcode';

export function encodeQRC(raw: string) {
    return `data:${new Encoder().write(raw).make().toDataURL()}`;
}
