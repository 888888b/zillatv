import SearchPage from "@/components/templates/searchPage"

type SearchProps = { keyword: string | undefined }

export default async function Search({ searchParams }:{ searchParams: Promise<SearchProps> }) {
    const { keyword } = await searchParams;

    return (
        <SearchPage keyword={keyword}/>
    );
};