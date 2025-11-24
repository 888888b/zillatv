import {memo} from 'react';
type Props = React.ComponentPropsWithoutRef<'img'>;

function ResponsiveImage({className,...rest}: Props) {
    return (
        <img
            {...rest}
            className={`w-screen aspect-video object-cover ${className}`}
            loading="lazy"
            decoding='async'
        />
    );
};
const memorized = memo(ResponsiveImage);
memorized.displayName = 'hero-slide-image';
export default memorized;