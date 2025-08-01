type ComponentProps = {
    size: number;
};

export const PlayIcon = (props: ComponentProps) => {
    const { size } = props;

    return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" id="Play--Streamline-Solar" height={size} width={size}>
            <desc>
                Play Streamline Icon: https://streamlinehq.com
            </desc>
            <path d="M21.4086 9.35258c2.1219 1.15392 2.1219 4.14092 0 5.29482L8.59662 21.6145C6.53435 22.736 4 21.2763 4 18.9671L4 5.0329c0 -2.30922 2.53435 -3.76888 4.59661 -2.64742l12.81199 6.9671Z" fill="currentColor" stroke-width="1"></path>
        </svg>
    )
};