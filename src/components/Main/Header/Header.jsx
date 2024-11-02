import styles from './Header.module.css';
import {useState} from 'react';

function Header({children}) {



    return (
        <header className={styles.header}>
            {children}
        </header>
    );
}

export default Header;