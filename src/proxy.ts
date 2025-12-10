import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Idiomas suportados
const supportedLangs = [
    'pt-br', 'en-us', 'es-es', 'es-mx',
    'fr-fr', 'de-de', 'it-it', 'ja-jp',
    'ko-kr', 'zh-cn', 'zh-tw', 'ru-ru', 'ar-sa'
];

export function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const pathnameLower = pathname.toLowerCase();

    // Lê o cookie de idioma e valida
    const cookieLang = req.cookies.get('language')?.value?.toLowerCase();
    const lang = supportedLangs.includes(cookieLang || '') ? cookieLang! : 'pt-br';

    // 1️ Se acessar / (root), redireciona para /{lang}/home
    if (pathname === '/' || pathname === '') {
        const redirectUrl = new URL(`/${lang}/home`, req.url);
        return NextResponse.redirect(redirectUrl);
    };

    // Se acessar uma rota de idioma, mas diferente do cookie
    const matchedLang = supportedLangs.find(l => pathnameLower.startsWith(`/${l}`));
    if (matchedLang && matchedLang !== lang) {
        // Mantém o restante da rota depois do idioma
        const restOfPath = pathnameLower.slice(matchedLang.length + 1);
        const redirectUrl = new URL(`/${lang}/${restOfPath}`, req.url);
        return NextResponse.redirect(redirectUrl);
    };

    // Se já está na rota correta, deixa passar
    return NextResponse.next();
}

// Middleware será executado em todas as rotas, exceto API, _next e favicon
export const config = {
    matcher: ['/((?!api|_next/static|favicon.ico).*)'],
};
