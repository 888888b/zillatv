import SearchPage from "@/components/templates/searchPage"
type SearchProps = { keyword: string | undefined, lang: string };

export default async function Search({ searchParams }:{ searchParams: Promise<SearchProps> }) {
    const { keyword, lang } = await searchParams;
    return <SearchPage keyword={keyword} lang={lang}/>
};