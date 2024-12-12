import styles from './TabsList.module.css';
import Tab from './Tab/Tab.jsx';
import {TabsContext} from '../../../../context/tabs.context.js';
import {useContext} from 'react';

function TabsList({ tables, notebooks, notes, setTables, setNotebooks, setNotes, renderNoteBody, setRenderNoteBody }) {

    const { tabs, setTabs, selectedTabIndex, setSelectedTabIndex } = useContext(TabsContext);

    const addNewTab = () => {
        const newIndex = tabs.length > 0 ? tabs.length : 0;
        const newTab = {
            noteId: null
        };
        setSelectedTabIndex(newIndex);
        setTabs([...tabs, newTab]);
    };

    return (
        <div className={styles.tabsList}>
            {tabs.map((tab, index) => {
                return (
                    <Tab
                        key={index}
                        tabIndex={index}
                        tab={tab}
                        notes={notes}
                        renderNoteBody={renderNoteBody}
                        setRenderNoteBody={setRenderNoteBody}
                    />
                );
            })}
            <div className={styles.addNewTab}>
                <button className={styles.addNewTabBtn} onClick={addNewTab}>
                    <img src="/addTabIcon.svg" alt="add new tab button"/>
                </button>
            </div>
        </div>
    );
}

export default TabsList;