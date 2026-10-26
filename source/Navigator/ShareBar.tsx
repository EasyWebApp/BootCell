import { observable } from 'mobx';
import { WebCell, attribute, component, observer } from 'web-cell';

import { BootstrapStyles } from '../BootstrapStyles';
import { Button, CloseButton } from '../Form/Button';
import { FABGIcon } from '../Reminder/FAIcon';
import {
    ContentMeta,
    ShareModel,
    ShareTargets,
    VendorName
} from './ShareModel';

export interface ShareBarProps extends ContentMeta {
    targets?: readonly VendorName[];
    direction?: 'row' | 'column';
    onError?: (event: CustomEvent<Error>) => void;
    onShare?: (event: CustomEvent) => void;
    onCancel?: (event: CustomEvent) => void;
}

export interface ShareBar extends WebCell<ShareBarProps> {}

@component({ tagName: 'share-bar', mode: 'open' })
@observer
export class ShareBar extends HTMLElement implements WebCell<ShareBarProps> {
    @attribute @observable accessor url: string;
    @attribute @observable accessor title: string;
    @attribute @observable accessor summary: string;
    @attribute @observable accessor description: string;
    @attribute @observable accessor source: string;
    @attribute @observable accessor image: string;
    @attribute @observable accessor appKey: string;
    @attribute @observable accessor direction: ShareBarProps['direction'] =
        'row';
    @observable accessor targets: readonly VendorName[] = ShareTargets;
    readonly model = new ShareModel(this);

    disconnectedCallback() {
        this.model.closeQRCode();
    }

    showQRCode = async () => {
        try {
            await this.model.showQRCode();
        } catch (error) {
            this.emit('error', this.model.reportError(error));
        }
    };

    share = async () => {
        try {
            await this.model.share();
            this.emit('share');
        } catch (error) {
            if (error instanceof DOMException && error.name === 'AbortError')
                this.emit('cancel');
            else this.emit('error', this.model.reportError(error));
        }
    };

    renderContent() {
        return (
            <aside
                ariaLabel="Share"
                className={`d-inline-flex gap-2 flex-${this.direction}`}
            >
                {this.targets.map(target =>
                    target === 'Weixin' ? (
                        <Button
                            type="button"
                            ariaLabel="Weixin"
                            onClick={this.showQRCode}
                        >
                            <FABGIcon
                                type="circle"
                                group="brands"
                                name="weixin"
                            />
                        </Button>
                    ) : (
                        <Button
                            href={this.model.getURI(target)}
                            target="_blank"
                            rel="noopener noreferrer"
                            ariaLabel={target}
                        >
                            {target === 'Qzone' || target === 'Douban' ? (
                                target
                            ) : (
                                <FABGIcon
                                    type="circle"
                                    group="brands"
                                    name={target.toLowerCase()}
                                />
                            )}
                        </Button>
                    )
                )}
                {typeof navigator.share === 'function' && (
                    <Button
                        type="button"
                        ariaLabel="More sharing options"
                        onClick={this.share}
                    >
                        <FABGIcon type="circle" name="ellipsis" />
                    </Button>
                )}
                {this.model.qrCode && (
                    <div
                        role="region"
                        ariaLabel="Weixin QR code"
                        className="border rounded p-2"
                    >
                        <CloseButton onClick={() => this.model.closeQRCode()} />
                        <img
                            src={this.model.qrCode}
                            alt="Scan to share this page"
                            width={200}
                            height={200}
                        />
                    </div>
                )}
                {this.model.error && (
                    <span role="alert">{this.model.error.message}</span>
                )}
            </aside>
        );
    }

    render() {
        return (
            <>
                <BootstrapStyles />
                {this.renderContent()}
            </>
        );
    }
}
