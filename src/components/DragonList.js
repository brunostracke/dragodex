import React, { useEffect } from 'react';
import styles from '../styles/components/DragonList.module.css';
import { useRouter } from 'next/router';
import api from '../services/api';
import { Error } from './Error';

export function DragonList() {

    const router = useRouter();

    const [dragons, setDragons] = React.useState([]);
    const [nome, setNome] = React.useState('');
    const [hasError, setHasError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');

    useEffect(() => {
        api.get('/')
            .then((res) => {
                setDragons(res.data.sort(compare));
            })
            .catch((error) => {
                console.log(error.message);
                setErrorMessage(error.message);
                setHasError(true);
            });
    }, [])

    function compare(a, b) {
        if (a.name < b.name) {
            return -1
        }
        if (a.name > b.name) {
            return 1
        }
        return 0
    }

    return (
        <div className={styles.container}>
            {hasError && <Error value={errorMessage} />}
            <input
                type="text"
                placeholder="Pesquise seu dragão aqui..."
                className={styles.searchBar}
                onChange={(e) => {
                    setNome(e.target.value)
                }}
            />

            <ul className={styles.list}>
                {dragons.map((dragon) =>
                (dragon.name.toUpperCase().includes(nome.toUpperCase()) &&
                    <li
                        key={dragon.id}
                        className={styles.listItems}
                    >
                        {dragon.name}
                        <input
                            type="button"
                            value="DETALHES"
                            onClick={() => {
                                localStorage.setItem("id", dragon.id);
                                router.push('/details')
                            }}
                        />
                    </li>
                ))}
            </ul>
        </div>

    );

}
