import styles from './Main.module.css';
import Header from './Header/Header.jsx';
import TabsList from './Header/TabsList/TabsList.jsx';
import User from './Header/User/User.jsx';
import NoteBody from './NoteBody/NoteBody.jsx';
import {useContext, useState} from 'react';
import {TabsContext} from '../../context/tabs.context.js';
import {UserContext} from '../../context/user.context.js';

function Main() {

    const {user, setUser} = useContext(UserContext);

    const {tabs, setTabs, selectedTabId, setSelectedTabId} = useContext(TabsContext);

    const [selectedNote, setSelectedNote] = useState(null);

    return (
        <main className={styles.main}>
            <Header>
                <TabsList/>
                <User
                    userName={user.username}
                />
            </Header>
            <NoteBody
                selectedNote={selectedNote}
            />
        </main>
    );
}

export default Main;