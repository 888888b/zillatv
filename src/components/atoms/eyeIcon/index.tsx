type ComponentProps = {className?: string;};

export const EyeIcon = ( props: ComponentProps ) => {
    const {
        className
    } = props;

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke={'currentColor'} strokeLinecap="round" strokeLinejoin="round" id="Eye--Streamline-Lucide" className={className}>
            <desc>
                Eye Streamline Icon: https://streamlinehq.com
            </desc>
            <path d="M2 12s3 -7 10 -7 10 7 10 7 -3 7 -10 7 -10 -7 -10 -7Z"></path>
            <path d="M9 12a3 3 0 1 0 6 0 3 3 0 1 0 -6 0"></path>
        </svg>
    );
};