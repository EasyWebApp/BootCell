import classNames from 'classnames';
import { FC, WebCellProps } from 'web-cell';

export interface RatioProps extends WebCellProps {
    aspectRatio?: number | '1x1' | '4x3' | '16x9' | '21x9';
}

export const Ratio: FC<RatioProps> = ({ aspectRatio = '1x1', children }) => (
    <div
        className={classNames(
            'ratio',
            typeof aspectRatio === 'string' && `ratio-${aspectRatio}`
        )}
        style={
            typeof aspectRatio === 'number'
                ? { '--bs-aspect-ratio': `${aspectRatio * 100}%` }
                : undefined
        }
    >
        {children}
    </div>
);
