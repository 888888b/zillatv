import SeriesPage from "@/components/templates/seriesPage";
import { SuspenseLoading } from "@/components/molecules/suspenseLoading";

import { Suspense } from "react";

export default function Series() {
    return (
        <Suspense fallback={<SuspenseLoading/>}>
            <SeriesPage />
        </Suspense>
    );
};