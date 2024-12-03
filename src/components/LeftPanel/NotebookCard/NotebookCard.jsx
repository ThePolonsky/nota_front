import styles from './NotebookCard.module.css';
import NoteCard from '../NoteCard/NoteCard.jsx';
import {useContext} from 'react';
import {PopoverContext} from '../../../context/popover.context.js';
import axios from 'axios';
import OptionsButton from '../Buttons/OptionsButton/OptionsButton.jsx';
import AddNewButton from '../Buttons/AddNewButton/AddNewButton.jsx';
import {UserContext} from '../../../context/user.context.js';

function NotebookCard({title, notebookId, notebooks, setNotebooks, notes, setNotes}) {

    const {userId} = useContext(UserContext);
    
    const {
        setPopoverType,
        setPopoverData,
    } = useContext(PopoverContext);

    const addNewNote = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/notes/create-note', {
                userId,
                notebookId
            });
            const newNote = response.data;
            newNote.notebookId = notebookId;
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
            title: title,
            saveNewTitle: saveNewTitle
        });
    };

    const saveNewTitle = async () => {
        const newTitle = document.getElementById('renameTitleInput').value;
        const currentNotebook = notebooks.find(notebook => notebook.id === notebookId);
        try {
            const response = await axios.put('http://localhost:3000/api/notebooks/rename-notebook', {
                notebookId,
                newTitle
            });
            console.log(response.data);
            currentNotebook.title = newTitle;
            setNotebooks(notebooks);
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
            title: title,
            deleteItem: deleteNotebook,
            item: 'notebook'
        });
    };

    const deleteNotebook = async () => {
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
        <div className={styles.notebookCard} notebook_id={notebookId}>
            <div className={styles.notebookHead}>
                <img className={styles.notebookIcon} src="/public/notebookIcon.svg" alt="notebook icon"/>
                <span>{title}</span>
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
                return (
                    <NoteCard
                        key={index}
                        noteId={note.id}
                        title={note.title}
                        notes={notes}
                        setNotes={setNotes}
                    />
                );
            })}
        </div>
    );
}

export default NotebookCard;