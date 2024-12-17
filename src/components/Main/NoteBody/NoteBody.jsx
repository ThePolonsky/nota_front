import styles from './NoteBody.module.css';
import {useContext, useEffect, useState} from 'react';
import ContentEditable from 'react-contenteditable';
import {TabsContext} from '../../../context/tabs.context.js';
import {UserContext} from '../../../context/user.context.js';
import axios from 'axios';

function NoteBody({tab, tables, notebooks, notes, setTables, setNotebooks, setNotes}) {

    const {userId} = useContext(UserContext);

    const {tabs, setTabs, selectedTabIndex, setSelectedTabIndex} = useContext(TabsContext);

    const [isSaved, setIsSaved] = useState(true);
    const [content, setContent] = useState(notes.find(note => note.id === tab.noteId).content);
    const [noteTitle, setNoteTitle] = useState(notes.find(note => note.id === tab.noteId).title);
    const [updatedAt, setUpdatedAt] = useState(new Date(notes.find(note => note.id === tab.noteId).updatedAt));

    const handleChange = () => {
        setIsSaved(false);
        setNoteTitle(document.getElementById('noteTitle').value);
        setContent(document.getElementById('contentEditable').innerHTML);
    };

    useEffect(() => {
        let timerId;
        const newNotes = [...notes];
        const newNote = newNotes.find(note => note.id === tab.noteId);
        newNote.title = noteTitle;
        newNote.content = content;
        setNotes(newNotes);
        timerId = setTimeout(async () => {
            await saveChanges(tab.noteId, noteTitle, content);
            setIsSaved(true);
        }, 2000);
        return () => {
            clearTimeout(timerId);
        };
    }, [isSaved]);

    const saveChanges = async (noteId, newTitle, newContent) => {
        try {
            const response = await axios.put('http://localhost:3000/api/notes/save-changes', {
                userId, noteId, newTitle, newContent
            });
            console.log(response.data);
        } catch (error) {
            console.error('Произошла ошибка:', error);
            throw error;
        }
    };

    useEffect(() => {
        if (tabs[selectedTabIndex]?.noteId ?? false) {
            setContent(notes.find(note => note.id === tab.noteId).content);
            setNoteTitle(notes.find(note => note.id === tab.noteId).title);
            setUpdatedAt(new Date(notes.find(note => note.id === tab.noteId).updatedAt));
        }
    }, [tabs, selectedTabIndex, notes]);

    return (
        <section className={styles.noteBody}>
            <div className={styles.noteBodyHeader}>
                <input className={styles.noteTitle} id={'noteTitle'} value={noteTitle} onChange={handleChange}></input>
                <div className={styles.noteInfo}>
                    <div className={styles.noteInfoHead}>
                        <span>Last update</span>
                        {isSaved
                            ? (<div className={styles.indicatorSaved}></div>)
                            : (<div className={styles.indicatorNotSaved}></div>)
                        }
                    </div>
                    <span>{updatedAt.toLocaleString('en-US')}</span>
                </div>
            </div>
            <div className={styles.divider}></div>
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