import React from 'react';
import styles from '../../src/styles/components/Error.module.css';

export function Error(props) {
  return (
    <>
      <div className={styles.container}>
        <h3>Ops, algo deu errado :(</h3>
        <p>{props.value}</p>
        <input
          type="button"
          value="Atualizar página"
          onClick={() => {
            window.location.reload();
          }}
        />
      </div>
    </>
  );
}