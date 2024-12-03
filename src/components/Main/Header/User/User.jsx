import styles from './User.module.css';

function User({userName}) {
    return (
        <button className={styles.userBtn}>
            <p className={styles.userName}>{userName}</p>
            {/*<img className={styles.userAvatar} src="#" alt="User avatar"/>*/}
        </button>
    );
}

export default User;