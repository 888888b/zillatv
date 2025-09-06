import { ComponentPropsWithRef, memo } from "react";
import { IoIosAdd } from "react-icons/io";

const AddToList = memo(( props: ComponentPropsWithRef<'button'> ) => {
    const { className, ...rest } = props;

    return (
        <button
            {...rest}
            className={`outline-none w-10 aspect-square rounded-full border-2 border-primary text-secondary  active:scale-95 transition-all duration-200 flex items-center justify-center cursor-pointer opacity-70 md:hover:opacity-70 ${className}`}>
            <IoIosAdd className="text-3xl"/>
        </button>
    );
});

AddToList.displayName = 'AddToList';
export default AddToList;