type ComponentProps = {
    stroke?: number;
    className?: string;
};

export const CloseIcon = ( props: ComponentProps ) => {
    const { stroke, className } = props;

    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="Close-Small--Streamline-Rounded-Material" className={className} stroke="currentColor">
            <desc>
                Close Small Streamline Icon: https://streamlinehq.com
            </desc>
            <path fill="#000000" d="m12 13.0499 -3.975 3.975c-0.15 0.15 -0.325 0.225 -0.525 0.225s-0.375 -0.075 -0.525 -0.225c-0.15 -0.15 -0.225 -0.325 -0.225 -0.525s0.075 -0.375 0.225 -0.525l3.975 -3.975 -3.975 -3.95c-0.15 -0.15 -0.225 -0.325 -0.225 -0.525s0.075 -0.375 0.225 -0.525c0.15 -0.15 0.325 -0.225 0.525 -0.225s0.375 0.075 0.525 0.225l3.975 3.975 3.95 -3.975c0.13335 -0.15 0.30415 -0.225 0.5125 -0.225 0.20835 0 0.3875 0.075 0.5375 0.225 0.15 0.15 0.225 0.325 0.225 0.525s-0.075 0.375 -0.225 0.525l-3.975 3.95 3.975 3.975c0.15 0.15 0.225 0.325 0.225 0.525s-0.075 0.375 -0.225 0.525c-0.15 0.15 -0.325 0.225 -0.525 0.225s-0.375 -0.075 -0.525 -0.225l-3.95 -3.975Z" strokeWidth={stroke}></path>
        </svg>
    )
};