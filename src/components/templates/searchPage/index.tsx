// hooks
import useTmdbFetch from '@/hooks/tmdb';
// componentes
import SearchResults from '@/components/organisms/mediaSection';
import { ScrollToTop } from '@/utils/globalActions/scrollToTop';
import { StopLoading } from '@/components/atoms/stopLoading';
// tipos
import { TmdbMediaProps } from '@/app/[lang]/types';
// funções utilitarias
import { checkAvailability } from '@/utils/tmdb/checkAvailability';
import { formatLangCode } from '@/utils/i18n';

import './styles.css';

type SearchPageProps = {
    keyword: string | undefined,
    lang: string
};

export default async function SearchPage(props: SearchPageProps) {
    const {keyword, lang} = props;
    const contentData: TmdbMediaProps[] = [];
    let contentType: string | undefined;
    const langCode = formatLangCode(lang);
    const {
        fetchMoviesByGenre,
        fetchMultiTypes
    } = useTmdbFetch();

    if (keyword) {
        const content = await fetchMultiTypes(keyword, lang, '1');
        const filtered = await checkAvailability(content);
        contentData.push(...filtered);
        contentType = undefined;
    } else {
        const movies = await fetchMoviesByGenre('878', 1, lang);
        const filtered = await checkAvailability(movies);
        contentData.push(...filtered);
        contentType = 'movie';
    };

    return contentData ? (
        <>
            <section className='search-page-container page-max-width page-padding'>
                <div className='overlay' />
                <div className='z-[2] mt-[clamp(6rem,9vw,7.5rem)] flex flex-col items-start gap-y-5'>
                    <SearchResults 
                        data={contentData} 
                        mediaType={contentType}
                        lang={langCode}
                    />
                </div>
            </section>

            <ScrollToTop/>
            <StopLoading/>
        </>
    ) : null;
};