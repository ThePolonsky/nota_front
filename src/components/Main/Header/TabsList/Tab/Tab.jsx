import styles from './Tab.module.css';

function Tabs({id, selectedTabId}) {
    
    const closeTabIcon = () => {
        if (selected) {
            return (
                <img src="/closeTabIconDark.svg" alt="close tab button"/>
            );
        } else {
            return (
                <img src="/closeTabIconWhite.svg" alt="close tab button"/>
            );
        }
    };
    
    return (
        <button className={styles.tab}>
            <p></p>
            <button className={styles.closeTabBtn}>
                {() => closeTabIcon()}
            </button>
        </button>
    );
}

export default Tabs;