type ComponentProps = {
    color?: string;
    stroke?: string;
    width?: number;
    height?: number;
}

export const ArrowRight = ( props: ComponentProps ) => {
    const {
        color,
        stroke,
        width,
        height
    } = props;

    const fill = !color ? 'currentColor' : 'none';

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill='none' stroke={color ?? 'currentColor'} strokeLinecap="round" strokeLinejoin="round" id="Chevron-Right--Streamline-Lucide" height={height} width={width}>
            <desc>
                Chevron Right Streamline Icon: https://streamlinehq.com
            </desc>
            <path d="m9 18 6 -6 -6 -6" strokeWidth={stroke}></path>
        </svg>
    );
}