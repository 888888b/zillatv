import { Raleway, Inter, Roboto, Poppins } from "next/font/google";

export const raleway = Raleway({
  subsets: ['latin-ext'], 
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-raleway',
});

export const inter = Inter({
  subsets: ['latin-ext'],
  weight: ['400', '500', '600', '700', '900'],
  variable: '--font-inter',
});

export const roboto = Roboto({
  subsets: ['latin-ext'],
  weight: ['400', '500', '600', '700', '900'],
  variable: '--font-roboto'
})
