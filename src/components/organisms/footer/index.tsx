import { AndroidIcon } from '@/components/atoms/androidIcon';
import { WindowsIcon } from '@/components/atoms/windowsIcon';
import './styles.css';

type ComponentProps = { className?: string; };

export default function Footer(props: ComponentProps) {
    const { className } = props;

    return (
        <footer className={`px-4 sm:px-10 lg:px-16 pt-16 pb-8 bg-surface border-t-2 border-secondary/5 flex flex-col gap-y-16 items-center ${className}`}>
            {/* titulo */}
            <h2 className="w-fit font-semibold text-lg uppercase text-secondary hidden md:inline">
                Filmes populares - séries em alta - animes online
            </h2>

            <div className='custom-grid flex flex-col gap-y-16'>
                {/* downloads */}
                <div className='column flex flex-col'>
                    <h3>Baixe nosso aplicativo</h3>
                    {/* baixar aplicativo android */}
                    <button className='mt-6 flex items-center gap-x-2 transition-transform active:scale-95 duration-200'>
                        <AndroidIcon size={20}/>
                        Android
                    </button>
                    {/* baixar aplicativo desktop*/}
                    <button className='mt-2 flex items-center gap-x-2 transition-transform active:scale-95 duration-200'>
                        <WindowsIcon size={20}/>
                        Windows
                    </button>
                    <p className='mt-4'>
                        Tenha acesso à nossa plataforma de filmes no seu celular Android ou computador!
                    </p>
                </div>

                {/* sobre conteudos e api */}
                <div className='column flex flex-col'>
                    <h3>Conteúdos & API</h3> 
                    <img
                        src='/tmdb_logo.png'
                        alt='Imagem logo do TMDB'
                        loading='lazy'
                        className='h-9 w-fit mt-6'
                    />
                    <p className='mt-3'>
                        As informações sobre filmes e séries exibidas nesta plataforma são fornecidas pela API do The Movie Database (TMDB). Todos os direitos autorais pertencem aos seus respectivos detentores.
                    </p>
                </div>

                {/* breve descrição sobre o projeto */}
                <div className='column flex flex-col'>
                    <h3>Sobre o projeto</h3> 
                    <img
                        src='/project_logo.svg'
                        alt='Imagem logo do TMDB'
                        loading='lazy'
                        className='h-9 w-fit mt-6'
                    />
                    <p className='mt-3'>
                        Somos uma plataforma dedicada a reunir informações sobre filmes e séries. Nosso objetivo é oferecer detalhes, sinopses e dados organizados de forma simples e acessível, ajudando você a descobrir e acompanhar suas produções favoritas.
                    </p>
                </div>
            </div>

            <p className='text-center'>© 2025 ZillaTV. Todos os direitos reservados.</p>
        </footer>
    );
};