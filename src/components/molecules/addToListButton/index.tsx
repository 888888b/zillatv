import { ComponentPropsWithRef, memo } from "react";
import { IoIosAdd } from "react-icons/io";

const AddToListButton = memo(( props: ComponentPropsWithRef<'button'> ) => {
    const { className, ...rest } = props;

    return (
        <button
            {...rest}
            className={`pointer-events-auto outline-none w-fit h-10 rounded-md box-border border border-primary text-secondary text-base font-bold px-6 active:scale-95 transition-all duration-200 flex items-center gap-x-1 justify-center cursor-pointer lg:h-12 ${className}`}>
            <IoIosAdd className="text-3xl"/>
            Salvar
        </button>
    );
});

AddToListButton.displayName = 'AddToListButton';
export default AddToListButton;