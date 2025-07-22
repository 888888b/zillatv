import { Suspense } from "react";

import SearchPage from "@/components/templates/searchPage"
import { SuspenseLoading } from "@/components/molecules/suspenseLoading";

type SearchProps = { keyword: string | undefined }

export default async function Search({ searchParams }:{ searchParams: Promise<SearchProps> }) {
    const { keyword } = await searchParams;

    return (
        <Suspense fallback={<SuspenseLoading/>}>
            <SearchPage keyword={keyword}/>
        </Suspense>
    );
};