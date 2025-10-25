import { ComponentPropsWithRef } from "react";

const Logo = (props: ComponentPropsWithRef<'img'>) => {
    const { className, ...rest } = props;
    return (
        <img {...rest} className={`${className}`} />
    );
};
export default Logo;
