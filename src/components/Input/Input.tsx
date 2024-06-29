import React from 'react';
import styles from './Input.module.css';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
};

const Input = (props: IProps) => {
    const { label } = props;

    return (
        <div className={styles.cotainer}>
            {label && <label className={styles.input_label} htmlFor={props.id}>{label}</label>}
            <input className={styles.input_container} {...props} />
        </div>
    )
}

export default Input;