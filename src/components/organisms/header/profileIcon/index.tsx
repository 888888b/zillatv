// hooks
import { useContext, useState } from "react";
// import useFirebase from "@/components/hooks/firebase";

// contextos
import { UserDataContext } from "@/contexts/authenticationContext";
// import { GlobalEventsContext } from "@/contexts/globalEventsContext";

// icones
// import { TbLogout2 } from "react-icons/tb";
// import { AiOutlineDelete } from "react-icons/ai";
import { RiUser6Line } from "react-icons/ri";

// componentes
import Image from "next/image";

import './styles.css';

export default function ProfileIcon() {

    // const [ isClosingAccount, setIsClosingAccount ] = useState( false );
    // const [ isSigningOut, setIsSigningOut ] = useState( false );

    // dados do usuario
    const {
        photoUrl,
        name
    } = useContext( UserDataContext );

    // ações de usuario
    // const {
    //     deleteCurrentUser,
    //     signOutUser
    // } = useFirebase();

    // controlador de modais
    // const {
    //     dispatch
    // } = useContext( GlobalEventsContext );

    // desconecta o usurio atual
    // const signOut = async () => {
    //     setIsSigningOut( true );
    //     await signOutUser();
    //     setIsSigningOut( false );
    // };

    // encerrar conta do usuario
    // const deleteAccount = async () => {
    //     setIsClosingAccount( true );
    //     await deleteCurrentUser();
    //     setIsClosingAccount( false );
    // };

    // const openProfileModal = () => {
    //     dispatch({type: 'IS_PROFILE_MODAL_ACTIVE', payload: true});
    // };

    return (
        <div className="account-info">
            <div className="flex items-center gap-x-3">
                <div className="w-12 h-12 rounded-full relative overflow-hidden cursor-pointer">
                    {/* foto de perfil de usuario */}
                    { photoUrl ? (
                        <Image
                            src={photoUrl}
                            alt="user profile photo"
                            fill
                            sizes="100%"
                        />
                    ) : (
                        <div className="w-full h-full rounded-full bg-secondary/10 flex items-center justify-center text-2xl text-secondary">
                            <RiUser6Line/>
                        </div>
                    )}
                </div>
                {/* nome de usuario */}
                { name &&
                    <p className="hidden sm:flex lg:hidden xl:flex font-normal text-text font-raleway text-xl xl:text-lg items-center gap-x-1">
                        Olá, 
                        <span 
                        className="font-bold text-secondary max-w-32 line-clamp-1 truncate">
                        {name.split(' ')[0]}
                        </span>
                    </p>
                }
            </div>
        </div>
    );
};