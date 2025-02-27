import MoviesPage from "@/components/templates/moviesPage";
import { Suspense } from "react";

export default function Movies() { 

    const loadingAnimation = (
        <div className="w-screen h-screen fixed top-0 left-0 bg-richblack flex items-center justify-center">
          <span className="loading loading-spinner loading-lg bg-white/80"></span>
        </div>
    );

    return (
        <Suspense fallback={loadingAnimation}>
            <MoviesPage/>
        </Suspense>
    );
};