import classNames from 'classnames';
import { observable } from 'mobx';
import { attribute, component, observer, reaction, WebCell } from 'web-cell';

import { Modal, ModalBody, Spinner } from '../Prompt';
import { Image, ImageProps } from './Image';

export interface ImagePreview extends WebCell<ImageProps> {}

@component({ tagName: 'image-preview' })
@observer
export class ImagePreview extends HTMLElement implements WebCell<ImageProps> {
    @attribute
    @observable
    accessor src = '';

    @attribute
    @observable
    accessor loading: ImageProps['loading'] = 'lazy';

    @attribute
    @observable
    accessor fluid = false;

    @attribute
    @observable
    accessor rounded = false;

    @attribute
    @observable
    accessor roundedCircle = false;

    @attribute
    @observable
    accessor thumbnail = false;

    @observable
    accessor downloading = false;

    @observable
    accessor loadedPath = '';

    @observable
    accessor viewing = false;

    @reaction(({ src }) => src)
    connectedCallback() {
        const { src } = this;

        this.loadedPath = '';

        if (src) this.load(src);
    }

    async load(path: string) {
        this.downloading = true;

        await new Promise((resolve, reject) => {
            const image = new globalThis.Image();

            image.onload = resolve;
            image.onerror = reject;

            image.src = path;
        });

        this.loadedPath = path;
        this.downloading = false;
    }

    render() {
        const { downloading, loadedPath, viewing } = this,
            { loading, fluid, rounded, roundedCircle, thumbnail } = this;
        const props = { loading, fluid, rounded, roundedCircle, thumbnail };

        return (
            <figure
                className={classNames(
                    'm-0',
                    downloading &&
                        'd-flex justify-content-center align-items-center'
                )}
            >
                {downloading ? (
                    <Spinner />
                ) : (
                    loadedPath && (
                        <Image
                            className="w-100 h-100 object-fit-contain"
                            {...props}
                            src={loadedPath}
                            onClick={() => (this.viewing = true)}
                        />
                    )
                )}
                <Modal
                    centered
                    show={viewing}
                    onHide={() => (this.viewing = false)}
                >
                    <ModalBody>
                        <Image fluid src={loadedPath} />
                    </ModalBody>
                </Modal>
            </figure>
        );
    }
}
