import styles from './LeftPanel.module.css';

function LeftPanel({children}) {



    return (
        <aside className={styles.LeftPanel}>
            {children}
        </aside>
    );
}

export default LeftPanel;