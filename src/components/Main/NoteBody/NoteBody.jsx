import styles from './NoteBody.module.css';
import {useEffect, useState} from 'react';
import NoteContent from '../NoteContent/NoteContent.jsx';

function NoteBody() {

    const note = {
        title: 'Note title',
        updateDate: new Date().toLocaleString('en-US'),
        content: `<div>Note text area</div>
            <div>Note content</div>`
    };

    const [isSaved, setIsSaved] = useState(true);
    const [content, setContent] = useState(note.content);

    useEffect(() => {
        let timerId;
        timerId = setTimeout(() => {
            setIsSaved(true);
        },2000);
        return () => {
            clearTimeout(timerId);
        };
    }, [content]);

    return (
        <section className={styles.noteBody}>
            <div className={styles.noteBodyHeader}>
                <span className={styles.noteTitle}>{note.title}</span>
                <div className={styles.noteInfo}>
                    <span>Last update</span>
                    <span>{note.updateDate}</span>
                </div>
            </div>
            <div className={styles.divider}></div>
            <NoteContent
                content={note.content}
                setContent={setContent}
                setIsSaved={setIsSaved}
            />
        </section>
    );
}

export default NoteBody;