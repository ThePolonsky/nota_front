import styles from './OptionsPopover.module.css';

function OptionsPopover({openRename, openAgreementOnDelete}) {



    return (
        <div className={styles.optionsPopover}>
            <button className={styles.popoverBtn} onClick={openRename}>Rename</button>
            <button className={styles.popoverBtn} onClick={openAgreementOnDelete}>Delete</button>
        </div>
    );
}

export default OptionsPopover;