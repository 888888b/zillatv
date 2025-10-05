import { ComponentPropsWithRef, memo } from "react";

const Logo = memo((props: ComponentPropsWithRef<'img'>) => {
    const { className, ...rest } = props;
    return (
        <img {...rest} className={`${className}`} />
    );
});
Logo.displayName = 'HeroSlideLogo';
export default Logo;
