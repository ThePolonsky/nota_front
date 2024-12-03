import styles from './NoteCard.module.css';
import OptionsButton from '../Buttons/OptionsButton/OptionsButton.jsx';
import axios from 'axios';
import {useContext} from 'react';
import {PopoverContext} from '../../../context/popover.context.js';
import {UserContext} from '../../../context/user.context.js';

function NoteCard({noteId, title, notes, setNotes}) {

    const {userId} = useContext(UserContext);

    const {
        setPopoverType,
        setPopoverData,
    } = useContext(PopoverContext);

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
            title: title,
            saveNewTitle: saveNewTitle
        });
    };

    const saveNewTitle = async () => {
        const newTitle = document.getElementById('renameTitleInput').value;
        const currentNote = notes.find(note => note.id === noteId);
        try {
            const response = await axios.put('http://localhost:3000/api/notes/rename-note', {
                noteId,
                newTitle
            });
            console.log(response.data);
            currentNote.title = newTitle;
            setNotes(notes);
            setPopoverType(null);
        } catch (error) {
            console.error(error);
        }
    };

    //w|------DELETE------|

    const openAgreementOnDeleteNote = () => {
        setPopoverType('delete');
        setPopoverData({
            title: title,
            deleteItem: deleteNote,
            item: 'note'
        });
    };

    const deleteNote = async () => {
        try {
            const response = await axios.delete('http://localhost:3000/api/notes/delete-note', {
                params: {
                    noteId: noteId
                }
            });
            setNotes(prevNotes => prevNotes.filter((item) => item.id !== noteId));
            setPopoverType(null);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={styles.noteCard} note_id={noteId}>
            <div className={styles.noteCardHover}>
                <img className={styles.noteIcon} src="/public/noteIcon.svg" alt="note icon"/>
                <span>{title}</span>
                <div className={styles.noteCardButtons}>
                    <OptionsButton
                        openOptionsPopover={openNoteOptionsPopover}
                    />
                </div>
            </div>
        </div>
    );
}

export default NoteCard;
