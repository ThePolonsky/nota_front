import styles from './NoteCard.module.css';

function NoteCard({id, title}) {



    return (
        <div className={styles.noteCard} note_id={id}>
            <div className={styles.noteCardHover}>
                <img className={styles.noteIcon} src="/public/noteIcon.svg" alt="note icon"/>
                <span>{title}</span>
            </div>
        </div>
    );
}

export default NoteCard;
