export const SectionTitle = ({children}:{children: string}) => {
    return (
        <h2 className='text-[19px] leading-6 font-black font-raleway md:text-[22px] md:leading-7 tracking-wide text-secondary justify-between md:justify-start gap-x-[10px] text-center sm:text-left cursor-pointer transition-colors duration-300 w-full sm:w-fit '>{children}</h2>
    );
};