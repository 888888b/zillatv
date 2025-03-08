'use client';

// Hooks
import { 
    useContext, 
    useEffect, 
    useRef, 
    useState,
    useCallback 
} from "react";

// icones
import { IoClose } from "react-icons/io5";

// Contextos
import { GlobalEventsContext } from "../../contexts/globalEventsContext";
import { UserDataContext } from "../../contexts/authenticationContext";

// Modulos do Swiper.js para carousel de slides
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import { Navigation } from "swiper/modules";
import 'swiper/css';
import 'swiper/element/css/navigation';

// componentes
import Profile from "./profile";
import EditName from "./editName";
import EditEmail from "./editEmail";

export default function ProfileModal() {

    // controle do modal de perfil
    const {
        isProfileModalActive,
        dispatch,
        errors
    } = useContext( GlobalEventsContext );

    const userData = useContext( UserDataContext );
    const checkboxInputRef = useRef<(HTMLInputElement | null)>( null );
    const swiperRef = useRef<(SwiperRef | null )>( null );
    const [ nextSlide, setNextSlide ] = useState<(string | null)>( null );

    // Simula um click para o input que exibe/esconde o modal de regitro
    const checkboxToggle = () => {
        if ( checkboxInputRef.current ) {
            if ( isProfileModalActive ) {
                checkboxInputRef.current.checked = true;
                return;
            };

            checkboxInputRef.current.checked = false;
        };
    };

    const scrollToFirstSlide = () => {
        setTimeout(() => {
            swiperRef.current && swiperRef.current.swiper.slideTo(0);
            setNextSlide( null );
        }, 300);
    };

    const swiperControllers = useCallback(( slideTo: string ) => {
        if ( slideTo === 'next-slide' ) {
            swiperRef.current && swiperRef.current.swiper.slideNext();
            return;
        };

        swiperRef.current && swiperRef.current.swiper.slidePrev();
    }, [ swiperRef ]);

    useEffect(() => {
        checkboxToggle();
    }, [ isProfileModalActive ]);

    useEffect(() => {
        scrollToFirstSlide;
    }, [ userData.name ]);

    return (
        <>
            {/* Input que controla a abertura/fechamento do modal */}
            <input ref={checkboxInputRef} type="checkbox" id="my_modal_7" className="modal-toggle" />

            <div className="modal font-noto_sans" role="dialog">
                <div className="relative max-w-[calc(100vw-32px)] w-[500px] bg-darkpurple rounded-xl">
                    {/* Conteudo do modal */}
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={0}
                            speed={300}
                            allowTouchMove={false}
                            navigation={{
                                nextEl: '.next-step',
                                prevEl: '.prev-step'
                            }}
                            modules={[Navigation]}
                            ref={swiperRef}
                        >
                            {/* Perfil do usuario com imagem, nome e email */}
                            <SwiperSlide>
                                <Profile 
                                    nextSlide={setNextSlide}
                                    slideTo={swiperControllers}
                                />
                            </SwiperSlide>

                            <SwiperSlide>
                                { nextSlide === 'editName' && <EditName slideTo={swiperControllers}/> }
                                
                                { userData.email && (
                                    nextSlide === 'editEmail' && <EditEmail slideTo={swiperControllers}/>
                                )}
                            </SwiperSlide>
                        </Swiper>
                    {/* Botão de fechamento do modal */}
                    <button 
                        onClick={() => dispatch({type:'IS_PROFILE_MODAL_ACTIVE', payload: false})} 
                        className="modal-actio bg-darkslateblue w-10 h-10 rounded-full flex items-center justify-center absolute top-0 right-0 -translate-y-1/3 translate-x-1/3 z-10 cursor-pointer border-none outline-none">
                        <IoClose className='text-xl' />
                    </button>
                </div>
            </div>
        </>
    );;
};