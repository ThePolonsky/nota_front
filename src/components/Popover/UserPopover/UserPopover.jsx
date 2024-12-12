import styles from './UserPopover.module.css';

function UserPopover({user}) {

    return (
        <div className={styles.userPopoverBtnsList}>
            <button className={styles.userAddAccountBtn}>Add account</button>
            <div className={styles.divider}></div>
            <button className={styles.userPopoverSignOutBtn}>Sign out</button>
        </div>
    );
}

export default UserPopover;