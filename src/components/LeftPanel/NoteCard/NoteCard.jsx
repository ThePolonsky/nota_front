import styles from './NoteCard.module.css';
import OptionsButton from '../Buttons/OptionsButton/OptionsButton.jsx';
import axios from 'axios';
import {useContext, useState} from 'react';
import {PopoverContext} from '../../../context/popover.context.js';
import {UserContext} from '../../../context/user.context.js';
import {TabsContext} from '../../../context/tabs.context.js';

function NoteCard({note, tables, notebooks, notes, setTables, setNotebooks, setNotes}) {

    const {userId} = useContext(UserContext);
    const {tabs, setTabs, selectedTabIndex, setSelectedTabIndex} = useContext(TabsContext);
    const {setPopoverType, setPopoverData} = useContext(PopoverContext);

    //e|---------POPOVERS---------|

    const openNoteOptionsPopover = (e) => {
        setPopoverType('options');
        setPopoverData({
            openRename: openRename,
            openAgreementOnDelete: openAgreementOnDeleteNote,
            position: e
        });
    };

    //w|------RENAME------|

    const openRename = () => {
        setPopoverType('rename');
        setPopoverData({
            title: note.title,
            saveNewTitle: saveNewTitle
        });
    };

    const saveNewTitle = async () => {
        const noteId = note.id;
        const newTitle = document.getElementById('renameTitleInput').value;
        const currentNote = notes.find(note => note.id === noteId);
        // const index = [...notes].indexOf(currentNote);
        try {
            const response = await axios.put('http://localhost:3000/api/notes/rename-note', {
                noteId,
                newTitle
            });
            console.log(response.data);
            currentNote.title = newTitle;
            setPopoverType(null);
        } catch (error) {
            console.error(error);
        }
    };

    //w|------DELETE------|

    const openAgreementOnDeleteNote = () => {
        setPopoverType('delete');
        setPopoverData({
            title: note.title,
            deleteItem: deleteNote,
            item: 'note'
        });
    };

    const deleteNote = async () => {
        const noteId = note.id;
        try {
            await axios.delete('http://localhost:3000/api/notes/delete-note', {
                params: {
                    noteId: noteId
                }
            });
            setNotes(prevNotes => prevNotes.filter((item) => item.id !== noteId));
            setPopoverType(null);
            closeInTab();
        } catch (error) {
            console.error(error);
        }
    };

    const closeInTab = () => {
        const newTabs = [...tabs];
        const tabsWithNote = newTabs.filter(tab => tab.noteId === note.id);
        if (tabsWithNote) {
            tabsWithNote.forEach((item) => {
                item.noteId = null;
            });
            setTabs(newTabs);
        }
    };

    //e|---------SELECT NOTE---------|

    const selectNote = () => {
        const noteId = note.id;
        if (tabs.length === 0) {
            const newTab = {noteId: noteId};
            const newTabs = [newTab];
            setTabs(newTabs);
            setSelectedTabIndex(0);
        } else {
            const newTabs = [...tabs];
            newTabs[selectedTabIndex].noteId = noteId;
            setTabs(newTabs);
        }
    };

    return (
        <div className={styles.noteCard} note_id={note.id}>
            <div className={styles.noteCardHover} onClick={selectNote}>
                <img className={styles.noteIcon} src="/public/noteIcon.svg" alt="note icon"/>
                <span>{note.title}</span>
                <div className={styles.noteCardButtons}>
                    <OptionsButton
                        openOptionsPopover={(e) => {
                            e.stopPropagation();
                            openNoteOptionsPopover(e);
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default NoteCard;
