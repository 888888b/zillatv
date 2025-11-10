// todos os tamanhos para imagens
export const tmdbConfig = {
  high_resolution_poster: 'https://image.tmdb.org/t/p/original',
  high_resolution_backdrop: 'https://image.tmdb.org/t/p/original',
  medium_resolution_poster: 'https://image.tmdb.org/t/p/w780',
  medium_resolution_backdrop: 'https://image.tmdb.org/t/p/w1280',
  low_resolution_poster: 'https://image.tmdb.org/t/p/w342',
  low_resolution_backdrop: 'https://image.tmdb.org/t/p/w780',
  blur_resolution_poster: 'https://image.tmdb.org/t/p/w185',
  blur_resolution_backdrop: 'https://image.tmdb.org/t/p/w300',
  profile_photo_base_url: 'https://image.tmdb.org/t/p/w185',
  high_resolution_still: 'https://image.tmdb.org/t/p/w500',
  low_resolution_still: 'https://image.tmdb.org/t/p/w185',
  ImageBasePath: 'https://image.tmdb.org/t/p',
  low_resolution_logo: 'https://image.tmdb.org/t/p/w185',
  high_resolution_logo: 'https://image.tmdb.org/t/p/original',
};

// generos e respectivos titulos para filmes
export const tmdbGenres = {
  cartoon: { genre: '16', title: 'Desenho' },
  netflix: { genre: 'netflix', title: 'Netflix' },
  release: { genre: 'release', title: 'Lançamentos' },
  trending: { genre: 'trending', title: 'Em alta' },
  paramount: {genre: 'paramount', title: 'Paramount'},
  horror: { genre: '27', title: 'Terror' },
  appleTV: {genre: 'appleTV', title:'AppleTV'},
  action: { genre: '28', title: 'Ação' },
  HBO: { genre: 'HBO', title: 'HBO' },
  comedy: { genre: '35', title: 'Comédia' },
  romance: { genre: '10749', title: 'Romance' },
  crunchyroll: {genre:'crunchyroll', title: 'Crunchyroll'},
  documentary: { genre: '99', title: 'Documentário' },
  plutoTV: {genre: 'plutoTV', title: 'PlutoTV'},
  war: { genre: '10752', title: 'Guerra' },
  disneyPlus: { genre: 'disneyPlus', title: 'Disney Plus' },
  fiction: { genre: '878', title: 'Ficção' },
  adventure: { genre: '12', title: 'Aventura' },
  popular: { genre: 'popular', title: 'Populares' },
  primeVideo: { genre: 'primeVideo', title: 'Prime Video' },
  crime: { genre: '80', title: 'Crime' },
  drama: { genre: '18', title: 'Drama' },
  family: { genre: '10751', title: 'Família' },
  history: { genre: '36', title: 'História' },
  music: { genre: '10402', title: 'Música' },
  mystery: { genre: '9648', title: 'Suspense' },
  tvmovie: { genre: '10770', title: 'TV' },
  thriller: { genre: '53', title: 'Thriller' },
  western: { genre: '37', title: 'Faroeste' },
  globoPlay: {genre: 'globoPlay', title: 'Globo Play'}
};

// generos e respectivos titulos para series
export const tmdbSerieGenres = {
  release: { genre: 'release', title: 'Lançamentos' },
  netflix: { genre: 'netflix', title: 'Netflix' },
  suspense: { genre: '9648', title: 'Suspense' },
  trending: { genre: 'trending', title: 'Em alta' },
  paramount: {genre: 'paramount', title: 'Paramount'},
  action: { genre: '10759', title: 'Ação' },
  comedy: { genre: '35', title: 'Comédia' },
  war: { genre: '10768', title: 'Guerra' },
  appleTV: {genre: 'appleTV', title:'AppleTV'},
  cartoon: { genre: '16', title: 'Desenho' },
  documentary: { genre: '99', title: 'Documentário' },
  HBO: { genre: 'HBO', title: 'HBO' },
  popular: { genre: 'popular', title: 'Populares' },
  crime: { genre: '80', title: 'Crime' },
  crunchyroll: {genre:'crunchyroll', title: 'Crunchyroll'},
  drama: { genre: '18', title: 'Drama' },
  family: { genre: '10751', title: 'Família' },
  disneyPlus: { genre: 'disneyPlus', title: 'Disney Plus' },
  kids: { genre: '10762', title: 'Infantil' },
  news: { genre: '10763', title: 'Notícias' },
  plutoTV: {genre: 'plutoTV', title: 'PlutoTV'},
  reality: { genre: '10764', title: 'Reality' },
  scifi: { genre: '10765', title: 'Ficção' },
  globoPlay: {genre: 'globoPlay', title: 'Globo Play'},
  soap: { genre: '10766', title: 'Novela' },
  talk: { genre: '10767', title: 'Entrevista' },
  primeVideo: { genre: 'primeVideo', title: 'Prime Video' },
  western: { genre: '37', title: 'Faroeste' }
};

export const homeCarouselGenres = {
  primeVideo: { genre: 'primeVideo', title: 'prime' },
  disneyPlus: { genre: 'disneyPlus', title: 'disney' },
  HBO: { genre: 'HBO', title: 'hbo' },
  netflix: { genre: 'netflix', title: 'netflix' },
  trending: { genre: 'trending', title: 'trending' },
  paramount: {genre: 'paramount', title: 'paramount'},
} as const;

export const headerMoviesList = [
  "1233413",  // Pecadores
  "438631",   // Duna 1
  "650031",  // O Bombardeio
  "157336",  // Interstellar
  "524434",  // Eternos
  "603692",  // John Wick capitulo 4
  "12153",     // As branquelas
  "696806",  // O Projeto Adam
];

export const headerSeriesList = [
  "100088",  // The last of us
  "66732",   // Stranger Things
  "87108",   // Chernobyl
  "76479",   // The Boys
  "1399",    // Game of Thrones
  "1396",    // Breaking Bad
  "82856",   // The Mandalorian
  "94997"   // House of the Dragon
];

// plataformas disponiveis para buscas de conteudo
export type Platform =
  | "netflix"
  | "disneyPlus"
  | "HBO"
  | "primeVideo"
  | "paramount"
  | "plutoTV"
  | "globoPlay"
  | "appleTV"
  | "crunchyroll";

// id como provedor de filmes 
export const moviesProviders: Record<Platform, string> = {
  disneyPlus: '337',
  netflix: '8',
  HBO: '1899',
  appleTV: '350',
  primeVideo: '119',
  paramount: '531',
  globoPlay: '307',
  crunchyroll: '283',
  plutoTV: '300'
};

// id como produtor de series
export const seriesNetworks: Record<Platform, string> = {
  netflix: '213',
  disneyPlus: '2739',
  HBO: '49',
  paramount: '4330',
  globoPlay: '3290',
  primeVideo: '1024',
  plutoTV: '3245',
  crunchyroll: '1112',
  appleTV: '2552'
};