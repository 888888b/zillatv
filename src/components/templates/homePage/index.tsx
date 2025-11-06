// hooks
import useTmdbFetch from "@/hooks/tmdb";
// componentes
import HeaderCarousel from "@/components/organisms/heroCarousel";
import { StopLoading } from "@/components/atoms/stopLoading";
import { ScrollToTop } from "@/utils/globalActions/scrollToTop";
import CarouselWrapper from './CarouselWrapper';
// utilitarios
import { checkAvailability } from "@/utils/tmdbApiData/availability";
import { homeCarouselGenres as titles } from "@/app/constants";
// tipos
import { TmdbMediaProps } from "@/app/types";
import { CarouselTitleType } from "@/app/types";
type CarouselDataType = {
    [key: string]: { data: TmdbMediaProps[], title?: CarouselTitleType }
};

export default async function HomePage() {

    const carouselsData: CarouselDataType = {};
    let isDataLoaded = false;
    const {
        fetchAllTrending,
        fetchPlatformContent,
        fetchMovieById,
        fetchSeriebyId
    } = useTmdbFetch();

    try {
        // carousel do header
        const allTrending = await fetchAllTrending('all');
        const allTrendingsAvailable = await checkAvailability(allTrending);
        const headerSlides = await Promise.all(allTrendingsAvailable.map((item) =>
            new Promise(async (resolve, reject) => {
                const res = item.media_type === 'movie' ?
                    await fetchMovieById(item.id) :
                    await fetchSeriebyId(item.id);
                if (res) {
                    const media = { ...res, media_type: item.media_type };
                    resolve(media);
                } else {
                    reject();
                };
            })
        )) as TmdbMediaProps[];
        const filteredHeaderSlides = headerSlides.filter((_, index) => index < 6);
        carouselsData.headerSlides = {data: [...filteredHeaderSlides]}
        // filmes / series em trending
        carouselsData.allTrending = {
            data: [...allTrendingsAvailable],
            title: titles.trending.title
        }
        // --- Netflix ---
        const netflixSeries = await fetchPlatformContent('netflix', 'tv');
        const netflixMovies = await fetchPlatformContent('netflix', 'movie');
        const filteredNetflixMovies = await checkAvailability(netflixMovies);
        const filteredNetflixSeries = await checkAvailability(netflixSeries);
        carouselsData.netflix = {
            data: [
                ...filteredNetflixSeries.map(item => ({ ...item, media_type: 'tv' })),
                ...filteredNetflixMovies.map(item => ({ ...item, media_type: 'movie' }))],
            title: titles.netflix.title
        };
        // --- Disney+ ---
        const disneySeries = await fetchPlatformContent("disneyPlus", "tv");
        const disneyMovies = await fetchPlatformContent("disneyPlus", "movie");
        const filteredDisneySeries = await checkAvailability(disneySeries);
        const filteredDisneyMovies = await checkAvailability(disneyMovies);
        carouselsData.disney = {
            data: [
                ...filteredDisneySeries.map(item => ({ ...item, media_type: 'tv' })),
                ...filteredDisneyMovies.map(item => ({ ...item, media_type: 'movie' }))],
            title: titles.disneyPlus.title
        };

        // --- HBO / Max ---
        const hboSeries = await fetchPlatformContent("HBO", "tv");
        const hboMovies = await fetchPlatformContent("HBO", "movie");
        const filteredHboSeries = await checkAvailability(hboSeries);
        const filteredHboMovies = await checkAvailability(hboMovies);
        carouselsData.hbo = {
            data: [
                ...filteredHboSeries.map(item => ({ ...item, media_type: 'tv' })),
                ...filteredHboMovies.map(item => ({ ...item, media_type: 'movie' }))],
            title: titles.HBO.title
        };

        // --- paramount ---
        const paramountSeries = await fetchPlatformContent("paramount", "tv");
        const paramountMovies = await fetchPlatformContent("paramount", "movie");
        const filteredParamountSeries = await checkAvailability(paramountSeries);
        const filteredParamountMovies = await checkAvailability(paramountMovies);
        carouselsData.hulu = {
            data: [
                ...filteredParamountSeries.map(item => ({ ...item, media_type: 'tv' })),
                ...filteredParamountMovies.map(item => ({ ...item, media_type: 'movie' }))],
            title: titles.paramount.title
        };

        // --- Prime Video ---
        const primeSeries = await fetchPlatformContent("primeVideo", "tv");
        const primeMovies = await fetchPlatformContent("primeVideo", "movie");
        const filteredPrimeSeries = await checkAvailability(primeSeries);
        const filteredPrimeMovies = await checkAvailability(primeMovies);
        carouselsData.prime = {
            data: [
                ...filteredPrimeSeries.map(item => ({ ...item, media_type: 'tv' })),
                ...filteredPrimeMovies.map(item => ({ ...item, media_type: 'movie' }))],
            title: titles.primeVideo.title
        };
        isDataLoaded = true;
    } catch (error) {
        console.error(error);
    };

    return (
        <section className="min-h-screen">
            {/* hero carousel */}
            <HeaderCarousel
                slidesData={carouselsData.headerSlides.data}
                currentPage="home"
            />
            {/* main carousels */}
            <div className="flex flex-col mt-12 mb-16 relative z-10 sm:-mt-[clamp(0px,5.5vw,56px)]">
                {Object.values(carouselsData).map((carousel, index) => (
                    index > 0 && carousel.title &&
                    <CarouselWrapper 
                        key={`home-carousel-${carousel.title}`}
                        title={carousel.title} 
                        data={carousel.data}
                        index={index}
                    />
                ))}
            </div>
            {/* volta ao top sempre que a pagina carrega */}
            <ScrollToTop />
            {/* encerra a animação de loading */}
            {isDataLoaded && <StopLoading />}
        </section >
    );
};