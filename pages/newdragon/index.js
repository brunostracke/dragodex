import React from 'react';
import { NavBar } from '../../src/components/NavBar';
import { Button } from '../../src/components/Button';
import api from '../../src/services/api';
import styles from '../../src/styles/pages/NewDragon.module.css';
import { useRouter } from 'next/router';
import { Error } from '../../src/components/Error';

export default function NewDragon() {

    const [name, setName] = React.useState('');
    const [type, setType] = React.useState('');
    const [histories, setHistories] = React.useState('');
    const [savedAlert, setSavedAlert] = React.useState(false);
    const [hasError, setHasError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');

    const router = useRouter();

    function handleInputName(e) {
        setName(e.target.value);
    }

    function handleInputType(e) {
        setType(e.target.value);
    }

    function handleInputHistories(e) {
        setHistories(e.target.value);
    }

    function clearForm() {
        setType('');
        setName('');
        setHistories('');
    }

    function saveDragon() {
        api.post('/', { name, type, histories })
            .then(() => {
                showAlert();
                clearForm();
            })
            .catch((error) => {
                console.log(error.message);
                setErrorMessage(error.message);
                setHasError(true);
            });
    }

    function showAlert() {
        setSavedAlert(true)
        setTimeout(() => {
            setSavedAlert(false);
        }, 3000)
    }

    return (
        <>
            <NavBar />
            {hasError && <Error value={errorMessage} />}
            <div className={styles.container}>
                <h2>CADASTRAR DRAGÃO</h2>
                <form className={styles.inputForm}>
                    <label>Name: </label>
                    <input
                        value={name}
                        onChange={handleInputName}
                    ></input>
                    <label>Type: </label>
                    <input
                        value={type}
                        onChange={handleInputType}
                    ></input>
                    <label>Histories: </label>
                    <textarea
                        value={histories}
                        onChange={handleInputHistories}
                    ></textarea>

                    {savedAlert && <h4>Dragão salvo com sucesso!</h4>}

                    <div className={styles.saveButtons}>
                        <Button
                            value="SAVE"
                            color={"var(--blue)"}
                            onClick={saveDragon}
                        />
                        <Button
                            value="CANCEL"
                            color={"var(--red)"}
                            onClick={() => router.push('/home/')}
                        />
                    </div>
                </form>

            </div>
        </>
    );
}