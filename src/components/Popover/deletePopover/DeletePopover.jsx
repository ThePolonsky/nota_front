import styles from './DeletePopover.module.css';
import cn from 'classnames';

function DeletePopover({title, deleteItem, handleClose, item}) {



    return (
        <div className={styles.agreementOnDelete}>
            <span>Delete {item} &#34;{title}&#34;?</span>
            <div className={styles.agreementOnDeleteButtons}>
                <button className={cn(styles.popoverBtn, styles.agreementBtn, styles.green)}
                        onClick={deleteItem}>Delete
                </button>
                <button className={cn(styles.popoverBtn, styles.agreementBtn, styles.red)}
                        onClick={handleClose}>Cancel
                </button>
            </div>
        </div>
    );
}

export default DeletePopover;