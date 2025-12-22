import type { Metadata, Viewport } from "next";
// fontes
import * as fonts from '@/app/[lang]/fonts/index';
// componentes
import Header from "@/components/organisms/header";
import Footer from "@/components/organisms/footer";
import LoginModal from "@/components/organisms/loginModal";
import RegisterModal from "@/components/organisms/registerModal";
// import ProfileModal from "@/components/profileModal";
import { ToastContainer } from "react-toastify";
import Loading from '@/components/molecules/pageLoading';
// contextos
import { GlobalProvider } from '@/contexts/global'
import { UserProvider } from "@/contexts/user";
import { ModalsProvider } from "@/contexts/modal";
import { AuthProvider } from "@/contexts/auth";
import { LanguageProvider } from "@/contexts/lang";
// utilitarios
import { formatLangCode } from "@/utils/i18n";
// estilos
import "./globals.css";
import 'react-toastify/ReactToastify.css';

export const metadata: Metadata = {
  title: "ZillaTV - Explore filmes, séries e tudo o que você gosta.",
};

export const viewport: Viewport = {
  themeColor: '#020515'
};

export default async function RootLayout(
  { children, params }:
    Readonly<{ children: React.ReactNode, params: Promise<{lang: string}> }>) {
  const {lang} = await params;
  const langCode = formatLangCode(lang);

  return (
    <html lang="pt-br">
      <body className={` 
        ${fonts.raleway.variable} 
        ${fonts.inter.variable}
        ${fonts.roboto.variable}
        antialiased
      `}>
        <div className="relative overflow-x-hidden max-w-[2000px] mx-auto">
          <GlobalProvider>
            <AuthProvider>
              <UserProvider>
                <ModalsProvider>
                  <LanguageProvider>
                    <Loading />
                    <Header lang={langCode}/>
                    <LoginModal />
                    <RegisterModal />
                    {/* <ProfileModal/> */}
                    <ToastContainer />
                    {children}
                    <Footer lang={langCode}/>
                  </LanguageProvider>
                </ModalsProvider>
              </UserProvider>
            </AuthProvider>
          </GlobalProvider>
        </div>
      </body>
    </html>
  );
}
