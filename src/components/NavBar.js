import React, { useContext, useEffect } from 'react';
import styles from '../styles/components/NavBar.module.css';
import { useRouter } from 'next/router';

export function NavBar() {

    const [user, setUser] = React.useState('');

    const router = useRouter();

    useEffect(() => {
        setUser(localStorage.getItem("user"));
    }, [])

    return (
        <header className={styles.navbar}>
            <div
                className={styles.logoName}
                onClick={(e) => {
                    e.preventDefault();
                    router.push('/home');
                }}
            >
                <img
                    src="/dragonlogo blue small.png"
                    alt="dragon logo"
                />
                <input
                    type="button"
                    value="D &bull; R &bull; A &bull; G &bull; O &bull; D &bull; E &bull; X"
                />
            </div>
            <div className={styles.logo}>
                <img
                    src="/dragonlogo blue small.png"
                    alt="dragon logo"
                />
            </div>

            <div className={styles.menu}>
                <h1>Olá {user}!</h1>
                <div className={styles.menuOptions}>

                    <input
                        type="button"
                        value="INÍCIO"
                        className={styles.button}
                        onClick={(e) => {
                            e.preventDefault();
                            router.push('/home')
                        }}
                    />
                    <input
                        type="button"
                        value="CADASTRAR"
                        className={styles.button}
                        onClick={(e) => {
                            e.preventDefault();
                            router.push('/newdragon')
                        }}
                    />
                    <input
                        type="button"
                        value="SAIR"
                        className={styles.button}
                        onClick={(e) => {
                            e.preventDefault();
                            localStorage.clear();
                            router.push('/')
                        }}
                    />
                </div>
            </div>
        </header>
    );
}