import './styles.css';

type ComponentProps = {className?: string;};

export default function Footer(props: ComponentProps) {
    const {className} = props;

    return (
        <footer className={`px-4 sm:px-10 lg:px-[70px] py-14 bg-surface ${className}`}>
            <h2 className="text-primary font-black text-[22px] font-raleway">ZilluTV</h2>
            <div className="bg-secondary/5 h-px w-full max-w-48 mt-[15px]" />

            <div className="flex flex-wrap gap-y-20 gap-x-[60px] md:gap-20 items-start lg:justify-between mt-10">
                <div>
                    <h3 className="font-bold uppercase text-base text-secondary">Conta</h3>
                    <div className="mt-5">
                        <ul className="font-normal flex flex-col gap-y-[10px] text-base">
                            <li><a href="">Criar conta</a></li>
                            <li><a href="">Entrar</a></li>
                            <li><a href="">Assinatura</a></li>
                            <li><a href="">Dispositivos compatíveis</a></li>
                        </ul>
                    </div>
                </div>

                <div>
                    <h3 className="font-bold uppercase text-base text-secondary">Sobre</h3>
                    <div className="mt-5">
                        <ul className="font-normal flex flex-col gap-y-[10px] text-base">
                            <li><a href="">Quem Somos</a></li>
                            <li><a href="">Parceiros</a></li>
                            <li><a href="">Trabalhe conosco</a></li>
                        </ul>
                    </div>
                </div>

                <div>
                    <h3 className="font-bold uppercase text-base text-secondary">Ajuda</h3>
                    <div className="mt-5">
                        <ul className="font-normal flex flex-col gap-y-[10px] text-base">
                            <li><a href="">Central de ajuda</a></li>
                            <li><a href="">Fale conosco</a></li>
                            <li><a href="">Status do serviço</a></li>
                            <li><a href="">Perguntas frequentes</a></li>
                        </ul>
                    </div>
                </div>

                <div>
                    <h3 className="font-bold uppercase text-base text-secondary">Legal</h3>
                    <div className="mt-5">
                        <ul className="font-normal flex flex-col gap-y-[10px] text-base">
                            <li><a href="">Termos de uso</a></li>
                            <li><a href="">Política de Privacidade</a></li>
                            <li><a href="">Política de Cookies</a></li>
                        </ul>
                    </div>
                </div>

                <div>
                    <h3 className="font-bold uppercase text-base text-secondary">Nossas redes</h3>
                    <div className="mt-5">
                        <ul className="font-normal flex flex-col gap-y-[10px] text-base">
                            <li><a href="">Instagram</a></li>
                            <li><a href="">Twitter/X</a></li>
                            <li><a href="">Facebook</a></li>
                            <li><a href="">YouTube</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="bg-secondary/5 h-px w-full my-10" />

            <div className="flex items-center flex-col gap-10">
                <div className='flex flex-wrap gap-5 justify-center items-center'>
                    {/* icone do google play */}
                    <img
                        src={'/google_play_badge.png'}
                        alt='Google Play badge'
                        className='h-10 w-auto cursor-pointer'
                        loading='lazy'
                    />

                    {/* icon da apple store */}
                    <img
                        src={'/apple_store_badge.png'}
                        alt='Apple store badge'
                        className='h-11 w-auto cursor-pointer'
                        loading='lazy'
                    />

                     {/* icon da microsoft store */}
                    <img
                        src={'/microsoft_store_badge.svg'}
                        alt='Microsoft store badge'
                        className='h-10 w-auto cursor-pointer border border-secondary/65 rounded-md'
                        loading='lazy'
                    />
                </div>

                <p className="text-base font-semibold">© 2025 ZilluTV - Todos os direitos reservados</p>
            </div>
        </footer>
    );
};