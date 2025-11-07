'use client';
// icons
import { FaGithubSquare, FaLinkedin, FaWhatsappSquare } from "react-icons/fa";
// componentes
import LangSelector from '@/components/molecules/langSelector';
// contexto
import useLanguage from '@/hooks/lang';
// translations
import Translations from '@/i18n/translations/footer/translations.json';

export default function Footer({ className }: { className?: string }) {
    const currentYear = new Date().getFullYear();
    const lang = useLanguage().language.code;
    const data = Translations[lang];

    return (
        <footer className={`flex flex-col pt-4 gap-12 mx-auto xl:gap-16 ${className}`} style={{overflow: 'visible'}}>
            <div className="page-padding page-max-width flex gap-12 flex-wrap items-center justify-between xl:flex-nowrap xl:justify-center xl:items-start xl:gap-16 xl:mx-auto">
                <aside>
                    {/* logo do projeto */}
                    <img src="/white_project_logo.svg" alt="Logo do Zilla TV" className='h-[clamp(22px,2.4vw,24px)]' />
                    <p className="mt-2 font-medium [font-size:clamp(0.875rem,1vw,1rem)] max-w-[360px]">
                        {data.discover_follow}
                    </p>
                    {/* redes sociais / contato */}
                    <div className="flex items-center gap-x-4 mt-3 mb-6 [font-size:clamp(24px,1.65vw,26px)] ">
                        <a href="https://www.linkedin.com/in/vitor-araujo-2054622a6" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin />
                        </a>
                        <a href="https://github.com/888888b/" target="_blank" rel="noopener noreferrer">
                            <FaGithubSquare />
                        </a>
                        <a href="https://wa.me/5562998648742" target="_blank" rel="noopener noreferrer">
                            <FaWhatsappSquare/>
                        </a>
                    </div>
                    {/* selecionar / trocar idioma da pagina */}
                    <LangSelector/>
                </aside>

                {/* informações adicionais sobre o projeto */}
                <div>
                    <h4 className="text-secondary font-extrabold [font-size:clamp(1rem,1.15vw,1.125rem)]">
                        <img src="/api_icon.svg" alt="Icone de API" aria-hidden={true} className="inline-block h-[clamp(25px,1.7vw,27px)] mr-1" />
                        {data.content_api}
                    </h4>
                    <p className="mt-4 font-medium [font-size:clamp(0.875rem,1vw,1rem)] max-w-[clamp(400px,37.5vw,650px)]">{data.description_api}</p>
                </div>

                <div>
                    <h4 className="text-secondary font-extrabold [font-size:clamp(1rem,1.15vw,1.125rem)]">
                        <img src="/about_icon.svg" alt="Icone de sobre" aria-hidden={true} className="inline-block h-[clamp(22px,1.5vw,24px)] mr-1" />
                        {data.about_project}
                    </h4>
                    <p className="mt-4 font-medium [font-size:clamp(0.875rem,1vw,1rem)] max-w-[clamp(400px,37.5vw,650px)]">{data.description_project}</p>
                </div>
            </div>

            {/* copyright */}
            <div className="w-full flex justify-center py-5 bg-surface">
                <p className="font-medium [font-size:clamp(0.875rem,1vw,1rem)]">
                    © {currentYear} {data.copyright}
                </p>
            </div>
        </footer>
    );
};