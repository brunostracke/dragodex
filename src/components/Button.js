import React from 'react';
import styles from '../styles/components/Button.module.css';

export function Button (props) {
  return (
    <input
      type="button"
      className={styles.button}
      style={{backgroundColor: props.color}}
      value={props.value}
      onClick={props.onClick}
    />
  );
}