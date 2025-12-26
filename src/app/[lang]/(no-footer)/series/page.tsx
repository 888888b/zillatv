import SeriesPage from "@/components/templates/seriesPage";

export default async function Series({params}:{params: Promise<{lang: string}>}) {
    const {lang} = await params;
    return <SeriesPage lang={lang}/>
};