// hooks
import useTmdbFetch from "@/hooks/tmdb";
// componentes
import HeaderCarousel from "@/components/organisms/heroCarousel";
import MovieSerieCarousel from "@/components/organisms/moviesSeriesCarousel";
import { CarouselTitle } from "@/components/atoms/carouselTitle";
import { StopLoading } from "@/components/atoms/stopLoading";
import { ScrollToTop } from "@/utils/globalActions/scrollToTop";
// utilitarios
import { checkAvailability } from "@/utils/tmdbApiData/availability";
import { sortByVoteAverageDesc } from "@/utils/tmdbApiData/sortByAverageNote";
import { tmdbGenres } from "@/app/constants";
// tipos
import { tmdbObjProps } from "@/contexts/tmdbContext";
type CarouselDataType = {
    [key: string]: { data: tmdbObjProps[], title: string }
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
        )) as tmdbObjProps[];
        const filteredHeaderSlides = headerSlides.filter((_, index) => index < 6);
        carouselsData.headerSlides = {
            data: [...filteredHeaderSlides],
            title: ''
        };
        // filmes / series em trending
        carouselsData.allTrending = {
            data: [...allTrendingsAvailable],
            title: tmdbGenres.trending.title
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
            title: tmdbGenres.netflix.title
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
            title: tmdbGenres.disneyPlus.title
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
            title: tmdbGenres.HBO.title
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
            title: tmdbGenres.paramount.title
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
            title: tmdbGenres.primeVideo.title
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
                    index > 0 &&
                    <div key={`home-main-carousel-${index}`}>
                        {/* linha divisoria */}
                        {index !== 1 &&
                            <div className="w-full h-px my-8 bg-secondary/5 lg:bg-secondary/10 md:invisible" />
                        }
                        {/* Carousel com desenhos/animes */}
                        <div className="flex flex-col gap-y-6 page-max-width">
                            {/* Titulo */}
                            <CarouselTitle className="justify-between sm:justify-start page-padding">
                                {carousel.title}
                            </CarouselTitle>
                            {/* Carousel */}
                            <MovieSerieCarousel
                                slidesData={carousel.data}
                                slidesType='mixed'
                                className={carousel.title.toLowerCase()}
                            />
                        </div>
                    </div>
                ))}
            </div>
            {/* volta ao top sempre que a pagina carrega */}
            <ScrollToTop />
            {/* encerra a animação de loading */}
            {isDataLoaded && <StopLoading />}
        </section >
    );
};