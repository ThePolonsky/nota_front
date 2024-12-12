import styles from './Main.module.css';
import Header from './Header/Header.jsx';
import TabsList from './Header/TabsList/TabsList.jsx';
import User from './Header/User/User.jsx';
import {useContext, useEffect, useState} from 'react';
import {TabsContext} from '../../context/tabs.context.js';
import {UserContext} from '../../context/user.context.js';
import NoteBody from './NoteBody/NoteBody.jsx';

function Main({tables, notebooks, notes, setTables, setNotebooks, setNotes}) {

    const {user, setUser} = useContext(UserContext);
    const {tabs, setTabs, selectedTabIndex, setSelectedTabIndex} = useContext(TabsContext);

    const [renderNoteBody, setRenderNoteBody] = useState(false);

    // const renderNoteBody = () => {
    //     if (tabs.length > 0) {
    //         console.log(tabs);
    //         if (tabs[selectedTabIndex] !== null) {
    //             console.log(tabs[selectedTabIndex]);
    //             if (tabs[selectedTabIndex].noteId !== null) {
    //                 return true;
    //             }
    //         }
    //     }
    //     return false;
    // };

    return (
        <main className={styles.main}>
            <Header>
                <TabsList
                    tables={tables}
                    notebooks={notebooks}
                    notes={notes}
                    setTables={setTables}
                    setNotebooks={setNotebooks}
                    setNotes={setNotes}
                    renderNoteBody={renderNoteBody}
                    setRenderNoteBody={setRenderNoteBody}
                />
                <User
                    userName={user?.username ?? 'Username'}
                />
            </Header>
            {tabs.filter(tab => tabs.indexOf(tab) === selectedTabIndex).map(tab => {
                if (tab.noteId !== null) {
                    return (
                        <NoteBody
                            key={tab}
                            tab={tab}
                            tables={tables}
                            notebooks={notebooks}
                            notes={notes}
                            setTables={setTables}
                            setNotebooks={setNotebooks}
                            setNotes={setNotes}
                        />
                    );
                }
            })
            }

        </main>
    );
}

export default Main;