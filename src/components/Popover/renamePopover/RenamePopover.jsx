import styles from './RenamePopover.module.css';
import cn from 'classnames';

function RenamePopover({title, saveNewTitle, handleClose}) {
    return (
        <div className={styles.rename}>
            <input autoFocus={true} type={'text'} className={styles.renameTitle} id={'renameTitleInput'}
                   defaultValue={title} onKeyDown={(e) => {
                if (e.key === 'Enter') saveNewTitle();
                if (e.key === 'Escape') handleClose();
                console.log(e.key);
            }}>
            </input>
            <div className={styles.tableRenameButtons}>
                <button className={cn(styles.popoverBtn, styles.agreementBtn, styles.green)}
                        onClick={saveNewTitle}>Save
                </button>
                <button className={cn(styles.popoverBtn, styles.agreementBtn, styles.red)}
                        onClick={handleClose}>Cancel
                </button>
            </div>
        </div>
    );
}

export default RenamePopover;