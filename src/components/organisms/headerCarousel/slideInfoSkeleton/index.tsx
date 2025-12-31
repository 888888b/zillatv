export default function SlideInfoSkeleton() {
    return (
        // Skeleton do Slide Info Wrapper
        <div className="w-full page-padding flex flex-col gap-y-4 
        items-center z-10 absolute mx-auto bottom-10 sm:pointer-events-none sm:mt-0 sm:bottom-[calc(56vw*0.25)] 
        left-0 sm:items-start 2xl:left-1/2 2xl:-translate-x-1/2 page-padding">
            {/* Titulo | Logo */}
            <div className="skeleton w-[50vw] h-[clamp(60px,8vw,140px)] sm:w-[30vw] order-1"/>
            {/* Descrição */}
            <div className="w-full flex items-center gap-y-2 flex-col sm:hidden lg:flex lg:items-start lg:w-[40%] order-2">
                <div className="skeleton w-full h-[clamp(1rem,1.6vw,1.6rem)]"/>
                <div className="skeleton w-[70%] h-[clamp(1rem,1.6vw,1.5rem)]"/>
                <div className="skeleton w-[40%] h-[clamp(1rem,1.6vw,1.4rem)]"/>
            </div>
            {/* Botão ir para o player */}
            <div className="skeleton w-[clamp(9.5rem,12.5vw,12.5rem)] h-[clamp(2.5rem,4.7vw,3rem)] order-3"/>
            {/* Generos */}
            <div className="skeleton w-[200px] h-[clamp(0.75rem,1.3vw,1.3rem)] order-4 sm:order-2 lg:order-4"/>
        </div>
    );
};