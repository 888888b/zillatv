import { useRouter } from "next/navigation";

export default function UnauthenticatedUserMsg () {
    const { push } = useRouter();

    return (
        <div className="px-4 md:px-8 lg:px-10 w-full flex flex-col gap-y-5 items-center justify-center min-h-[calc(100vh-112px)] sm:min-h-[calc(100vh-80px)]">
            <h1 className="font-raleway font-extrabold text-3xl lg:text-4xl text-white text-center">
                Usuário não registrado
            </h1>

            <p className="font-normal text-base text-neutral-400 text-center lg:text-[17px]">
                Faça login ou crie uma conta para ver seus favoritos.
            </p>

            <button 
                onClick={() => push('/', {scroll: true})}
                className="btn bg-primary text-black hover:bg-primary rounded-[10px] w-full max-w-56 font-bold outline-none border-none">
                Voltar ao inicio
            </button>
        </div>
    );
};