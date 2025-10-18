import PlayerPage from "@/components/templates/playerPage";

type ComponentProps = {
    id: string;
    type: 'movie' | 'serie' | 'tv';
};

export default async function Player({ params }: { params: Promise<ComponentProps> }) {
    const { id, type } = await params;

    return (
        <PlayerPage contentId={ id } contentType={ type } />
    );
};