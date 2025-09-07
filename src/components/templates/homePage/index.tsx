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
import { tmdbGenres, headerMoviesList } from "@/app/constants";
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
        fetchMoviesByIdList,
        fetchPlatformContent
    } = useTmdbFetch();

    try {
        // carousel do header
        const topMovies = await fetchMoviesByIdList(headerMoviesList);
        const filteredTopMovies = await checkAvailability(topMovies);
        carouselsData.headerSlides = { 
            data: [...filteredTopMovies.map(item => ({ ...item, media_type: 'movie' })),], 
            title: 'Recomendados' 
        };
        // filmes / series em trending
        const allTrending = await fetchAllTrending('all');
        const filteredTrending = await checkAvailability(allTrending);
        carouselsData.allTrending = { 
            data: [...filteredTrending], 
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
        const disneySeries = await fetchPlatformContent("disney", "tv");
        const disneyMovies = await fetchPlatformContent("disney", "movie");
        const filteredDisneySeries = await checkAvailability(disneySeries);
        const filteredDisneyMovies = await checkAvailability(disneyMovies);
        carouselsData.disney = {
            data: [
                ...filteredDisneySeries.map(item => ({ ...item, media_type: 'tv' })),
                ...filteredDisneyMovies.map(item => ({ ...item, media_type: 'movie' }))],
            title: tmdbGenres.disney.title
        };

        // --- HBO / Max ---
        const hboSeries = await fetchPlatformContent("hbo", "tv");
        const hboMovies = await fetchPlatformContent("hbo", "movie");
        const filteredHboSeries = await checkAvailability(hboSeries);
        const filteredHboMovies = await checkAvailability(hboMovies);
        carouselsData.hbo = {
            data: [
                ...filteredHboSeries.map(item => ({ ...item, media_type: 'tv' })),
                ...filteredHboMovies.map(item => ({ ...item, media_type: 'movie' }))],
            title: tmdbGenres.HBO.title
        };

        // --- Hulu ---
        const huluSeries = await fetchPlatformContent("hulu", "tv");
        const huluMovies = await fetchPlatformContent("hulu", "movie");
        const filteredHuluSeries = await checkAvailability(huluSeries);
        const filteredHuluMovies = await checkAvailability(huluMovies);
        carouselsData.hulu = {
            data: [
                ...filteredHuluSeries.map(item => ({ ...item, media_type: 'tv' })),
                ...filteredHuluMovies.map(item => ({ ...item, media_type: 'movie' }))],
            title: tmdbGenres.hulu.title
        };

        // --- Prime Video ---
        const primeSeries = await fetchPlatformContent("prime", "tv");
        const primeMovies = await fetchPlatformContent("prime", "movie");
        const filteredPrimeSeries = await checkAvailability(primeSeries);
        const filteredPrimeMovies = await checkAvailability(primeMovies);
        carouselsData.prime = {
            data: [
                ...filteredPrimeSeries.map(item => ({ ...item, media_type: 'tv' })),
                ...filteredPrimeMovies.map(item => ({ ...item, media_type: 'movie' }))],
            title: tmdbGenres.prime.title
        };
        isDataLoaded = true;
    } catch (error) {
        console.error(error);
    };

    return (
        <section className="min-h-screen">
            {/* hero carousel */}
            <HeaderCarousel
                slidesType='movie'
                slidesData={carouselsData.headerSlides.data}
                currentPage="home"
            />
            {/* main carousels */}
            <div className="flex flex-col mt-8 mb-16 sm:mb-0  sm:-translate-y-[100px] z-10 relative">
                {Object.values(carouselsData).map((carousel, index) => (
                    <div key={`home-main-carousel-${index}`}>
                        {/* Carousel com desenhos/animes */}
                        <div className="flex flex-col gap-y-8">
                            {/* Titulo */}
                            <CarouselTitle className="justify-between sm:justify-start mx-auto w-[calc(100%-40px)] sm:w-fit sm:mx-0 sm:ml-10 lg:ml-16">
                                {carousel.title}
                            </CarouselTitle>
                            {/* Carousel */}
                            <MovieSerieCarousel slidesData={carousel.data} slidesType='mixed' />
                        </div>
                        <div className="w-full h-px my-11 lg:my-8 bg-secondary/5 lg:bg-secondary/10 md:invisible" />
                    </div>
                ))}
            </div>
            {/* volta ao top sempre que a pagina carrega */}
            <ScrollToTop />
            {/* encerra a animação de loading */}
            {isDataLoaded && <StopLoading />}
        </section>
    );
};