// componentes
import Footer from "@/components/organisms/footer";
// utilitarios
import { formatLangCode } from "@/utils/i18n";

export default async function WithFooterLayout(
    { children, params }:
        Readonly<{ children: React.ReactNode, params: Promise<{ lang: string }> }>) {
    const { lang } = await params;
    const langCode = formatLangCode(lang);

    return (
        <>
            {children}
            <Footer lang={langCode} />
        </>
    );
};