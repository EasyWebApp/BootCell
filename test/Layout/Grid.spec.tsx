import { describe, it } from 'node:test';

import { Col, Container, Row } from '../../source/Layout/Grid';
import { assertLooksLike } from '../render';

describe('Grid', () => {
    it('should use native container breakpoints', () => {
        assertLooksLike(<Container />, <div className="container" />);
        assertLooksLike(
            <Container fluid />,
            <div className="container-fluid" />
        );
        assertLooksLike(
            <Container fluid="2xl" />,
            <div className="2xl:container" />
        );
    });

    it('should use native row and column breakpoint props', () => {
        assertLooksLike(
            <Row {...{ '2xl': 3 }} />,
            <div className="row 2xl:row-cols-3" />
        );
        assertLooksLike(
            <Col {...{ '2xl': 6 }} />,
            <div className="col 2xl:col-6" />
        );
    });
});
