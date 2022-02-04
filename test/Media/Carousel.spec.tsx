import { assertLooksLike } from '@tech_query/snabbdom-looks-like';
import { WebCellElement, createCell, Fragment } from 'web-cell';
import {
    CarouselCaption,
    CarouselItem,
    CarouselView
} from '../../source/Media/Carousel';

const { render } = CarouselView.prototype;

describe('Carousel View', () => {
    var items_input: WebCellElement, items_output: WebCellElement;

    it('should render variants of Carousel Items', () => {
        items_input = (
            <>
                <CarouselItem image="test.png" title="Test" detail="test" />
                <CarouselItem>
                    <img src="test.png" />
                    <CarouselCaption title="Test" detail="test" />
                </CarouselItem>
                <CarouselItem>
                    <img src="test.png" />
                    <CarouselCaption>
                        <h3>Example</h3>
                    </CarouselCaption>
                </CarouselItem>
                <CarouselItem>
                    <img src="test.png" />
                    <h3>Example</h3>
                </CarouselItem>
            </>
        );

        items_output = (
            <>
                <section className="carousel-item">
                    <img className="d-block w-100" src="test.png" alt="Test" />
                    <div
                        className="carousel-caption d-none d-md-block"
                        style={{ textShadow: '1px 2px 3px black' }}
                    >
                        <h5>Test</h5>
                        <p>test</p>
                    </div>
                </section>
                <section className="carousel-item">
                    <img src="test.png" />
                    <div
                        className="carousel-caption d-none d-md-block"
                        style={{ textShadow: '1px 2px 3px black' }}
                    >
                        <h5>Test</h5>
                        <p>test</p>
                    </div>
                </section>
                <section className="carousel-item">
                    <img src="test.png" />
                    <div
                        className="carousel-caption d-none d-md-block"
                        style={{ textShadow: '1px 2px 3px black' }}
                    >
                        <h3>Example</h3>
                    </div>
                </section>
                <section className="carousel-item">
                    <img src="test.png" />
                    <h3>Example</h3>
                </section>
            </>
        );

        assertLooksLike(<div>{items_input}</div>, <div>{items_output}</div>);
    });

    it('should render Image & Caption list', () => {
        assertLooksLike(
            render.call(
                { UID: 'test' },
                {
                    controls: true,
                    indicators: true,
                    activeIndex: 0,
                    defaultSlot: items_input
                }
            ),
            <div className="carousel slide" id="test">
                <ol className="carousel-indicators">
                    <li className="active" data-index="0" />
                    <li data-index="1" />
                </ol>

                <div className="carousel-inner">{items_output}</div>

                <a
                    className="carousel-control-prev"
                    href="#test"
                    role="button"
                    data-index="-1"
                >
                    <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                    />
                    <span className="sr-only">Previous</span>
                </a>

                <a
                    className="carousel-control-next"
                    href="#test"
                    role="button"
                    data-index="1"
                >
                    <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                    />
                    <span className="sr-only">Next</span>
                </a>
            </div>
        );
    });
});
