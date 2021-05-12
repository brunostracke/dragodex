import React, { useEffect } from 'react';
import { Button } from '../../src/components/Button';
import { Error } from '../../src/components/Error';
import { NavBar } from '../../src/components/NavBar';
import api from '../../src/services/api';
import styles from '../../src/styles/pages/Details.module.css';

export default function Details() {

    const [index, setIndex] = React.useState(0);
    const [dragon, setDragon] = React.useState({});
    const [name, setName] = React.useState('');
    const [type, setType] = React.useState('');
    const [histories, setHistories] = React.useState('');
    const [readOnlyMode, setReadOnlyMode] = React.useState(true);
    const [deleteMode, setDeleteMode] = React.useState(false);
    const [hasError, setHasError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');

    useEffect(() => {
        setIndex(localStorage.getItem("id"));
    })

    useEffect(() => {
        if (index !== 0) {
            api.get(`${index}/`)
                .then((res) => {
                    setDragon(res.data);
                    setName(res.data.name);
                    setType(res.data.type);
                    setHistories(res.data.histories);
                })
                .catch((error) => {
                    console.log(error.message);
                    setErrorMessage(error.message);
                    setHasError(true);
                });
        }
    }, [index])


    function handleSaveButton() {
        api.put(`${index}/`, { name: name, type: type, histories: histories })
            .then(() => {
                setReadOnlyMode(true);
            })
            .catch((error) => {
                console.log(error.message);
                setErrorMessage(error.message);
                setHasError(true);
            });
    }

    function handleCancelEditButton() {
        setHistories(dragon.histories);
        setName(dragon.name);
        setType(dragon.type);
        setReadOnlyMode(true);
    }

    function deleteDragon() {
        api.delete(`${index}/`)
            .catch((error) => {
                console.log(error.message);
                setErrorMessage(error.message);
                setHasError(true);
            });
    }

    function handleCancelDeleteButton() {
        setDeleteMode(false)
    }

    return (
        <>
            <NavBar />
            {hasError && <Error value={errorMessage} />}
            <div className={styles.container}>
                <h2>DETALHES DO DRAGÃO</h2>
                <form>
                    <div className={styles.inputForm}>
                        <label>Name: </label>
                        <input
                            className={styles.inputName}
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                            readOnly={readOnlyMode}
                        ></input>

                        <label>Type: </label>
                        <input
                            id="type"
                            type="text"
                            value={type}
                            onChange={(e) => {
                                setType(e.target.value);
                            }}
                            readOnly={readOnlyMode}
                        ></input>

                        <label>Histories: </label>
                        <textarea
                            id="histories"
                            value={histories}
                            onChange={(e) => {
                                setHistories(e.target.value)
                            }}
                            readOnly={readOnlyMode}
                        ></textarea>

                    </div>

                    {readOnlyMode &&
                        <div className={styles.optionButtons}>
                            <Button
                                value="EDITAR"
                                color={"var(--blue)"}
                                onClick={() => setReadOnlyMode(false)}
                            />

                            <Button
                                value="DELETAR"
                                color={"var(--red)"}
                                onClick={() => setDeleteMode(true)}
                            />
                        </div>}

                    {!readOnlyMode &&
                        <div className={styles.editButtons}>
                            <Button
                                color={"var(--green)"}
                                value="SAVE"
                                onClick={handleSaveButton}
                            />
                            <Button
                                value="CANCEL"
                                color={"var(--red)"}
                                onClick={handleCancelEditButton}
                            />
                        </div>}
                </form>
                {deleteMode &&
                    <div className={styles.deleteCard}>
                        <p>Tem certeza que deseja deletar?</p>
                        <div className={styles.deleteCardButtons}>
                            <Button
                                value="CONFIRMAR"
                                color={"var(--green)"}
                                onClick={deleteDragon}
                            />
                            <Button
                                value="CANCELAR"
                                color={"var(--red)"}
                                onClick={handleCancelDeleteButton}
                            />
                        </div>
                    </div>}
            </div>
        </>
    );
}

