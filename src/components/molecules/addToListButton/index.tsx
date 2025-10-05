import { ComponentPropsWithRef, memo } from "react";
import { FiBookmark } from "react-icons/fi";

const AddToListButton = memo(( props: ComponentPropsWithRef<'button'> ) => {
    const { className, ...rest } = props;
    return (
        <button
            {...rest}
            className={`pointer-events-auto outline-none w-[clamp(2.5rem,4.7vw,3rem)] aspect-square rounded-md border-2 border-primary/70 text-primary/70 active:scale-95 lg:hover:border-primary lg:hover:text-primary transition-all duration-200 flex items-center justify-center cursor-pointer ${className}`}>
            <FiBookmark className="w-5 h-5 lg:w-6 lg:h-6"/>
        </button>
    );
});

AddToListButton.displayName = 'AddToListButton';
export default AddToListButton;