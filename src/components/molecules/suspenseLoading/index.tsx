export const SuspenseLoading = () => {
    return (
        <div className="w-screen h-dvh fixed top-0 left-0 z-[999] bg-surface flex items-center justify-center">
            <span className="loading loading-dots loading-lg bg-secondary/80"></span>
        </div>
    );
};