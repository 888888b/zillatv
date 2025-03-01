import SearchPage from "@/components/templates/searchPage"
import { Suspense } from "react";

type SearchProps = { keyword: string | undefined }

export default async function Search({ searchParams }:{ searchParams: Promise<SearchProps> }) {

    const { keyword } = await searchParams;
    const loadingAnimation = (
        <div className="w-screen h-screen fixed top-0 left-0 bg-richblack flex items-center justify-center">
          <span className="loading loading-spinner loading-lg bg-white/80"></span>
        </div>
    );

    return (
        <Suspense fallback={loadingAnimation}>
            <SearchPage keyword={keyword}/>
        </Suspense>
    );
};