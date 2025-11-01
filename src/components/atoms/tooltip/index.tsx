import { ReactNode } from "react";
type ComponentProps = {children: ReactNode, msg: string};
import './styles.css';

export const Tooltip = (props: ComponentProps) => {
    const { children, msg } = props;
    return <div className="custom-tooltip" tooltip-msg={msg}>{children}</div>
};