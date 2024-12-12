import styles from './NotebookCard.module.css';
import NoteCard from '../NoteCard/NoteCard.jsx';
import {useContext, useState} from 'react';
import {PopoverContext} from '../../../context/popover.context.js';
import axios from 'axios';
import OptionsButton from '../Buttons/OptionsButton/OptionsButton.jsx';
import AddNewButton from '../Buttons/AddNewButton/AddNewButton.jsx';
import {UserContext} from '../../../context/user.context.js';
import {TabsContext} from '../../../context/tabs.context.js';

function NotebookCard({ notebook, tables, notebooks, notes, setTables, setNotebooks, setNotes }) {

    const { userId } = useContext(UserContext);
    const { tabs, setTabs, selectedTabIndex, setSelectedTabIndex } = useContext(TabsContext);
    const { setPopoverType, setPopoverData } = useContext(PopoverContext);

    const addNewNote = async () => {
        const notebookId = notebook.id;
        try {
            const response = await axios.post('http://localhost:3000/api/notes/create-note', {
                userId,
                notebookId
            });
            const newNote = response.data;
            newNote.notebookId = notebookId;
            newNote.content = '<div></br></div>';
            setNotes(prevNotes => [...prevNotes, newNote]);
        } catch (error) {
            console.error(error);
        }
    };

    //e|---------POPOVERS---------|

    const openNotebookOptionsPopover = (e) => {
        setPopoverType('options');
        setPopoverData({
            openRename: openRename,
            openAgreementOnDelete: openAgreementOnDeleteNotebook,
            position: e
        });
    };

    //w|------RENAME------|

    const openRename = () => {
        setPopoverType('rename');
        setPopoverData({
            title: notebook.title,
            saveNewTitle: saveNewTitle
        });
    };

    const saveNewTitle = async () => {
        const notebookId = notebook.id;
        const newTitle = document.getElementById('renameTitleInput').value;
        const newNotebooks = [...notebooks];
        const currentNotebook = newNotebooks.find(notebook => notebook.id === notebookId);
        try {
            const response = await axios.put('http://localhost:3000/api/notebooks/rename-notebook', {
                notebookId,
                newTitle
            });
            console.log(response.data);
            currentNotebook.title = newTitle;
            setNotebooks(newNotebooks);
            setPopoverType(null);
        } catch (error) {
            console.error(error);
        }
    };

    //w|------DELETE------|

    const openAgreementOnDeleteNotebook = () => {
        setPopoverType('delete');
        // setIdForPopover(tableId);
        setPopoverData({
            title: notebook.title,
            deleteItem: deleteNotebook,
            item: 'notebook'
        });
    };

    const deleteNotebook = async () => {
        const notebookId = notebook.id;
        try {
            const response = await axios.delete('http://localhost:3000/api/notebooks/delete-notebook', {
                params: {
                    notebookId: notebookId
                }
            });
            setNotebooks(prevNotebooks => prevNotebooks.filter((item) => item.id !== notebookId));
            setPopoverType(null);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={styles.notebookCard} notebook_id={notebook.id}>
            <div className={styles.notebookHead}>
                <img className={styles.notebookIcon} src="/public/notebookIcon.svg" alt="notebook icon"/>
                <span>{notebook.title}</span>
                <div className={styles.notebookCardButtons}>
                    <OptionsButton
                        openOptionsPopover={openNotebookOptionsPopover}
                    />
                    <AddNewButton
                        addNewItem={addNewNote}
                        item={'notebook'}
                    />
                </div>
            </div>
            {notes.map((note, index) => {
                if (note.notebookId === notebook.id) {
                    return (
                        <NoteCard
                            key={index}
                            note={note}
                            tables={tables}
                            notebooks={notebooks}
                            notes={notes}
                            setTables={setTables}
                            setNotebooks={setNotebooks}
                            setNotes={setNotes}
                        />
                    );
                }
            })}
        </div>
    );
}

export default NotebookCard;