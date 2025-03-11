import PlayerPage from "@/components/templates/playerPage";
import { Suspense } from "react";

type ComponentProps = {
    id: string;
    type: string;
};

export default async function Player({ params }: { params: Promise<ComponentProps> }) {
    const { id, type } = await params;

    const loadingAnimation = (
        <div className="w-screen h-screen fixed top-0 left-0 bg-richblack flex items-center justify-center">
          <span className="loading loading-spinner loading-lg bg-white/80"></span>
        </div>
    );

    return (
        <Suspense fallback={loadingAnimation}>
            <PlayerPage contentId={ id } contentType={ type } />
        </Suspense>
    );
};