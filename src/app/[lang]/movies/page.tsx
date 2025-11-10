import MoviesPage from "@/components/templates/moviesPage";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    return <MoviesPage lang={lang} />
}