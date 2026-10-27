import { describe, it } from 'node:test';
import { assertLooksLike } from 'dom-renderer/assert';
import { FormCheck } from '../../source/Form/Form';

describe('FormCheck', () => {
    it('should render a Bootstrap 6 check control', () => {
        assertLooksLike(
            <FormCheck id="updates" type="checkbox" label="Get updates" />,
            <div className="form-field">
                <input className="check" type="checkbox" id="updates" />
                <label htmlFor="updates">Get updates</label>
            </div>
        );
    });

    it('should place a reversed switch after its label', () => {
        assertLooksLike(
            <FormCheck
                type="switch"
                id="updates"
                label="Get updates"
                reverse
            />,
            <div
                className="form-field"
                style={{ gridTemplateColumns: '1fr auto' }}
            >
                <div
                    className="switch"
                    style={{ gridColumn: '2', gridRow: '1' }}
                >
                    <input type="checkbox" role="switch" switch id="updates" />
                </div>
                <label
                    htmlFor="updates"
                    style={{ gridColumn: '1', gridRow: '1' }}
                >
                    Get updates
                </label>
            </div>
        );
    });
});
