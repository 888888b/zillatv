import { Raleway, Inter } from "next/font/google";

export const raleway = Raleway({
  subsets: ['latin-ext'], 
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-raleway',
});

export const inter = Inter({
  subsets: ['latin-ext'],
  weight: ['300', '400', '500', '600', '700', '900'],
  variable: '--font-inter',
});
