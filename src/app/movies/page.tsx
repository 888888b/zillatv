import MoviesPage from "@/components/templates/moviesPage";
import { SuspenseLoading } from "@/components/molecules/suspenseLoading";

import { Suspense } from "react";

export default function Movies() { 
    return (
        <Suspense fallback={<SuspenseLoading/>}>
            <MoviesPage/>
        </Suspense>
    );
};