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
type SearchPageProps = {
    keyword: string | undefined,
    lang: string
};

export default async function SearchPage(props: SearchPageProps) {
    const {keyword, lang} = props;
    const mediaData: TmdbMediaProps[] = [];
    const langCode = formatLangCode(lang);
    const {
        fetchReleasedMovies,
        fetchMultiTypes
    } = useTmdbFetch();

    if (keyword) {
        const media = await fetchMultiTypes(keyword, lang, 1);
        const checked = await checkAvailability(media);
        mediaData.push(...checked);
    } else {
        const movies = await fetchReleasedMovies(1, lang);
        const checked = await checkAvailability(movies);
        const withMediaType = checked.map(movie => ({...movie, media_type: 'movie'}));
        mediaData.push(...withMediaType);
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