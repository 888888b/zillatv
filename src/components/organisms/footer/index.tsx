'use client';
// icons
import { FaGithubSquare, FaLinkedin, FaWhatsappSquare } from "react-icons/fa";
// translations
import Translations from '@/i18n/translations/footer/translations.json';
// tipos
import { LangCode } from "@/i18n/languages";

export default function Footer({ className, lang }: { className?: string, lang: string }) {
    const currentYear = new Date().getFullYear();
    const data = Translations[lang as LangCode];

    return (
        <footer className={`flex flex-col gap-12 mx-auto xl:gap-16 ${className}`} style={{ overflow: 'visible' }}>
            <span className="w-24 h-1 bg-secondary/10 ml-(--page-padding)"></span>
            <div className="page-padding page-max-width flex gap-12 flex-wrap items-center justify-between xl:flex-nowrap xl:justify-center xl:items-start xl:gap-16 xl:mx-auto">
                <aside>
                    {/* logo do projeto */}
                    <img
                        src="/white_logo.svg"
                        alt="Logo do Zillatv"
                        loading="lazy"
                        className="w-[clamp(85px,9.2vw,98px)] cursor-pointer"
                    />
                    <p className="mt-2 font-medium text-[clamp(0.875rem,1vw,1rem)] max-w-[360px]">
                        {data.discover_follow}
                    </p>
                    {/* redes sociais / contato */}
                    <div className="flex items-center gap-x-4 mt-3 text-[clamp(24px,1.65vw,26px)] ">
                        <a href="https://www.linkedin.com/in/vitor-araujo-2054622a6" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin />
                        </a>
                        <a href="https://github.com/888888b/" target="_blank" rel="noopener noreferrer">
                            <FaGithubSquare />
                        </a>
                        <a href="https://wa.me/5562998648742" target="_blank" rel="noopener noreferrer">
                            <FaWhatsappSquare />
                        </a>
                    </div>
                </aside>

                {/* informações adicionais sobre o projeto */}
                <div>
                    <h4 className="text-secondary font-extrabold text-[clamp(1rem,1.15vw,1.125rem)] uppercase">
                        <img src="/api_icon.svg" alt="Icone de API" aria-hidden={true} className="inline-block h-[clamp(25px,1.7vw,27px)] mr-1" />
                        {data.content_api}
                    </h4>
                    <p className="mt-4 font-medium text-[clamp(0.875rem,1vw,1rem)] max-w-[clamp(400px,37.5vw,650px)]">{data.description_api}</p>
                </div>

                <div>
                    <h4 className="text-secondary font-extrabold text-[clamp(1rem,1.15vw,1.125rem)] uppercase">
                        <img src="/about_icon.svg" alt="Icone de sobre" aria-hidden={true} className="inline-block h-[clamp(22px,1.5vw,24px)] mr-1" />
                        {data.about_project}
                    </h4>
                    <p className="mt-4 font-medium text-[clamp(0.875rem,1vw,1rem)] max-w-[clamp(400px,37.5vw,650px)]">{data.description_project}</p>
                </div>
            </div>

            {/* copyright */}
            <div className="w-full flex justify-center py-5 bg-surface">
                <p className="font-medium text-[clamp(0.875rem,1vw,1rem)]">
                    © {currentYear} {data.copyright}
                </p>
            </div>
        </footer>
    );
};