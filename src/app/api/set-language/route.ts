import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        // Lê o body da requisição
        const body = await req.json();
        const { code, label } = body;
        // Validação mínima
        if (!code || !label) {
            return NextResponse.json({ error: 'Idioma inválido' }, { status: 400 });
        };
        // Cria a resposta com cookie
        const res = NextResponse.json({ success: true });
        // Define o cookie de idioma no servidor
        res.cookies.set({
            name: 'language',
            value: code,          
            path: '/',
            maxAge: 60 * 60 * 24 * 365,
            httpOnly: false,
            sameSite: 'lax',
        });

        console.log(code);

        return res;
    } catch (error) {
        console.error('Erro ao salvar idioma:', error);
        return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
    };
};
