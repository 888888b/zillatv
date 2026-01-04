// hooks
import useTmdbFetch from '@/hooks/tmdb';
// componentes
import { ScrollToTop } from '@/utils/globalActions/scrollToTop';
import { StopLoading } from '@/components/atoms/stopLoading';
import MediaSectionWrapper from './mediaSectionWrapper';
// tipos
import { TmdbMediaProps } from '@/app/[lang]/types';
// funções utilitarias
import { checkAvailability } from '@/utils/tmdb/checkAvailability';
import { formatLangCode } from '@/utils/i18n';
// estilos
import './styles.css';
// tipos
import { FetchReturn } from '@/hooks/tmdb/types';
type SearchPageProps = {
    keyword: string | undefined,
    lang: string
};

export default async function SearchPage(props: SearchPageProps) {
    const {keyword, lang} = props;
    const mediaData: FetchReturn = { pages: 1, results: [] };
    const langCode = formatLangCode(lang);
    const {
        fetchReleasedMovies,
        fetchMultiTypes
    } = useTmdbFetch();
    const safeCheck = async (data: any) => await checkAvailability(data ?? []) ?? [];

    if (keyword) {
        const media = await fetchMultiTypes(keyword, lang);
        const checked = await safeCheck(media?.results);
        mediaData.pages = media?.pages ?? 1;
        mediaData.results.push(...checked);
    } else {
        const movies = await fetchReleasedMovies(lang);
        const checked = await safeCheck(movies?.results);
        const withMediaType = checked.map(movie => ({...movie, media_type: 'movie'}));
        mediaData.pages = movies?.pages ?? 1;
        mediaData.results.push(...withMediaType);
    };

    return mediaData ? (
        <>
            <section className='search-page-container page-max-width page-padding'>
                <div className='overlay' />
                <div className='z-2 mt-[clamp(6rem,9vw,7.5rem)] flex flex-col items-start gap-y-5'>
                    <MediaSectionWrapper
                        serverData={mediaData}
                        lang={langCode}
                        keyword={keyword}
                    />
                </div>
            </section>
            {/* força rolagem para o topo da pagina apos o carregamento */}
            <ScrollToTop/>
            {/* fecha o loading da pagina apos o carregamento */}
            <StopLoading/>
        </>
    ) : null;
};