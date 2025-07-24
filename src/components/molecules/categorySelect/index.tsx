// hooks
import { memo, useCallback } from 'react';
// tipos
import { tmdbObjProps } from '@/contexts/tmdbContext';
// componentes
import { ActionMeta} from 'react-select';
import dynamic from 'next/dynamic';
const Select = dynamic(() => import('react-select'), { ssr: false });

import './styles.css';


type ComponentProps = {
    onSelectGenre: (genre: string) => void
    genresList: tmdbObjProps;
};

type Option = { value: string, label: string };

const GenreSelect = memo((props: ComponentProps) => {

    const { genresList, onSelectGenre } = props;
    const selectList = Object.values(genresList);
    const options: Option[] = selectList.map(option => ({
        value: option.genre as string,
        label: option.title as string
    }));

    const onSelect = useCallback((values: unknown, actionMeta: ActionMeta<unknown>) => {
        const options = values as Option
        onSelectGenre(options.value);
    }, []);

    return (
        <div className='flex flex-col items-center sm:items-start'>
            <h3 className='font-medium text-text text-base mb-1'>Gênero</h3>
            <Select
                options={options}
                styles={{
                    control: (styles, state) => ({
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: 'fit-content',
                        minWidth: '250px',
                        height: '48px',
                        borderRadius: '8px',
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        borderColor: state.isFocused ? 'var(--color-secondary)' : 'color-mix(in oklab, var(--color-secondary) 20%, transparent)',
                        backgroundColor: 'transparent',
                        transition: 'border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        ":hover": {
                            borderColor: 'var(--color-secondary)'
                        },
                        color: 'var(--color-secondary)',
                        zIndex: '20',
                        padding: '0 10px',
                        cursor: 'pointer',
                    }),
                    option: (styles, state) => ({
                        fontWeight: state.isSelected ? '600' : '500',
                        fontSize: '16px',
                        height: '48px',
                        padding: '0 20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'start',
                        cursor: 'pointer',
                        transition: 'all 0.1s cubic-bezier(0.4, 0, 0.2, 1)',
                        backgroundColor: state.isSelected ? 'color-mix(in oklab, var(--color-primary) 100%, transparent)' : 'transparent',
                        color: state.isSelected ? 'var(--color-accent)' : 'var(--color-text)',
                        ":hover": {
                            backgroundColor: 'var(--color-primary)',
                            color: 'var(--color-accent)',
                            fontWeight: '600'
                        },
                    }),
                    menu: (styles) => ({
                        ...styles,
                        width: 'calc(100vw - 40px)',
                        maxWidth: '400px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: '50',
                        borderRadius: '8px',
                        overflowX: 'hidden',
                        marginTop: '10px',
                        padding: 'none',
                        backgroundColor: 'var(--color-surface)',
                        border: '1px solid var(--color-secondary)',
                        '@media screen and (width >= 640px)': {
                           left: '0',
                           transform: 'none'
                        }
                    }),
                    singleValue: (styles) => ({
                        ...styles,
                        font: '500 18px var(--font-inter)',
                        color: 'var(--color-secondary)'
                    })
                }}
                defaultValue={options[0]}
                onChange={onSelect}
                isSearchable={false}
            />
        </div>
    );
});

GenreSelect.displayName = 'GenreSelect';
export default GenreSelect;