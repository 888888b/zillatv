import { ComponentPropsWithRef } from "react";

const Logo = (props: ComponentPropsWithRef<'img'>) => {
    return (<img {...props}/>);
};
export default Logo;
