import { assertLooksLike } from '@tech_query/snabbdom-looks-like';
import { createCell, Fragment } from 'web-cell';

import { CarouselView, CarouselItem } from '../../source/Media/Carousel';

const { render } = CarouselView.prototype;

describe('Carousel View', () => {
    it('should render Image & Caption list', () => {
        assertLooksLike(
            render.call(
                { UID: 'test' },
                {
                    controls: true,
                    indicators: true,
                    activeIndex: 0,
                    defaultSlot: (
                        <Fragment>
                            <CarouselItem
                                image="test.png"
                                title="Test"
                                detail="test"
                            />
                            <CarouselItem>
                                <h3>Example</h3>
                            </CarouselItem>
                        </Fragment>
                    )
                }
            ),
            <div className="carousel slide" id="test">
                <ol className="carousel-indicators">
                    <li className="active" data-index="0" />
                    <li data-index="1" />
                </ol>

                <div className="carousel-inner">
                    <section className="carousel-item">
                        <img
                            className="d-block w-100"
                            src="test.png"
                            alt="Test"
                        />
                        <div
                            className="carousel-caption d-none d-md-block"
                            style={{ textShadow: '1px 2px 3px black' }}
                        >
                            <h5>Test</h5>
                            <p>test</p>
                        </div>
                    </section>

                    <section className="carousel-item">
                        <h3>Example</h3>
                    </section>
                </div>

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
