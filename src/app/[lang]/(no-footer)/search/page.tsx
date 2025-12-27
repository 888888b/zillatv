import SearchPage from "@/components/templates/searchPage"
type Props = { 
    params: Promise<{lang: string}>, 
    searchParams: Promise<{keyword: string | undefined}>
};

export default async function Search(props: Props) {
    const [{lang}, {keyword}] = await Promise.all([props.params, props.searchParams]);
    return <SearchPage keyword={keyword} lang={lang}/>
};