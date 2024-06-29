import React, {ReactNode} from 'react';
import styles from './Layout.module.css';

interface IProps {
    children: ReactNode;
}

const Layout = (props: IProps) => {
    const {children} = props;
    return (
        <div className={styles.container}>
            {children}
        </div>
    );
}

export default Layout;