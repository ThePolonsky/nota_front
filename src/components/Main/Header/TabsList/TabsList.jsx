import styles from './TabsList.module.css';
import {useState} from 'react';
import Tab from './Tab/Tab.jsx';

function TabsList() {

    const [tabs, setTabs] = useState([]);
    const [selectedTabId, setSelectedTabId] = useState();

    const renderTabs = () => {
        tabs.map(tab => {
            return (
                <Tab
                    key={tab.id}
                    id={tab.id}
                />
            );
        });
    };

    const addNewTab = () => {
        const newId = tabs.length > 0 ? Math.max(...tabs.id) + 1 : 0;
        const newTab = {
            id: newId,
            noteId: null
        };
        setTabs([...tabs, newTab]);
        setSelectedTabId(newId);
    };

    return (
        <div className={styles.tabsList}>
            {/*{() => renderTabs()}*/}
            <div className={styles.addNewTab}>
                <button className={styles.addNewTabBtn} onClick={() => addNewTab()}>
                    <img src="/addTabIcon.svg" alt="add new tab button"/>
                </button>
            </div>
        </div>
    );
}

export default TabsList;