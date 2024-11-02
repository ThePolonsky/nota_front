import styles from './LeftPanelHeader.module.css';

function LeftPanelHeader() {
    return (
        <div className={styles.leftPanelHeader}>
            <button className={styles.openPanelBtn}>
                <img src="/public/closePanelIcon.svg" alt="open panel"/>
            </button>
        </div>
    );
}

export default LeftPanelHeader;