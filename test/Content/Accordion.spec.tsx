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
                    <svg
                        className="accordion-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <path d="m2 5 6 6 6-6" />
                    </svg>
                </summary>
                <div className="accordion-body ">Content</div>
            </details>
        );
    });
});
