import styles from './NoteBody.module.css';
import {useEffect, useState} from 'react';
import ContentEditable from 'react-contenteditable';

function NoteBody({selectedNote}) {

    const note = {
        title: 'Note title',
        updateDate: new Date().toLocaleString('en-US'),
        content: `<div>Note text area</div>
            <div>Note content</div>`
    };

    const [isSaved, setIsSaved] = useState(true);
    const [content, setContent] = useState(selectedNote.content);
    const [noteTitle, setNoteTitle] = useState(selectedNote.title);
    const [updatedAt, setUpdatedAt] = useState(selectedNote.updatedAt);


    const handleChange = () => {
        setIsSaved(false);
        setNoteTitle(document.getElementById('noteTitle').innerHTML);
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
        <section className={styles.noteBody} id={'noteBody-' + selectedNote.id}>
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
                    <span>{selectedNote.toLocaleString('en-US')}</span>
                </div>
            </div>
            <div className={styles.divider}></div>
            {/*<NoteContent*/}
            {/*    content={note.content}*/}
            {/*    setContent={setContent}*/}
            {/*    setIsSaved={setIsSaved}*/}
            {/*/>*/}
            <ContentEditable
                className={styles.contentEditable}
                id={'contentEditable'}
                html={content}
                onChange={handleChange}
                tagName="div"
            />
        </section>
    );
}

export default NoteBody;