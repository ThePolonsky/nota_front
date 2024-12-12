import styles from './Tab.module.css';
import cn from 'classnames';
import {useContext} from 'react';
import {TabsContext} from '../../../../../context/tabs.context.js';

function Tab({ tab, notes, tabIndex, renderNoteBody, setRenderNoteBody }) {

    const { tabs, setTabs, selectedTabIndex, setSelectedTabIndex } = useContext(TabsContext);

    const isSelected = tabIndex === selectedTabIndex;

    const selectTab = () => {
        setSelectedTabIndex(tabIndex);
    };

    const closeTab = (e) => {
        e.stopPropagation();
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
        // if (tabIndex === selectedTabIndex) {
        //     if (tabs.length === 1) {
        //         setRenderNoteBody(false);
        //         setSelectedTabIndex(null);
        //     }
        // }
        newTabs.splice(tabIndex, 1);
        setTabs(newTabs);
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
            <button className={styles.closeTabBtn} onClick={(e) => closeTab(e)}>
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