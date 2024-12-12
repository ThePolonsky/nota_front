import './App.css';
import LeftPanel from './components/LeftPanel/LeftPanel.jsx';
import Main from './components/Main/Main.jsx';
import LeftPanelHeader from './components/LeftPanel/LeftPanelHeader/LeftPanelHeader.jsx';
import TablesList from './components/LeftPanel/TablesList/TablesList.jsx';
import {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import Popover from './components/Popover/Popover.jsx';
import {PopoverContext} from './context/popover.context.js';
import {UserContext} from './context/user.context.js';
import {useNavigate} from 'react-router-dom';
import {TabsContext} from './context/tabs.context.js';

function App() {

    const navigate = useNavigate();

    const { userId, user, setUser } = useContext(UserContext);

    const [tabs, setTabs] = useState([]);
    const [selectedTabIndex, setSelectedTabIndex] = useState(null);

    const [tables, setTables] = useState([]);
    const [notebooks, setNotebooks] = useState([]);
    const [notes, setNotes] = useState([]);

    const [popoverType, setPopoverType] = useState(null);
    const [popoverData, setPopoverData] = useState({});
    const [popoverPosition, setPopoverPosition] = useState(null);

    useEffect( () => {
        if (userId === undefined || userId === null) {
            navigate('/auth');
        } else {
            loadData();
        }
    }, []);

    const loadData = async () => {
        const response = await fetchData(userId);
        const userData = response.data;
        setUser(userData);
        setTables(userData.tables);
        setNotebooks(userData.notebooks);
        setNotes(userData.notes.map((note) => {
            return {
                ...note
            };
        }));
    };

    const fetchData = async (userId) => {
        try {
            const response = await axios.get('http://localhost:3000/api/get-content-of-user', {
                params: {
                    userId: userId
                }
            });
            return response;
        } catch (error) {
            console.error('Произошла ошибка:', error);
            throw error;
        }
    };

    const isUserUndefined = () => {
        if (userId === undefined) {
            navigate('/auth');
        }
    };

    isUserUndefined();

    return (
        <>
            <PopoverContext.Provider value={{
                popoverType,
                popoverData,
                setPopoverType,
                setPopoverData,
                popoverPosition,
                setPopoverPosition
            }}>
                <TabsContext.Provider value={{
                    tabs,
                    setTabs,
                    selectedTabIndex,
                    setSelectedTabIndex
                }}>
                    <LeftPanel>
                        <LeftPanelHeader
                            tables={tables}
                            setTables={setTables}
                        />
                        <TablesList
                            tables={tables}
                            notebooks={notebooks}
                            notes={notes}
                            setTables={setTables}
                            setNotebooks={setNotebooks}
                            setNotes={setNotes}
                        />
                    </LeftPanel>
                    <Main
                        tables={tables}
                        notebooks={notebooks}
                        notes={notes}
                        setTables={setTables}
                        setNotebooks={setNotebooks}
                        setNotes={setNotes}
                    />
                    <Popover/>
                </TabsContext.Provider>
            </PopoverContext.Provider>
        </>
    );
}

export default App;
