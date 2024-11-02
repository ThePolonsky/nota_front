import styles from './NoteBody.module.css';
import {useEffect, useState} from 'react';
import NoteContent from '../NoteContent/NoteContent.jsx';
import ContentEditable from 'react-contenteditable';

function NoteBody() {

    const note = {
        title: 'Note title',
        updateDate: new Date().toLocaleString('en-US'),
        content: `<div>Note text area</div>
            <div>Note content</div>`
    };

    const [isSaved, setIsSaved] = useState(true);
    const [content, setContent] = useState(note.content);
    const [noteTitle, setNoteTitle] = useState(note.title);

    const handleChange = () => {
        setIsSaved(false);
        setNoteTitle(document.getElementById('contentEditable').innerHTML);
        // setContent(noteContent);
    };

    useEffect(() => {
        let timerId;
        timerId = setTimeout(() => {
            setIsSaved(true);
        },2000);
        return () => {
            clearTimeout(timerId);
        };
    }, [content, noteTitle]);

    return (
        <section className={styles.noteBody}>
            <div className={styles.noteBodyHeader}>
                <ContentEditable
                    className={styles.noteTitle}
                    html={noteTitle}
                    onChange={handleChange}
                    tagName="span"
                />
                {/*<span */}
                {/*    className={styles.noteTitle}*/}
                {/*>{note.title}</span>*/}
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