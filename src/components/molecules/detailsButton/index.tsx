import { ComponentPropsWithRef, memo } from "react";
import { EyeIcon } from "@/components/atoms/eyeIcon";

const FurtherDetailsButton = memo(( props: ComponentPropsWithRef<'button'> ) => {
    const { className, ...rest } = props;

    return (
        <button
            {...rest}
            className={`pointer-events-auto outline-none border-none w-full max-w-[500px] h-12 rounded-[10px] uppercase bg-primary text-primary-content text-sm lg:text-base font-bold sm:w-48 lg:w-52 active:scale-95 transition-transform duration-200 flex items-center gap-x-3 justify-center cursor-pointer ${className}`}>
            <EyeIcon className="w-[23px] h-[23px] lg:w-[25px] lg:h-[25px] stroke-2 lg:stroke-[2.3]"/>
            Ver detalhes
        </button>
    );
});

FurtherDetailsButton.displayName = 'FurtherDetailsButton';
export default FurtherDetailsButton;