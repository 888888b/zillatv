import PlayerPage from "@/components/templates/playerPage";
import { SuspenseLoading } from "@/components/molecules/suspenseLoading";

import { Suspense } from "react";

type ComponentProps = {
    id: string;
    type: string;
};

export default async function Player({ params }: { params: Promise<ComponentProps> }) {
    const { id, type } = await params;

    return (
        <Suspense fallback={<SuspenseLoading/>}>
            <PlayerPage contentId={ id } contentType={ type } />
        </Suspense>
    );
};