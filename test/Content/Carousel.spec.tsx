import '../DOM-polyfill';
import { assertLooksLike } from 'snabbdom-looks-like';
import { createCell } from 'web-cell';

import { CarouselView } from '../../source/Content/Carousel';

describe('Carousel View', () => {
    it('should render Image & Caption list', () => {
        assertLooksLike(
            CarouselView.prototype.render.call(
                { UID: 'test' },
                {
                    activeIndex: 0,
                    list: [
                        {
                            image: 'test.png',
                            title: 'Test',
                            detail: 'test'
                        },
                        {
                            image: 'example.png',
                            title: 'Example'
                        }
                    ]
                }
            ),
            <div className="carousel slide" id="test">
                <ol className="carousel-indicators">
                    <li className="active" data-index="0"></li>
                    <li data-index="1"></li>
                </ol>

                <div className="carousel-inner">
                    <section className="carousel-item">
                        <img
                            className="d-block w-100"
                            src="test.png"
                            alt="Test"
                        />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Test</h5>
                            <p>test</p>
                        </div>
                    </section>

                    <section className="carousel-item">
                        <img
                            className="d-block w-100"
                            src="example.png"
                            alt="Example"
                        />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Example</h5>
                        </div>
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
                    ></span>
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
                    ></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        );
    });
});
