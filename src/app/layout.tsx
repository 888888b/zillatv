import type { Metadata, Viewport } from "next";

import "./globals.css";

import * as fonts from '@/app/fonts/index';

import Header from "@/components/organisms/header";
import Footer from "@/components/organisms/footer";
import LoginModal from "@/components/authenticationModals/login";
import RegisterModal from "@/components/authenticationModals/register";
import ProfileModal from "@/components/profileModal";

import { TmdbProvider } from "@/contexts/tmdbContext";
import { GlobalEventsProvider } from "@/contexts/globalEventsContext";
import { UserDataProvider } from "@/contexts/authenticationContext";

import { ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.css';

export const metadata: Metadata = {
  title: "ZiloCine Filmes e Series",
};

export const viewport: Viewport = {
  themeColor: '#020515'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

  return (
    <html lang="pt-br">
      <body className={` 
        ${ fonts.raleway.variable } 
        ${ fonts.inter.variable }
        antialiased
      `}>
        <div className="relative overflow-x-hidden max-w-[2200px] mx-auto">
          <TmdbProvider>
              <UserDataProvider>
                <GlobalEventsProvider>
                  <Header/>
                  <LoginModal/>
                  <RegisterModal/>
                  <ProfileModal/>
                  <ToastContainer/>
                  { children }
                  <Footer/>
                </GlobalEventsProvider>
              </UserDataProvider>
          </TmdbProvider>
        </div>
      </body>
    </html>
  );
}
