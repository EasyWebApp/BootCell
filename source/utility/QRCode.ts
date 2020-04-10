import { Encoder } from '@nuintun/qrcode';

export function encodeQRC(raw: string) {
    return new Encoder().write(raw).make().toDataURL();
}
