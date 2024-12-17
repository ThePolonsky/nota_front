import styles from './Tab.module.css';
import cn from 'classnames';
import {useContext} from 'react';
import {TabsContext} from '../../../../../context/tabs.context.js';
import axios from 'axios';
import {UserContext} from '../../../../../context/user.context.js';

function Tab({ tab, notes, setNotes, tabIndex, renderNoteBody, setRenderNoteBody }) {

    const {userId} = useContext(UserContext);
    const { tabs, setTabs, selectedTabIndex, setSelectedTabIndex } = useContext(TabsContext);

    const isSelected = tabIndex === selectedTabIndex;

    const selectTab = () => {
        setSelectedTabIndex(tabIndex);
    };

    const closeTab = async (e) => {
        e.stopPropagation();

        if (tab.noteId) {
            await saveBeforeClose();
        }

        setRenderNoteBody(false);
        const newTabs = [...tabs];
        if (tabs.length === 1) {
            setSelectedTabIndex(null);
        } else {
            if (tabIndex === selectedTabIndex) {
                    setSelectedTabIndex(selectedTabIndex - 1);
            } else {
                if (tabIndex < selectedTabIndex) {
                    setSelectedTabIndex(selectedTabIndex - 1);
                }
            }
        }
        newTabs.splice(tabIndex, 1);
        setTabs(newTabs);
    };

    const saveBeforeClose = async () => {
        const newNotes = [...notes];
        const newNote = newNotes.find(note => note.id === tab.noteId);
        newNote.content = document.getElementById('contentEditable').innerHTML;
        setNotes(newNotes);
        await saveChanges(newNote);
    };

    const saveChanges = async (newNote) => {
        try {
            const noteId = newNote.id;
            const newTitle = newNote.title;
            const newContent = newNote.content;
            const response = await axios.put('http://localhost:3000/api/notes/save-changes', {
                userId, noteId, newTitle, newContent
            });
            console.log(response.data);
        } catch (error) {
            console.error('Произошла ошибка:', error);
            throw error;
        }
    };

    const noteTitle = () => {
        const title = notes.find(note => note.id === tab.noteId)?.title ?? false;
        if (title) {
            return title;
        } else {
            return 'New tab';
        }
    };

    return (
        <div className={cn(styles.tab, {
            [styles.selected]: isSelected
        })} onClick={selectTab}>
            <span>{noteTitle()}</span>
            <button className={styles.closeTabBtn} onClick={async (e) => await closeTab(e)}>
                {isSelected ? (
                    <img src="/closeTabIconDark.svg" alt="close tab button"/>
                ) : (
                    <img src="/closeTabIconWhite.svg" alt="close tab button"/>
                )}
            </button>
        </div>
    );
}

export default Tab;