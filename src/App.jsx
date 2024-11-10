import './App.css';
import LeftPanel from './components/LeftPanel/LeftPanel.jsx';
import Main from './components/Main/Main.jsx';
import Header from './components/Main/Header/Header.jsx';
import TabsList from './components/Main/Header/TabsList/TabsList.jsx';
import User from './components/Main/Header/User/User.jsx';
import LeftPanelHeader from './components/LeftPanel/LeftPanelHeader/LeftPanelHeader.jsx';
import TablesList from './components/LeftPanel/TablesList/TablesList.jsx';
import NoteContent from './components/Main/NoteBody/NoteBody.jsx';
import {useEffect, useState} from 'react';
import axios from 'axios';
import Popover from './components/Popover/Popover.jsx';
import {PopoverContext} from './context/popover.context.js';

function App() {

    const userId = 1;

    const [tables, setTables] = useState([]);
    const [notebooks, setNotebooks] = useState([]);
    const [notes, setNotes] = useState([]);

    const [popoverType, setPopoverType] = useState(null);
    const [popoverContent, setPopoverContent] = useState(null);
    const [idForPopover, setIdForPopover] = useState(null);
    const [popoverPosition, setPopoverPosition] = useState(null);

    const fetchTables = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/tables/${userId}`);
            setTables(response.data);
        } catch (error) {
            console.error('Произошла ошибка:', error);
            throw error;
        }
    };

    const fetchNotebooks = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/notebooks/${userId}`);
            setNotebooks(response.data);
        } catch (error) {
            console.error('Произошла ошибка:', error);
            throw error;
        }
    };

    const loadData = async () => {
        await fetchTables(userId);
        await fetchNotebooks(userId);
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            <PopoverContext.Provider value={{
                popoverType,
                popoverContent,
                setPopoverType,
                setPopoverContent,
                popoverPosition,
                setPopoverPosition,
                idForPopover,
                setIdForPopover
            }}>
                <LeftPanel>
                    <LeftPanelHeader
                        setTables={setTables}
                        userId={userId}
                    />
                    <TablesList
                        tables={tables}
                        setTables={setTables}
                        userId={userId}
                        notebooks={notebooks}
                        setNotebooks={setNotebooks}
                        notes={notes}
                    />
                </LeftPanel>
                <Main>
                    <Header>
                        <TabsList/>
                        <User/>
                    </Header>
                    <NoteContent/>
                </Main>
                <Popover/>
            </PopoverContext.Provider>
        </>
    );
}

export default App;
