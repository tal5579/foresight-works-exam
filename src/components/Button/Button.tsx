import React from 'react';
import styles from './Button.module.css';

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
};

const Button = (props: IProps) => {
    const { label } = props;

    return (
        <button className={styles.button} {...props}>{label}</button>
    )
}

export default Button;