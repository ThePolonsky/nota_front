import styles from './NotebookCard.module.css';
import NoteCard from '../NoteCard/NoteCard.jsx';

function NotebookCard({title, id, notes}) {



    return (
        <div className={styles.notebookCard} notebook_id={id}>
            <div className={styles.notebookCardHeadHover}>
                <img className={styles.notebookIcon} src="/public/notebookIcon.svg" alt="notebook icon"/>
                <span>{title}</span>
                <button className={styles.addNewNote}>
                    <img src="/public/littlePlusIcon.svg" alt="add new private notebook"/>
                </button>
            </div>
            {notes.map((note, index) => {
                return (
                    <NoteCard
                    key={index}
                    id={note.id}
                    title={note.noteTitle}
                    />
                );
            })}
        </div>
    );
}

export default NotebookCard;