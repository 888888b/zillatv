import useLanguage from '@/hooks/lang';
// traduções
import titleTranslations from '@/i18n/translations/sections/translations.json';
import buttonTranslations from '@/i18n/translations/buttons/translations.json';
// componentes
import SectionTitle from "../../sectionTitle";
// icon
import { FaPlay } from "react-icons/fa";
// tipos
import { StreamingsInfo } from "@/hooks/watchmode";
import { watchmodeTypeTranslation } from "@/hooks/watchmode";
type ComponentProps = { data: StreamingsInfo[] | undefined };

import './styles.css';

export default function WhereToWatch({ data }: ComponentProps) {
    const token = process.env.NEXT_PUBLIC_LOGO_DEV_API_KEY;
    const lang = useLanguage().language.code;
    const titlesText = titleTranslations[lang];
    const buttonsText = buttonTranslations[lang];

    const formatService = (price: number | null, type: string) => {
        const priceType = (type === 'sub' || type === 'rent') ? ' R$ / mês' : ' R$';
        if (!price && type === 'sub') return '**' + priceType;
        if (!price && type !== 'sub') return '**' + priceType;
        const formatedPrice = price?.toFixed(2).replace('.', ',');
        return formatedPrice + priceType;
    };

    const formateServiceType = (type: string) => {
        return watchmodeTypeTranslation[type];
    };

    return data && (
        <section className="where-to-watch">
            <div className="w-full bg-surface pt-8 lg:bg-transparent lg:pt-0">
                {/* titulo da seção  */}
                <SectionTitle className="sm:px-6 lg:px-0">{titlesText.where_to_watch}</SectionTitle>
                <div className="lg:bg-surface lg:mt-6">
                    {/* guia dos cards */}
                    <div className="columns-titles px-6 *:uppercase font-semibold [font-size:clamp(1.0625rem,1.8vw,1.125rem)] lg:[font-size:clamp(1.125rem,1.2vw,1.1875rem)] py-6 lg:pb-10">
                        <h3>{titlesText.streaming}</h3>
                        <h3 className="ml-auto md:ml-0 lg:ml-auto xl:ml-0">{titlesText.service}</h3>
                        <h3>{titlesText.info}</h3>
                        <h3 className="ml-auto md:ml-0 lg:ml-auto xl:ml-0">{titlesText.link}</h3>
                    </div>
                    {/* listagem de streamings disponiveis  */}
                    <div className="streaming-list">
                        {data.map((streaming, index) => (
                            // streaming card
                            <div key={`streaming-${index}`} className="streaming-card p-6 w-full [font-size:clamp(1rem,1.7vw,1.0625rem)] lg:[font-size:clamp(1.0625rem,1.15vw,1.125rem)]">
                                {/* icone do streaming */}
                                { streaming.domain ? 
                                    <img
                                        src={`https://img.logo.dev/${streaming.domain}?token=${token}&format=webp`}
                                        alt={`Logo da ${streaming.name}`}
                                        className="h-10 rounded-md my-auto"
                                    />
                                    :
                                    <h4 className="text-secondary/90 font-semibold text-end md:text-start lg:text-end xl:text-start">
                                        {streaming.name}
                                    </h4>
                                }
                                {/* preço pelo aluguel/compra/assinatura do streaming */}
                                <p className="font-normal text-end md:text-start lg:text-end xl:text-start">
                                    <span className="text-secondary/90 font-semibold">
                                        {formateServiceType(streaming.type)}
                                    </span>
                                    <br/>
                                    {formatService(streaming.price, streaming.type)}
                                </p>
                                {/* detalhes tecnicos exemp:qualidade, duração ou temporadas sobre o filme/serie */}
                                <p className="font-normal text-start ">
                                    <span className="font-semibold text-secondary/90">
                                        {titlesText.format}
                                    </span><br />
                                    {streaming.format}
                                </p>
                                {/* link/botao para ir a pagina do serviço */}
                                <a href={streaming.web_url} target="_blank" className="ml-auto my-auto md:ml-0 lg:ml-auto xl:ml-0 bg-secondary/10 text-secondary/90 [font-size:clamp(1rem,1.15vw,1.125rem)] h-[clamp(2.5rem,4.7vw,3rem)] outline-none border-none w-fit rounded-md font-bold px-[1.5em] active:scale-95 transition-transform duration-200 flex items-center gap-[6px] justify-center cursor-pointer">
                                    <FaPlay />
                                    {buttonsText.watch}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};