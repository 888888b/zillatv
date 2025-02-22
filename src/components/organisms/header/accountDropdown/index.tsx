// hooks
import { useContext, useState } from "react";
import useFirebase from "@/components/hooks/firebase";

// contextos
import { UserDataContext } from "@/components/contexts/authenticationContext";
import { GlobalEventsContext } from "@/components/contexts/globalEventsContext";

// icones
import { TbLogout2 } from "react-icons/tb";
import { AiOutlineDelete } from "react-icons/ai";
import { RiUser6Line } from "react-icons/ri";

// componentes
import Image from "next/image";

import './styles.css';

export default function AccountDropdown() {

    const [ isClosingAccount, setIsClosingAccount ] = useState( false );
    const [ isSigningOut, setIsSigningOut ] = useState( false );

    // dados do usuario
    const {
        photoUrl,
        name
    } = useContext( UserDataContext );

    // ações de usuario
    const {
        deleteCurrentUser,
        signOutUser
    } = useFirebase();

    // controlador de modais
    const {
        setModalsController
    } = useContext( GlobalEventsContext );

    // desconecta o usurio atual
    const signOut = async () => {
        setIsSigningOut( true );
        await signOutUser();
        setIsSigningOut( false );
    };

    // encerrar conta do usuario
    const deleteAccount = async () => {
        setIsClosingAccount( true );
        await deleteCurrentUser();
        setIsClosingAccount( false );
    };

    const openProfileModal = () => {
        setModalsController( prev => ({
            ...prev,
            isProfileModalActive: true
        }));
    };

    return (
        <div className="account-info">
            <div className="flex items-center gap-x-4">
                <div className="w-[46px] h-[46px] rounded-full relative overflow-hidden cursor-pointer">
                    {/* foto de perfil de usuario */}
                    { photoUrl ? (
                        <Image
                            src={photoUrl}
                            alt="user profile photo"
                            fill
                            sizes="100%"
                        />
                    ) : (
                        <div className="w-full h-full rounded-full bg-white/30 flex items-center justify-center text-2xl text-white">
                            <RiUser6Line/>
                        </div>
                    )}
                </div>
                {/* nome de usuario */}
                <p className="hidden sm:inline lg:hidden xl:inline font-normal text-neutral-400 font-raleway text-[19px]">
                    Olá, <span className="font-bold text-white">{name}</span>
                </p>
            </div>

            {/* menu com opções para gerenciamento da conta */}
            <div className="dropdown">
                <ul className="flex flex-col gap-y-5 px-4 py-4 font-semibold bg-darkpurple rounded-md mt-8">
                    {/* editar perfil */}
                    <li 
                        className="cursor-pointer"
                        onClick={openProfileModal}>
                        Editar perfil
                    </li>
                    <li className="w-full rounded-xl h-px bg-white/20"></li>
                    
                    {/* desconectar conta */}
                    <li 
                        className="bg-white/20 hover:bg-white/20 px-3 btn rounded-lg flex items-center justify-start gap-x-4 text-sm cursor-pointer text-white w-48"
                        onClick={signOut}>
                        { isSigningOut ? (
                            <>Desconectando <span className="loading loading-bars loading-md"/></>
                        ) : (
                            <><TbLogout2 className="text-xl"/>Sair</>
                        )}
                    </li>

                    {/* encerrar conta */}
                    <li 
                        className="bg-red-800 btn hover:bg-red-800 px-3 rounded-lg flex items-center justify-start gap-x-4 text-sm cursor-pointer w-48 text-white"
                        onClick={deleteAccount}>
                        { isClosingAccount ? (
                            <>Encerrando conta <span className="loading loading-bars loading-md"/></>
                        ) : (
                            <><AiOutlineDelete className="text-xl"/> Excluir conta</>
                        )}
                    </li>
                </ul>
            </div>
        </div>
    );
};