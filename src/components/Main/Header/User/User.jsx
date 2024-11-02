import styles from './User.module.css';

function User(props) {
    return (
        <button className={styles.userBtn}>
            <p className={styles.userName}>User Name</p>
            {/*<img className={styles.userAvatar} src="#" alt="User avatar"/>*/}
        </button>
    );
}

export default User;