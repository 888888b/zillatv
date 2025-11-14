import PlayerPage from "@/components/templates/playerPage";

type ComponentProps = {
    id: string;
    type: 'movie' | 'serie' | 'tv';
    lang: string;
};

export default async function Player({ params }: { params: Promise<ComponentProps> }) {
    const { id, type, lang } = await params;
    return <PlayerPage mediaId={id} mediaType={type} lang={lang}/>
};