import { FaGithubSquare, FaLinkedin, FaWhatsappSquare } from "react-icons/fa";
import { BsFillPlayFill } from "react-icons/bs";
import { RiGlobalLine } from "react-icons/ri";

export default function Footer({ className }: { className?: string }) {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={`flex flex-col pt-4 gap-12 mx-auto xl:gap-16 ${className}`}>
            <div className="page-padding page-max-width flex gap-12 flex-wrap items-center justify-between xl:flex-nowrap xl:justify-center xl:items-start xl:gap-16 xl:mx-auto">
                <aside>
                    {/* logo do projeto */}
                    <img src="/white_project_logo.svg" alt="Logo do Zilla TV" className='h-[clamp(22px,2.4vw,24px)]' />
                    <p className="mt-2 font-medium [font-size:clamp(0.875rem,1vw,1rem)] whitespace-nowrap">
                        Descubra e acompanhe tudo sobre seus <br />filmes e séries favoritas!
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
                    <button className="outline-0 h-[clamp(40px,4.8vw,48px)] rounded-md border-2 border-secondary/30 px-[1em] flex items-center font-semibold gap-x-2 [font-size:clamp(0.875rem,1vw,1rem)] cursor-pointer">
                        <RiGlobalLine className="[font-size:clamp(22px,1.5vw,24px)]" />
                        Português (Brazil)
                        <BsFillPlayFill className="rotate-90" />
                    </button>
                </aside>

                {/* informações adicionais sobre o projeto */}
                <div>
                    <h4 className="text-secondary font-extrabold [font-size:clamp(1rem,1.15vw,1.125rem)]">
                        <img src="/api_icon.svg" alt="Icone de API" aria-hidden={true} className="inline-block h-[clamp(25px,1.7vw,27px)] mr-1" />
                        Conteúdos e API
                    </h4>
                    <p className="mt-4 font-medium [font-size:clamp(0.875rem,1vw,1rem)] max-w-[clamp(400px,37.5vw,650px)]">As informações sobre filmes e séries exibidas nesta plataforma são fornecidas pela API do The Movie Database (TMDB). Todos os direitos autorais pertencem aos seus respectivos detentores.</p>
                </div>

                <div>
                    <h4 className="text-secondary font-extrabold [font-size:clamp(1rem,1.15vw,1.125rem)]">
                        <img src="/about_icon.svg" alt="Icone de sobre" aria-hidden={true} className="inline-block h-[clamp(22px,1.5vw,24px)] mr-1" />
                        Sobre o projeto
                    </h4>
                    <p className="mt-4 font-medium [font-size:clamp(0.875rem,1vw,1rem)] max-w-[clamp(400px,37.5vw,650px)]">O ZillaTV é uma plataforma dedicada a reunir informações sobre filmes e séries. Seu objetivo é oferecer detalhes, sinopses e dados organizados de forma simples e acessível, ajudando você a descobrir e acompanhar suas produções favoritas</p>
                </div>
            </div>

            {/* copyright */}
            <div className="w-full flex justify-center py-5 bg-surface">
                <p className="font-medium [font-size:clamp(0.875rem,1vw,1rem)]">
                    © {currentYear} ZillaTV - Todos os direitos reservados
                </p>
            </div>
        </footer>
    );
};