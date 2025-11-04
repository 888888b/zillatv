import type { Metadata, Viewport } from "next";
// fontes
import * as fonts from '@/app/fonts/index';
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
// estilos
import "./globals.css";
import 'react-toastify/ReactToastify.css';

export const metadata: Metadata = {
  title: "ZilluTV - Descubra filmes, séries e muito mais!",
};

export const viewport: Viewport = {
  themeColor: '#020515'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

  return (
    <html lang="pt-br">
      <body className={` 
        ${fonts.raleway.variable} 
        ${fonts.inter.variable}
        antialiased
      `}>
        <div className="relative overflow-x-hidden max-w-[2000px] mx-auto">
          <GlobalProvider>
            <AuthProvider>
              <UserProvider>
                <ModalsProvider>
                  <Loading />
                  <Header />
                  <LoginModal />
                  <RegisterModal />
                  {/* <ProfileModal/> */}
                  <ToastContainer />
                  {children}
                  <Footer />
                </ModalsProvider>
              </UserProvider>
            </AuthProvider>
          </GlobalProvider>
        </div>
      </body>
    </html>
  );
}
