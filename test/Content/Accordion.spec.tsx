import { assertLooksLike } from '@tech_query/snabbdom-looks-like';
import { createCell } from 'web-cell';

import {
    AccordionBody,
    AccordionHeader,
    AccordionItem
} from '../../source/Content/Accordion';

describe('Accordion', () => {
    it('should render native details markup', () => {
        assertLooksLike(
            <AccordionItem open>
                <AccordionHeader>Test</AccordionHeader>
                <AccordionBody>Content</AccordionBody>
            </AccordionItem>,
            <details className="accordion-item " open>
                <summary className="accordion-header ">
                    Test
                    <i
                        className="bi-chevron-down accordion-icon"
                        aria-hidden="true"
                    />
                </summary>
                <div className="accordion-body ">Content</div>
            </details>
        );
    });
});
