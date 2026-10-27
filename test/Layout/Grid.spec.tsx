import { describe, it } from 'node:test';

import { Col, Container, Row } from '../../source/Layout/Grid';
import { assertLooksLike } from 'dom-renderer/assert';

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
            <div className="2xl:col-6" />
        );
    });

    it('should retain every responsive size and stack sized columns below their first breakpoint', () => {
        assertLooksLike(
            <Row xs={1} sm={2} md={3} lg={4} xl={5} {...{ '2xl': 6 }} />,
            <div className="row row-cols-1 sm:row-cols-2 md:row-cols-3 lg:row-cols-4 xl:row-cols-5 2xl:row-cols-6" />
        );
        assertLooksLike(
            <Col xs={12} sm={10} md={8} lg={6} xl={4} {...{ '2xl': 2 }} />,
            <div className="col-12 sm:col-10 md:col-8 lg:col-6 xl:col-4 2xl:col-2" />
        );
        assertLooksLike(
            <Col md={6} lg="auto" />,
            <div className="md:col-6 lg:col-auto" />
        );
        assertLooksLike(<Col />, <div className="col" />);
    });
});
